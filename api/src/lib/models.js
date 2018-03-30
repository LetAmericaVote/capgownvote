const mongoose = require('mongoose');
const postal = require('postal-abbreviations');
const algolia = require('./algolia');
const { updateProfile } = require('./mobileCommons');
const {
  hashText, compareText, generateToken, randomBytes,
  generateCodeExpiration, generateTokenExpiration,
  decrypt, findStateByCode,
  USER_ROLE, ADMIN_ROLE, AMBASSADOR_ROLE,
} = require('./common');

const { rules } = require('../data/rules');
const { states } = require('../data/states');
const zipTest = (/^\d{5}(-\d{4})?$/);

const stateCodeSchema = {
  type: String,
  lowercase: true,
  validate: value => states.find(state => state.code.toLowerCase() === value),
};

// TODO: Add styling object
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stateCode: {
    ...stateCodeSchema,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
    validate: value => zipTest.test(value),
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

SchoolSchema.virtual('stateName').get(function() {
  return postal(this.stateCode);
});

SchoolSchema.post('save', function(doc) {
  algolia.addSchool(doc);
});

SchoolSchema.post('findOneAndUpdate', function(doc) {
  algolia.addSchool(doc);
});

SchoolSchema.post('remove', function(doc) {
  algolia.deleteSchool(doc);
});

SchoolSchema.post('findOneAndRemove', function(doc) {
  algolia.deleteSchool(doc);
});

const School = mongoose.model('school', SchoolSchema);

const UserSchema = mongoose.Schema({
  nameTitle: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  nameSuffix: {
    type: String,
    default: null,
  },
  homeAddress: {
    type: String,
    default: null,
  },
  homeUnit: {
    type: String,
    default: null
  },
  homeCity: {
    type: String,
    default: null,
  },
  homeZipCode: {
    type: String,
    default: null,
  },
  hasMailingAddress: {
    type: Boolean,
    default: false,
  },
  mailingAddress: {
    type: String,
    default: null,
  },
  mailingUnit: {
    type: String,
    default: null,
  },
  mailingCity: {
    type: String,
    default: null,
  },
  mailingStateCode: stateCodeSchema,
  mailingZipCode: {
    type: String,
    default: null,
  },
  hasChangedName: {
    type: Boolean,
    default: false,
  },
  previousNameTitle: {
    type: String,
    default: null,
  },
  previousFirstName: {
    type: String,
    default: null,
  },
  previousMiddleName: {
    type: String,
    default: null,
  },
  previousLastName: {
    type: String,
    default: null,
  },
  previousNameSuffix: {
    type: String,
    default: null,
  },
  hasChangeOfAddress: {
    type: Boolean,
    default: false,
  },
  previousAddress: {
    type: String,
    default: null,
  },
  previousUnit: {
    type: String,
    default: null,
  },
  previousCity: {
    type: String,
    default: null,
  },
  previousStateCode: stateCodeSchema,
  previousZipCode: {
    type: String,
    default: null,
  },
  isFirstRegistration: {
    type: Boolean,
    default: false,
  },
  politicalParty: {
    type: String,
    default: null,
  },
  race: {
    type: String,
    default: null,
  },
  governmentId: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
    index: true,
  },
  mobileCommonsId: {
    type: String,
    default: null,
  },
  stateCode: stateCodeSchema,
  zipcode: {
    type: String,
    default: null,
  },
  birthday: {
    type: Number,
    default: null,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    default: null,
  },
  isEligible: {
    type: Boolean,
    default: null,
  },
  isRegistered: {
    type: Boolean,
    default: null,
  },
  hasStateLicense: {
    type: Boolean,
    default: null,
  },
  email: {
    type: String,
  },
  hasReminder: {
    type: Boolean,
    default: false,
  },
  pdf: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  tokenExpiration: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    default: USER_ROLE,
    enum: [USER_ROLE, ADMIN_ROLE, AMBASSADOR_ROLE],
  },
}, {
  timestamps: true,
});

UserSchema.index('email', {
  unique: true,
  partialFilterExpression: {
    email: { '$exists': true },
  },
});

UserSchema.virtual('rules').get(function() {
  return rules.find(item => item.code.toLowerCase() === this.stateCode).rules;
});

UserSchema.virtual('stateHasOvr').get(function() {
  return findStateByCode(this.stateCode).hasOvr;
});

UserSchema.virtual('ovrLink').get(function() {
  return findStateByCode(this.stateCode).ovrLink;
});

UserSchema.virtual('ovrRequiresLicense').get(function() {
  return !!findStateByCode(this.stateCode).ovrRequiresLicense;
});

UserSchema.virtual('customRegistrationMessage').get(function() {
  return findStateByCode(this.stateCode).customRegistrationMessage || null;
});

UserSchema.statics.userEditableFields = function(container) {
  const fields = [
    'firstName', 'lastName', 'stateCode', 'zipcode',
    'birthday', 'school', 'email', 'isEligible', 'isRegistered',
    'hasStateLicense', 'nameTitle', 'nameSuffix', 'home_address',
    'homeUnit', 'homeCity', 'homeZipCode', 'hasMailingAddress',
    'mailingAddress', 'mailingUnit', 'mailingCity', 'mailingStateCode',
    'mailingZipCode', 'hasChangedName', 'previousNameTitle',
    'previousFirstName', 'previousLastName', 'previousNameSuffix',
    'hasChangeOfAddress', 'previousAddress', 'previousUnit',
    'previousCity', 'previousStateCode', 'previousZipCode', 'race',
    'isFirstRegistration', 'previousMiddleName', 'politicalParty',
  ];

  return fields.reduce((acc, key) => {
    if (container[key] !== undefined) {
      acc[key] = container[key];
    }

    return acc;
  }, {});
};

UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

UserSchema.statics.findAndAuthenticateByToken = function(id, token, roles) {
  const authData = (user, isValid) => ({
    user, isValid,
  });

  return this.findOne({ _id: id })
    .then((user) => {
      if (! user) {
        return authData(null, false);
      }

      if (! user.tokenExpiration || Date.now() > user.tokenExpiration) {
        return authData(user, false);
      }

      if (! roles.includes(user.role)) {
        return authData(user, false);
      }

      return compareText(token, user.token)
        .then(result => authData(user, result))
        .catch((error) => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
      return authData(null, false);
    });
};

UserSchema.methods.generateToken = function() {
  return generateToken().then(({ token, hashedToken }) => {
    this.token = hashedToken;
    this.tokenExpiration = generateTokenExpiration();

    return this.save()
      .then(() => token)
      .catch(error => console.error(error));
  });
};

UserSchema.methods.setPassword = function(password) {
  return hashText(password)
    .then((hashedText) => {
      this.password = hashedText;

      return this.save();
    })
    .catch(error => console.error(error));
};

UserSchema.methods.comparePassword = function(password) {
  return compareText(password, this.password);
};

UserSchema.methods.updateMobileCommonsProfile = function(optInPathId) {
  if (! this.mobile) {
    return;
  }

  updateProfile(this, optInPathId)
    .then(id => {
      this.mobileCommonsId = id;
      this.save();
    })
    .catch(error => {
      console.error(error);
    });
};

UserSchema.methods.api = function() {
  return {
    id: this.id,
    nameTitle: this.nameTitle,
    firstName: this.firstName,
    lastName: this.lastName,
    nameSuffix: this.nameSuffix,
    homeAddress: this.homeAddress,
    homeUnit: this.homeUnit,
    homeCity: this.homeCity,
    homeZipCode: this.homeZipCode,
    hasMailingAddress: this.hasMailingAddress,
    mailingAddress: this.mailingAddress,
    mailingUnit: this.mailingUnit,
    mailingCity: this.mailingCity,
    mailingStateCode: this.mailingStateCode,
    mailingZipCode: this.mailingZipCode,
    hasChangedName: this.hasChangedName,
    previousNameTitle: this.previousNameTitle,
    previousFirstName: this.previousFirstName,
    previousMiddleName: this.previousMiddleName,
    previousLastName: this.previousLastName,
    previousNameSuffix: this.previousNameSuffix,
    hasChangeOfAddress: this.hasChangeOfAddress,
    previousAddress: this.previousAddress,
    previousUnit: this.previousUnit,
    previousCity: this.previousCity,
    previousStateCode: this.previousStateCode,
    previousZipCode: this.previousZipCode,
    isFirstRegistration: this.isFirstRegistration,
    politicalParty: this.politicalParty,
    race: this.race,
    mobile: this.mobile,
    governmentId: this.governmentId ? decrypt(this.governmentId, this.id.substring(0, 16)) : null,
    zipcode: this.zipcode,
    stateCode: this.stateCode,
    birthday: this.birthday,
    school: this.school,
    isEligible: this.isEligible,
    isRegistered: this.isRegistered,
    hasStateLicense: this.hasStateLicense,
    email: this.email,
    hasReminder: this.hasReminder,
    pdf: this.pdf ? decrypt(this.pdf, this.id.substring(0, 16)) : null,
    tokenExpiration: this.tokenExpiration,
    role: this.role,
    rules: this.rules,
    stateHasOvr: this.stateHasOvr,
    ovrLink: this.ovrLink,
    ovrRequiresLicense: this.ovrRequiresLicense,
    customRegistrationMessage: this.customRegistrationMessage,
  };
};

const User = mongoose.model('user', UserSchema);

const ReminderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    index: true,
    required: true,
  },
  targetTime: {
    type: Number,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
});

ReminderSchema.index({
  targetTime: 1, createdAt: 1,
});

const Reminder = mongoose.model('reminder', ReminderSchema);

// const StatsSchema = mongoose.Schema({
//   totalStudents: {
//     type: Number,
//     default: null,
//   },
//   totalHighschools: {
//     type: Number,
//     default: null,
//   },
//   totalFormRegistrations: {
//     type: Number,
//     default: null,
//   },
//   totalOvrRegistrations: {
//     type: Number,
//     default: null,
//   },
//   leaderboard: [
//     {
//       ...SchoolSchema,
//       score: {
//         type: Number,
//         default: null,
//       },
//     },
//   ],
// }, {
//   timestamps: true,
// });
//
// const Stat = mongoose.model('stat', StatsSchema);

module.exports = {
  School, User, Reminder, // Stat,
};
