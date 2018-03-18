const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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

const encrypt = (text) => {
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

const compare = (text, hash) => {
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
    return encrypt(token).then((encryptedToken) => ({
      token, encryptedToken
    }));
  });
};

const generateTokenExpiration = () => Date.now() + TOKEN_EXPIRATION_LENGTH;

module.exports = {
  cors,
  jsonMiddleware,
  dbConnect,
  encrypt,
  compare,
  randomBytes,
  generateToken,
  generateTokenExpiration,
  USER_ROLE,
  ADMIN_ROLE,
  AMBASSADOR_ROLE,
};
