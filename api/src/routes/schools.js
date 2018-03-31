const auth = require('../lib/auth');
const { AMBASSADOR_ROLE } = require('../lib/common');
const { School } = require('../lib/models');

module.exports = (app) => {
  app.get('/v1/schools', (req, res) => {
    const { start, limit, sortByPoints } = req.query;
    const parsedLimit = parseInt(limit);

    const findQuery = start ? {'_id': { '$gt': start }} : {};
    const limitCount = ! parsedLimit || parsedLimit > 100 ? 100 : parsedLimit;
    const sortQuery = sortByPoints ? { points: -1 } : {};

    School
      .find(findQuery)
      .limit(limitCount)
      .sort(sortQuery)
      .then(data => res.json({ data }))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/v1/schools/:id', (req, res) => {
    const { id } = req.params;

    School
      .findOne({ _id: id })
      .then(data => res.json({ data }))
      .catch(error => res.status(400).json({ error }));
  });

  app.post('/v1/schools', auth.authenticateAdmin, (req, res) => {
    new School(req.body)
      .save()
      .then(school => res.json({ data: school }))
      .catch(error => res.status(400).json({ error }));
  });

  app.put('/v1/schools/:id', auth.authenticateAmbassador, (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    const isAmbassador = user.role === AMBASSADOR_ROLE;
    const attendsSchool = user.school.toString() === id;

    if (isAmbassador && ! attendsSchool) {
      return res.status(400).json({ error: 'You can\'t edit this school.' });
    }

    School
      .findByIdAndUpdate(id, { '$set': req.body }, { new: true })
      .then(school => res.json({ data: school }))
      .catch(error => res.status(400).json({ error }));
  });

  app.delete('/v1/schools/:id', auth.authenticateAdmin, (req, res) => {
    const { id } = req.params;

    School
      .findOneAndRemove({ _id: id })
      .then(() => res.json({ success: true }))
      .catch(error => res.status(400).json({ error }));
  });
};
