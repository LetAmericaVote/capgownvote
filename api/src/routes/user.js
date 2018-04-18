const PhoneNumber = require('awesome-phonenumber');
const { MOBILE_COMMONS_GENERAL_CAMPAIGN_OPT_IN } = process.env;
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
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.get('/v1/user/email/:email', auth.authenticateAdmin, (req, res) => {
    const { email } = req.params;

    return User.findByEmail(email)
      .then(user => res.json({ data: user.api() }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.post('/v1/user', (req, res) => {
    const data = User.userEditableFields(req.body);

    if (! data) {
      return res.status(400).json({ error: 'Missing email' });
    }

    User.findByEmail(data.email).then(dupeUser => {
      if (dupeUser && dupeUser.id) {
        res.status(401).json({ error: 'An account with that email exists already' });
        return false;
      }

      const user = new User(data);
      return user.save();
    }).then((user) => {
      if (! user) {
        return;
      }

      user.generateToken().then((token) => {
        randomBytes(24)
          .then(password => user.setPassword(password))
          .then((user, err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error.' });
            }

            res.json({ data: { user: user.api(), token } });
          });
      }).catch((error) => {
        res.status(500).json({ error: 'Internal server error.' });
        console.error(error);
      })
    }).catch((error) => {
      res.status(500).json({ error: 'Internal server error.' });
      console.error(error);
    });
  });

  app.put('/v1/user/:id/password', auth.authenticateUser, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;
    const { password } = req.body;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      return res.status(401).json({ error: 'You cannot access other user profiles.'});
    }

    User.findOne({ _id: id })
      .then(user => {
        if (! user) {
          res.status(400).json({ error: 'Invalid user ID' });
          return null;
        }

        return user.setPassword(password);
      })
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
        user.updateMobileCommonsProfile(MOBILE_COMMONS_GENERAL_CAMPAIGN_OPT_IN);

        res.json({
          data: user.api(),
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/mobile', auth.authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAdmin = user.role === ADMIN_ROLE;

    if (! isAdmin && id !== user.id) {
      return res.status(401).json({ error: 'You cannot access other user profiles.'});
    }

    const mobile = new PhoneNumber(req.body.mobile, 'US');

    if (! mobile.isValid()) {
      return res.status(400).json({ error: 'Invalid phone number or number already in use.'});
    }

    const formattedMobile = mobile.toJSON().number.e164;
    const data = { mobile: formattedMobile };

    let existingMobileUser = null;

    try {
      existingMobileUser = await User.findOne(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
      console.error(error);

      return;
    }

    if (existingMobileUser) {
      return res.status(400).json({ error: 'Invalid phone number or number already in use.'});
    }

    return User.findOneAndUpdate({ _id: id }, { '$set': data }, { new: true })
      .then(user => {
        user.updateMobileCommonsProfile(MOBILE_COMMONS_GENERAL_CAMPAIGN_OPT_IN);

        res.json({
          data: user.api(),
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.put('/v1/user/:id/email', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;
    const { email } = req.body;

    return User.findOneAndUpdate({ _id: id }, { '$set': { email } }, { new: true })
      .then(user => {
        user.updateMobileCommonsProfile(MOBILE_COMMONS_GENERAL_CAMPAIGN_OPT_IN);

        res.json({
          data: user.api(),
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
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
        res.status(500).json({ error: 'Internal server error.' });
      });
  });

  app.delete('/v1/user/:id', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    return User.findOneAndRemove({ _id: id })
      .then(user => res.json({ success: true }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  });
};
