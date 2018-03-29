const mongoose = require('mongoose');
const postal = require('postal-abbreviations');
const algolia = require('./algolia');
const { updateProfile } = require('./mobileCommons');
const {
  hashText, compareText, generateToken, randomBytes,
  generateCodeExpiration, generateTokenExpiration,
  encrypt, decrypt, generatePdfPassword,
  findStateByCode,
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
  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
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

SchoolSchema.pre('validate', function(next) {
  if (this.shortCode) {
    return next();
  }

  async function _generateShortCode(dupes, resolve) {
    const name = this.name;

    if (dupes > 50) {
      console.error(`Interupting short code generator for ${name} due to large dupe count.`);
      return resolve(null);
    }

    const schoolAbbr = name
      .split(' ')
      .filter(word => !(/\W/g).test(word))
      .map(word => word[0])
      .join('');

    const tooShort = schoolAbbr.length <= 3;
    const combinedAbbr = `${schoolAbbr}${tooShort ? this.stateCode : ''}`.toLowerCase();
    const shortCode = `${combinedAbbr}${dupes}`;

    School.findOne({ shortCode })
      .then(school => {
        if (school) {
          return generateShortCode(dupes + 1, resolve);
        }

        resolve(shortCode);
      })
      .catch(err => {
        console.error(err);
        resolve(null);
      });
  }

  const generateShortCode = _generateShortCode.bind(this);

  new Promise((resolve, reject) => generateShortCode(1, resolve))
    .then((shortCode) => {
      if (shortCode) {
        this.shortCode = shortCode;
      }

      next();
    });
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
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
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

// TODO: Post user save, if mobile was added, send to mobile commons.
// TODO: Should we have a mobile commons ID on the user?

UserSchema.statics.userEditableFields = function(container) {
  const fields = [
    'firstName', 'lastName', 'stateCode', 'zipcode',
    'birthday', 'school', 'email', 'isEligible', 'isRegistered',
    'hasStateLicense',
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
    firstName: this.firstName,
    lastName: this.lastName,
    mobile: this.mobile,
    zipcode: this.zipcode,
    stateCode: this.stateCode,
    birthday: this.birthday,
    school: this.school,
    isEligible: this.isEligible,
    isRegistered: this.isRegistered,
    hasStateLicense: this.hasStateLicense,
    email: this.email,
    hasReminder: this.hasReminder,
    pdf: this.pdf ? decrypt(this.pdf, generatePdfPassword(this.id)) : null,
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

module.exports = {
  School, User, Reminder,
};
