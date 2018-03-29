const { APP_DOMAIN, MOBILE_COMMONS_REMINDER_CAMPAIGN, TASK_ENV } = process.env;
const common = require('../src/lib/common');
const { User, Reminder } = require('../src/lib/models');
const { sendMessage } = require('../src/lib/mobileCommons');

async function execute() {
  try {
    common.dbConnect();

    const reminders = await Reminder.find()
      .where({ targetTime: { '$lt': Date.now() }})
      .sort({ targetTime: 1, createdAt: 1 });

    if (! reminders || ! reminders.length) {
      console.info('No reminders to send');
      return;
    }

    for (const reminder of reminders) {
      const user = await User.findOne({ _id: reminder.user });

      if (! user || ! user.id) {
        console.error('Reminder found with no user');
        return;
      }

      const token = await user.generateToken();

      if (! token) {
        console.error(`Unable to generate token for user ${user.id}`);
        return;
      }

      const url = `${APP_DOMAIN}/register?id=${user.id}&token=${token}`;
      const message = `This is your reminder to register to vote through Cap, Gown Vote! Click this link to continue where you left off (Expires in 24 hours). ${url}`;

      const isReminderSent = await sendMessage(user, message, MOBILE_COMMONS_REMINDER_CAMPAIGN);

      if (! isReminderSent) {
        console.error(`Unable to send reminder message for ${user.id}`);
        return;
      }

      user.hasReminder = false;

      await user.save();
      await Reminder.remove({ _id: reminder.id });
    }
  } catch (error) {
    console.error(error);
  }
}

new Promise(() => execute()).catch(error => console.error(error));
