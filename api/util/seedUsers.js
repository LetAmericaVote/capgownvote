require('../src/lib/common').dbConnect();

const { User, School } = require('../src/lib/models');

const randomBool = () => !!Math.round(Math.random());
const target = 100000;

async function makeUser(index, schools) {
  if (index >= target) {
    return;
  }

  if (index % 100 === 0) {
    console.log(`${index} of ${target} users made...`);
  }

  const school = schools[Math.floor(Math.random() * schools.length)];
  const user = new User({
    school,
    isRegistered: randomBool(),
    mobileCommonsId: randomBool() ? '12345' : null,
    stateCode: 'fl',
    hasStateLicense: randomBool(),
  });

  await user.save();
  return makeUser(index + 1, schools);
}

async function seedUsers() {
  const schools = await School.find();

  return makeUser(0, schools);
}

new Promise((resolve) => {
  console.log('seeding users...');
  seedUsers().then(() => process.exit())
}).catch(error => console.error(error));
