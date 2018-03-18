const {
  USER_ROLE, ADMIN_ROLE, AMBASSADOR_ROLE,
} = require('./common');
const { User } = require('./models');

function invalidAuth(res) {
  res.status(401).json({ error: 'Unauthorized' });
}

function authenticate(req, res, next, roles) {
  const lavAuthId = req.headers.lav_auth_id;
  const lavAuthToken = req.headers.lav_auth_token;

  User.findAndAuthenticateByToken(lavAuthId, lavAuthToken, roles)
    .then((authData) => {
      if (authData.isValid) {
        res.locals.user = authData.user;
        next();
      } else {
        invalidAuth(res);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Internal server error.' });
    });
}

function authenticateUser(req, res, next) {
  const roles = [USER_ROLE, ADMIN_ROLE, AMBASSADOR_ROLE];
  authenticate(req, res, next, roles);
}

function authenticateAmbassador(req, res, next) {
  const roles = [ADMIN_ROLE, AMBASSADOR_ROLE];
  authenticate(req, res, next, roles);
}

function authenticateAdmin(req, res, next) {
  authenticate(req, res, next, [ADMIN_ROLE]);
}

module.exports = {
  authenticateUser,
  authenticateAmbassador,
  authenticateAdmin,
};
