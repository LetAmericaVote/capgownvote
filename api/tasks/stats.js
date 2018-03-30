const common = require('../src/lib/common');
const { User, Stat, School } = require('../src/lib/models');

const LIMIT = 100;
const LEADERBOARD_MAX = 100;

async function execute() {
  try {
    common.dbConnect();
    const stat = {
      totalStudents: 0,
      totalHighschools: 0,
      totalFormRegistrations: 0,
      totalOvrRegistrations: 0,
      leaderboard: [],
    };

    // totalHighschools should be a .count query()

    async function paginate(lastId) {
      const users = await User.find({ _id: { '$gt': lastId } })
        .populate('school')
        .limit(LIMIT);

      if (! users || ! users.length) {
        return;
      }

      stat.totalStudents += users.length;

      for (const user of users) {
        // check if user has XYZ fields set
        //  increment totalXYZ if so
        //  recalculate leaderboard --> Do we put score on the school & drop the stat model?
        //                          --> Make score an index, sort by it, expose as endpoint
        //                          --> We could keep stats object for the other things? (total xyz registrations)
        //                          --> We should add a lastId field to the stat then, so we're not duplicating score each task execution
      }

      return paginate(users[users.length - 1].id);
    }

    paginate().then(...)
  } catch (error) {
    console.error(error);
  }
}

new Promise((resolve) => {
  execute().then(() => process.exit())
}).catch(error => console.error(error));
