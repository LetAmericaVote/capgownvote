require('dotenv').config();
const json2csv = require('json2csv').Parser;

const { dbConnect } = require('./src/lib/common');
const { User } = require('./src/lib/models');

function exportData(results) {
  const fields = [
    'firstName', 'lastName', 'mobile', 'email',
    'schoolStateCode', 'schoolStateName', 'schoolName', 'schoolCity',
  ];

  const data = results.map(result => ({
    firstName: result.firstName,
    lastName: result.lastName,
    mobile: result.mobile,
    email: result.email,
    schoolStateCode: result.school.stateCode,
    schoolStateName: result.school.stateName,
    schoolCity: result.school.city,
    schoolName: result.school.name,
  }));

  if (data && data.length) {
    const json2csvParser = new json2csv({ fields });
    const csv = json2csvParser.parse(data);

    console.log('writing data');
    require('fs').writeFileSync('reg.csv', csv);
  }

  process.exit();
}

function execute(mongoUri) {
  try {
    console.log('starting script execution...');
    dbConnect(mongoUri);

    async function paginate(lastId, discovered) {
      console.log(`executing on page ending in ${lastId}...`);

      const query = { isScoreCounted: true };
      if (lastId) {
        query['_id'] = { '$gt': lastId };
      }

      const users = await User.find(query).populate('school');
      if (! users || ! users.length) {
        return discovered;
      }

      return paginate(users[users.length - 1].id, [
        ...discovered,
        ...users,
      ]);
    }

    paginate(null, []).then(exportData);
  } catch (error) {
    console.error(error);
  }
}

function parseArgs() {
  let mongoUri = null;

  process.argv.forEach((cmdArg) => {
    if (cmdArg.startsWith('mongoUri')) {
      mongoUri = cmdArg.replace('mongoUri=', '');
    }
  });

  if (! mongoUri) {
    console.log('Missing Mongo URI, exiting...');
    return;
  }

  execute(mongoUri);
}

parseArgs();
