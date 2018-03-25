const PhoneNumber = require('awesome-phonenumber');
const auth = require('../lib/auth');
const { User } = require('../lib/models');
const { randomBytes, ADMIN_ROLE } = require('../lib/common');

module.exports = (app) => {
  app.get('/v1/user/:id', auth.authenticateUser, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      return res.status(401).json({ error: 'You cannot access other user profiles.'});
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
    const data = User.userEditableFields(req.body);
    const user = new User(data);

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
      return res.status(401).json({ error: 'You cannot access other user profiles.'});
    }

    const data = isAdmin ? req.body : User.userEditableFields(req.body);

    return User.findOneAndUpdate({ _id: id }, { '$set': data }, { new: true })
      .then(user => {
        user.updateMobileCommonsProfile();

        res.json({
          data: user.api(),
        });
      })
      .catch((error) => {
        console.error(error);
        res.json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/mobile', auth.authenticateUser, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      res.status(401).json({ error: 'You cannot access other user profiles.'});
    }

    const mobile = new PhoneNumber(req.body.mobile, 'US');

    if (! mobile.isValid()) {
      return res.status(400).json({ error: 'Invalid phone number'});
    }

    const formattedMobile = mobile.toJSON().number.e164;
    const data = { mobile: formattedMobile };

    return User.findOneAndUpdate({ _id: id }, { '$set': data }, { new: true })
      .then(user => {
        user.updateMobileCommonsProfile();

        res.json({
          data: user.api(),
        });
      })
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
      .then(user => {
        user.updateMobileCommonsProfile();

        res.json({
          data: user.api(),
        });
      })
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
