const { authenticateUser } = require('../lib/auth');
const { School } = require('../lib/models');

module.exports = (app) => {

  // TODO: Filter out bad words from name & city.

  app.post('/v1/invites', authenticateUser, (req, res) => {
    const { name, city, stateCode, zipcode } = req.body;
    const { user } = res.locals;

    if (user.school) {
      return res.status(400).json({ error: 'You already picked a school' });
    }

    const invitedBy = user.id;
    const school = new School({ name, city, stateCode, zipcode, invitedBy });

    school
      .save()
      .then(invite => {
        user.school = invite.id;

        user
          .save()
          .then(() => res.json({ data: invite }))
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  });
};
