const request = require('superagent');
const dateFormat = require('dateformat');
const { authenticateUser } = require('../lib/auth');
const { states } = require('../data/states');
const { User } = require('../lib/models');
const { encrypt } = require('../lib/common');

// RTV Api response for this appears bugged.
const REQUIRES_PARTY_AFFILIATION = [
  'CO', 'FL', 'LA', 'GA', 'IA', 'PA',
];

const standardFields = require('../data/standard-fields').fields;
const prefilledFields = require('../data/prefilled-fields').fields;

function computeFields(form) {
  // @see https://stackoverflow.com/a/21984136
  const ageDiff = Math.abs(
    new Date(Date.now() - new Date(form['date_of_birth']))
      .getUTCFullYear() - 1970
  );

  return {
    ...form,
    'is_eighteen_or_older': ageDiff >= 18,
    'partner_id': process.env.RTV_PARTNER_ID,
  };
}

module.exports = (app) => {
  app.get('/v1/rtv/fields', (req, res) => {
    res.json({ data: standardFields });
  });

  app.get('/v1/rtv/fields/:state', async (req, res) => {
    const { RTV_URL } = process.env;
    const { state } = req.params;

    const rtvReq = request
      .get(`${RTV_URL}/api/v3/state_requirements.json?lang=en&home_state_id=${state}`)
      .catch(() => res.status(500).json({ error: 'Invalid request' }));

    const rtvRes = await rtvReq;
    const body = rtvRes.body;

    const fields = [
      {
        rtvKey: 'id_number',
        title: 'ID number',
        helpMessage: body.id_number_msg,
        type: 'text',
      },
      {
        rtvKey: 'party',
        title: 'Political Party',
        helpMessage: body.requires_party_msg,
        isOptional: ! REQUIRES_PARTY_AFFILIATION.includes(state),
        type: 'select',
        options: body.party_list.concat([body.no_party_msg]),
      },
    ];

    if (body.requires_race) {
      fields.push({
        rtvKey: 'race',
        title: 'Race',
        helpMessage: body.requires_race_msg,
        type: 'select',
        options: [
          'American Indian / Alaskan Native',
          'Asian',
          'Black (not Hispanic)',
          'Hispanic',
          'Native Hawaiian or Other Pacific Islander',
          'Two or More',
          'White (not Hispanic)',
          'Other',
          'Decline to State',
        ],
      });
    }

    return res.json({ data: fields });
  });

  app.post('/v1/rtv/register', authenticateUser, async (req, res) => {
    const { RTV_URL } = process.env;
    const rtvForm = req.body;
    const { user } = res.locals;

    if (! rtvForm) {
      return res.status(400).json({
        error: 'Missing data',
      });
    }

    const payload = {
      registration: {
        ...rtvForm,
        ...computeFields(rtvForm),
        ...prefilledFields,
        email_address: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        home_state_id: user.stateCode,
        has_state_license: user.hasStateLicense,
      },
    };

    request
      .post(`${RTV_URL}/api/v3/registrations.json`)
      .send(payload)
      .then(rtvRes => {
        const { pdfurl } = rtvRes.body;

        const data = {
          isRegistered: true,
          pdf: encrypt(pdfurl, user.id.substring(0, 16)),
          nameTitle: rtvForm['name_title'],
          nameSuffix: rtvForm['name_suffix'],
          homeAddress: rtvForm['home_address'],
          homeUnit: rtvForm['home_unit'],
          homeCity: rtvForm['home_city'],
          homeZipCode: rtvForm['home_zip_code'],
          hasMailingAddress: rtvForm['has_mailing_address'],
          mailingAddress: rtvForm['mailing_address'],
          mailingUnit: rtvForm['mailing_unit'],
          mailingCity: rtvForm['mailing_city'],
          mailingStateCode: rtvForm['mailing_state_id'],
          mailingZipCode: rtvForm['mailing_zip_code'],
          hasChangedName: rtvForm['change_of_name'],
          previousNameTitle: rtvForm['prev_name_title'],
          previousFirstName: rtvForm['prev_first_name'],
          previousMiddleName: rtvForm['prev_middle_name'],
          previousLastName: rtvForm['prev_last_name'],
          previousNameSuffix: rtvForm['prev_name_suffix'],
          hasChangeOfAddress: rtvForm['change_of_address'],
          previousAddress: rtvForm['prev_address'],
          previousUnit: rtvForm['prev_unit'],
          previousCity: rtvForm['prev_city'],
          previousStateCode: rtvForm['prev_state_id'],
          previousZipCode: rtvForm['prev_zip_code'],
          isFirstRegistration: rtvForm['first_registration'],
          politicalParty: rtvForm['party'],
          race: rtvForm['race'],
          governmentId: encrypt(rtvForm['id_number'], user.id.substring(0, 16)),
        };

        User.findOneAndUpdate({ _id: user.id }, { '$set': data }, { new: true })
          .then(user => res.json({ data: user.api() }))
          .catch((error) => {
            console.error(error);
            res.json({ error: 'Internal server error.' });
          });
      })
      .catch(error => {
        console.error(error);

        if (error && error.response && error.response.body && error.response.body.message) {
          res.status(500).json({ error: error.response.body.message });
          return;
        }

        res.status(500).json({ error: 'Rock the vote had an error' });
      });
  });
};
