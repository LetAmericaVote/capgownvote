const json2csv = require('json2csv').Parser;

require('dotenv').config();

const { School } = require('./src/lib/models');
const { dbConnect } = require('./src/lib/common');

function exportData(results) {
  const fields = [
    'firstName', 'lastName', 'mobile', 'email',
    'schoolStateCode', 'schoolStateName', 'schoolName', 'schoolCity',
  ];

  const data = results.filter(result => !!result.invitedBy).map(result => ({
    firstName: result.invitedBy.firstName,
    lastName: result.invitedBy.lastName,
    mobile: result.invitedBy.mobile,
    email: result.invitedBy.email,
    schoolStateCode: result.stateCode,
    schoolStateName: result.stateName,
    schoolCity: result.city,
    schoolName: result.name,
  }));

  const json2csvParser = new json2csv({ fields });
  const csv = json2csvParser.parse(data);

  console.log('writing data');
  require('fs').writeFileSync('amb.csv', csv);

  process.exit();
}

async function execute(mongoUri, lookback = 7) {
  try {
    console.log('starting script execution...');
    dbConnect(mongoUri);

    async function paginate(lastId, discovered) {
      console.log(`executing on page ending in ${lastId}...`);

      const query = { invitedBy: { '$ne': null } };
      if (lastId) {
        query['_id'] = { '$gt': lastId };
      }

      const schools = await School.find(query).populate('invitedBy');
      if (! schools || ! schools.length) {
        return discovered;
      }

      for (const school of schools) {
        const timeDiff = Date.now() - new Date(school.createdAt).getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (lookback >= dayDiff) {
          discovered.push(school);
        }
      }

      return paginate(schools[schools.length - 1].id, discovered);
    }

    paginate(null, []).then(exportData);
  } catch(error) {
    console.error(error);
  }
}

function parseArgs() {
  let lookback = 7;
  let mongoUri = null;

  process.argv.forEach((cmdArg) => {
    if (cmdArg.startsWith('lookback')) {
      lookback = parseInt(cmdArg.replace('lookback=', ''));
    }

    if (cmdArg.startsWith('mongoUri')) {
      mongoUri = cmdArg.replace('mongoUri=', '');
    }
  });

  if (! mongoUri) {
    console.log('Missing Mongo URI, exiting...');
    return;
  }

  execute(mongoUri, lookback);
}

parseArgs();
