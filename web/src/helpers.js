export function isDefined(value) {
  return value !== undefined && value !== null;
}

export function makeStateRequestId(base, state) {
  return `${base}_${state}`;
}

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November',
  'December',
];

export const HOME_STATE_RTV_KEY = 'home_state_id';

const stateFormat = (code, name, hasOvr) => ({ code: code.toLowerCase(), name, hasOvr });
export const states = [
  stateFormat('AL', 'Alabama', true),
  stateFormat('AK', 'Alaska', true),
  stateFormat('AZ', 'Arizona', true),
  stateFormat('AR', 'Arkansas', false),
  stateFormat('CA', 'California', true),
  stateFormat('CO', 'Colorado', true),
  stateFormat('CT', 'Conneticut', true),
  stateFormat('DE', 'Deleware', true),
  stateFormat('DC', 'District of Columbia', true),
  stateFormat('FL', 'Florida', true),
  stateFormat('GA', 'Georgia', true),
  stateFormat('HI', 'Hawaii', true),
  stateFormat('ID', 'Idaho', true),
  stateFormat('IL', 'Illinois', true),
  stateFormat('IN', 'Indiana', true),
  stateFormat('IA', 'Iowa', true),
  stateFormat('KS', 'Kansas', true),
  stateFormat('KY', 'Kentucky', true),
  stateFormat('LA', 'Louisiana', true),
  stateFormat('ME', 'Maine', false),
  stateFormat('MD', 'Maryland', true),
  stateFormat('MA', 'Massachusetts', true),
  stateFormat('MI', 'Michigan', false),
  stateFormat('MN', 'Minnesota', true),
  stateFormat('MS', 'Mississippi', false),
  stateFormat('MO', 'Missouri', true),
  stateFormat('MT', 'Montana', false),
  stateFormat('NE', 'Nebraska', true),
  stateFormat('NV', 'Nevada', true),
  stateFormat('NH', 'New Hampshire', false),
  stateFormat('NJ', 'New Jersey', false),
  stateFormat('NM', 'New Mexico', true),
  stateFormat('NY', 'New York', true),
  stateFormat('NC', 'North Carolina', false),
  stateFormat('ND', 'North Dakota', false),
  stateFormat('OH', 'Ohio', true),
  stateFormat('OK', 'Oklahoma', false),
  stateFormat('OR', 'Oregon', true),
  stateFormat('PA', 'Pennsylvania', true),
  stateFormat('RI', 'Rhode Island', true),
  stateFormat('SC', 'South Carolina', true),
  stateFormat('SD', 'South Dakota', false),
  stateFormat('TN', 'Tennessee', true),
  stateFormat('TX', 'Texas', false),
  stateFormat('UT', 'Utah', true),
  stateFormat('VT', 'Vermont', true),
  stateFormat('VA', 'Virginia', true),
  stateFormat('WA', 'Washington', true),
  stateFormat('WV', 'West Virginia', true),
  stateFormat('WI', 'Wisconsin', true),
  stateFormat('WY', 'Wyoming', false),
];
