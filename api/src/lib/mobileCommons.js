const MOBILE_COMMONS_API_BASE = 'https://secure.mcommons.com';
const {
  MOBILE_COMMONS_USERNAME,
  MOBILE_COMMONS_PASSWORD,
  APP_DISABLE_MOBILE_COMMONS,
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

function selectIsSuccess(res) {
  return res &&
    res.response &&
    res.response['$'] &&
    res.response['$'].success === 'true';
}

function updateProfile(user, optInPathId) {
  if (APP_DISABLE_MOBILE_COMMONS && APP_DISABLE_MOBILE_COMMONS === 'true') {
    return new Promise((resolve) => resolve());
  }

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

  if (optInPathId) {
    payload['opt_in_path_id'] = optInPathId;
  }

  return request
    .post(`${MOBILE_COMMONS_API_BASE}/api/profile_update`)
    .auth(MOBILE_COMMONS_USERNAME, MOBILE_COMMONS_PASSWORD)
    .query(payload)
    .buffer()
    .accept('xml')
    .then(res => parseXML(res.text))
    .then(res => {
      if (! selectIsSuccess(res)) {
        console.error(res.response.error);
        return null;
      }

      const profile = res.response.profile;

      if (profile) {
        return profile[0]['$'].id;
      }

      return null;
    })
    .catch(error => {
      console.error(error);
    });
}

function sendMessage(user, message, campaignId) {
  if (APP_DISABLE_MOBILE_COMMONS && APP_DISABLE_MOBILE_COMMONS === 'true') {
    return new Promise((resolve) => resolve());
  }

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
    .then(res => selectIsSuccess(res))
    .catch(error => {
      console.error(error);
    });
}

module.exports = { sendMessage, updateProfile };
