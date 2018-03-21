const mongoose = require('mongoose');
const postal = require('postal-abbreviations');
const algolia = require('./algolia');
const {
  encrypt, compare, generateToken, randomBytes,
  generateCodeExpiration, generateTokenExpiration,
  USER_ROLE, ADMIN_ROLE, AMBASSADOR_ROLE,
} = require('./common');

const rules = require('../data/rules').rules;
const states = require('../data/states').states;
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
  email: {
    type: String,
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

UserSchema.statics.userEditableFields = function(container) {
  const fields = [
    'firstName', 'lastName', 'mobile', 'stateCode', 'zipcode',
    'birthday', 'school', 'email', 'isEligible', 'isRegistered',
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

      return compare(token, user.token)
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
  return generateToken().then(({ token, encryptedToken }) => {
    this.token = encryptedToken;
    this.tokenExpiration = generateTokenExpiration();

    return this.save()
      .then(() => token)
      .catch(error => console.error(error));
  });
};

UserSchema.methods.setPassword = function(password) {
  return encrypt(password)
    .then((encrypted) => {
      this.password = encrypted;

      return this.save();
    })
    .catch(error => console.error(error));
};

UserSchema.methods.comparePassword = function(password) {
  return compare(password, this.password);
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
    email: this.email,
    tokenExpiration: this.tokenExpiration,
    role: this.role,
  };
};

const User = mongoose.model('user', UserSchema);

module.exports = {
  School, User,
};
