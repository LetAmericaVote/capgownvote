const auth = require('../lib/auth');
const { User } = require('../lib/models');
const { randomBytes, ADMIN_ROLE } = require('../lib/common');

module.exports = (app) => {
  app.get('/v1/user/:id', auth.authenticateUser, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      res.status(401).json({ error: 'You cannot access other user profiles. '});
    }

    return User.findOne({ _id: id })
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.get('/v1/user/email/:email', auth.authenticateAdmin, (req, res) => {
    const { email } = req.params;

    return User.findByEmail(email)
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.post('/v1/user', (req, res) => {
    const {
      firstName, lastName, mobile, stateCode, zipcode,
      birthday, school, email,
    } = req.body;

    const user = new User({
      firstName, lastName, mobile, stateCode, zipcode,
      birthday, school, email,
    });

    user.save().then((user, err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      user.generateToken().then((token) => {
        randomBytes()
          .then(password => user.setPassword(password))
          .then((user, err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error.' });
            }

            res.json({ data: { user: user.api(), token } });
          });
      });
    }).catch((error) => {
      res.status(500).json({ error: 'Internal server error.' });
      console.error(error);
    });
  });

  app.put('/v1/user/password', auth.authenticateUser, (req, res) => {
    const { user } = res.locals;
    const { password } = req.body;

    user.setPassword(password)
      .then(() => res.json({ success: true }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/profile', auth.authenticateUser, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      res.status(401).json({ error: 'You cannot access other user profiles. '});
    }

    return User.findOneAndUpdate({ _id: id }, { '$set': { ...req.body } }, { new: true })
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/email', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;
    const { email } = req.body;

    return User.findOneAndUpdate({ _id: id }, { '$set': { email } }, { new: true })
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/role', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;
    const { role } = req.body;

    return User.findOneAndUpdate({ _id: id }, { '$set': { role } }, { new: true })
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.delete('/v1/user/:id', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    return User.findOneAndRemove({ _id: id })
      .then(user => res.json({ success: true }))
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });
};