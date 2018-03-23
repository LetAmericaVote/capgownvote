const { User } = require('../lib/models');
const { authenticateUser } = require('../lib/auth');

module.exports = (app) => {
  app.post('/v1/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (! email || ! password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    User.findByEmail(email).then(user => {
      if (! user || ! user.comparePassword(password)) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      user.generateToken().then(token => res.json({ data: token }));
    }).catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
  });

  app.post('/v1/auth/logout', authenticateUser, (req, res) => {
    const { user } = res.locals;

    user.generateToken().then(() => res.json({ ok: true }));
  });
};
