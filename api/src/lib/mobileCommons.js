const MOBILE_COMMONS_API_BASE = 'https://secure.mcommons.com';
const {
  MOBILE_COMMONS_USERNAME,
  MOBILE_COMMONS_PASSWORD,
} = process.env;

const request = require('superagent');
const { parseString } = require('xml2js');
const { ADMIN_ROLE } = require('./common');

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

function updateProfile(user, campaign) {
  const payload = {
    phone_number: user.mobile,
    email: user.email,
    postal_code: user.zipcode,
    first_name: user.firstName,
    last_name: user.lastName,
    state: user.statCode,
    is_cap_gown_vote_student: user.role !== ADMIN_ROLE,
    country: 'US',
  };

  if (campaign) {
    payload['opt_in_path_id'] = campaign;
  }

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

function sendMessage(user, message, campaignId) {
  const payload = {
    phone_number: user.mobile,
    body: message,
    campaign_id: campaignId,
  };

  return request
    .post(`${MOBILE_COMMONS_API_BASE}/api/send_message`)
    .auth(MOBILE_COMMONS_USERNAME, MOBILE_COMMONS_PASSWORD)
    .query(payload)
    .buffer()
    .accept('xml')
    .then(res => parseXML(res.text))
    .then(res => res.response['$'].success)
    .catch(error => {
      console.error(error);
    });
}

module.exports = { sendMessage, updateProfile };
