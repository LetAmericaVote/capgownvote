const MOBILE_COMMONS_API_BASE = 'https://secure.mcommons.com';
const MOBILE_COMMONS_USERNAME = process.env.MOBILE_COMMONS_USERNAME;
const MOBILE_COMMONS_PASSWORD = process.env.MOBILE_COMMONS_PASSWORD;

const request = require('superagent');
const { parseString } = require('xml2js');

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

function updateProfile(user) {
  const payload = {
    phone_number: user.mobile,
    email: user.email,
    postal_code: user.zipcode,
    first_name: user.firstName,
    last_name: user.lastName,
    state: user.statCode,
    country: 'US',
  }; // TODO: opt_in_path_id, address...

  return request
    .post(`${MOBILE_COMMONS_API_BASE}/api/profile_update`)
    .auth(MOBILE_COMMONS_USERNAME, MOBILE_COMMONS_PASSWORD)
    .query(payload)
    .buffer()
    .accept('xml')
    .then(res => parseXML(res.text))
    .then(res => res.response.profile[0]['$'].id)
    .catch(error => {
      console.error(error);
    });
}

module.exports = { updateProfile };
