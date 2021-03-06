require('../src/lib/common').dbConnect();

const { School } = require('../src/lib/models');
const { schools } = require('../src/data/competition-seed');

function seedSchool(index) {
  if (! schools[index]) {
    console.log('Done');
    return;
  }

  console.log(`Seeding School ${index} of ${schools.length - 1}`);

  const item = schools[index];

  const school = { ...item };

  return new School(school)
    .save()
    .then(() => seedSchool(index + 1));
}

seedSchool(0).then(() => setTimeout(() => {}, 2000));
