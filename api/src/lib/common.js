const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const encryptionAlgorithm = 'aes-256-ctr';
const saltRounds = 10;

const USER_ROLE = 'USER_ROLE';
const ADMIN_ROLE = 'ADMIN_ROLE';
const AMBASSADOR_ROLE = 'AMBASSADOR_ROLE';
const TOKEN_EXPIRATION_LENGTH = 1000 * 60 * 60 * 24;

const jsonMiddleware = app => app.use(express.json());

const cors = (app) => {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, lav_auth_id, lav_auth_token, Access-Control-Allow-Headers, Access-Control-Request-Headers');

    next();
  });
};

const dbConnect = () => mongoose.connect(process.env.MONGODB_URI);

const hashText = (text) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const compareText = (text, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const encrypt = (text, password) => {
  const cipher = crypto.createCipher(encryptionAlgorithm, password);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

const decrypt = (text, password) => {
  const decipher = crypto.createDecipher(encryptionAlgorithm, password);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const generatePdfPassword = (userId) => `${process.env.PDF_ENCRYPTION_TOKEN}${userId}`;

const randomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
};

const generateToken = () => {
  return randomBytes().then((token) => {
    return hashText(token).then((hashedToken) => ({
      token, hashedToken
    }));
  });
};

const generateTokenExpiration = () => Date.now() + TOKEN_EXPIRATION_LENGTH;

module.exports = {
  cors,
  jsonMiddleware,
  dbConnect,
  hashText,
  compareText,
  encrypt,
  decrypt,
  randomBytes,
  generateToken,
  generateTokenExpiration,
  generatePdfPassword,
  USER_ROLE,
  ADMIN_ROLE,
  AMBASSADOR_ROLE,
};
