const common = require('../src/lib/common');
const { User, School } = require('../src/lib/models');
const limit = 100;

async function execute() {
  let page = 0;
  console.log('starting stats calculation');

  try {
    common.dbConnect();

    async function paginate(lastId) {
      console.log(`calculating stats for page ${page}`);

      const query = lastId ? { _id: { '$gt': lastId } } : {};
      const users = await User.find(query)
        .populate('school')
        .limit(limit);

      if (! users || ! users.length) {
        return;
      }

      for (const user of users) {
        if (user.isScoreCounted || ! user.stateCode) {
          continue;
        }

        const {
          isRegistered, hasOvr,
          isEligible, hasStateLicense,
          ovrRequiresLicense, mobileCommonsId,
        } = user;

        const isOvrRegistered = hasOvr && isEligible && (ovrRequiresLicense ? hasStateLicense : true);

        if (isRegistered || isOvrRegistered || !!mobileCommonsId) {
          user.school.points += 1;
          await user.school.save();

          user.isScoreCounted = true;
          await user.save();
        }
      }

      page += 1;
      return paginate(users[users.length - 1].id);
    }

    return paginate().then(() => console.log('done calculating stats'));
  } catch (error) {
    console.error(error);
  }
}

new Promise((resolve) => {
  execute().then(() => process.exit())
}).catch(error => console.error(error));
