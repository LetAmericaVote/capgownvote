const { MOBILE_COMMONS_REMINDER_CAMPAIGN } = process.env;
const PhoneNumber = require('awesome-phonenumber');
const { authenticateUser } = require('../lib/auth');
const { User, Reminder } = require('../lib/models');

module.exports = (app) => {
  app.post('/v1/reminder', authenticateUser, async (req, res) => {
    const { targetTime } = req.body;
    const { user } = res.locals;

    if (! targetTime || !!Date.parse(targetTime) || new Date(targetTime).getTime() < Date.now()) {
      return res.status(400).json({ error: 'Invalid reminder time.' });
    }

    let formattedMobile = user.mobile;

    if (! formattedMobile) {
      const mobile = new PhoneNumber(req.body.mobile, 'US');

      if (! mobile.isValid()) {
        return res.status(400).json({ error: 'Invalid phone number or number already in use.'});
      }

      formattedMobile = mobile.toJSON().number.e164;

      let existingMobileUser = null;

      try {
        existingMobileUser = await User.findOne({ mobile: formattedMobile });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      if (existingMobileUser) {
        return res.status(400).json({ error: 'Invalid phone number or number already in use.'});
      }

      user.mobile = formattedMobile;
    }

    let reminder = null;

    try {
      reminder = await Reminder.findOne({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    if (! reminder) {
      reminder = new Reminder({ user });
    }

    reminder.targetTime = targetTime;

    try {
      await reminder.save();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    user.hasReminder = true;

    try {
      await user.save();
      user.updateMobileCommonsProfile(MOBILE_COMMONS_REMINDER_CAMPAIGN);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    res.json({
      data: user.api(),
    });
  });
};
