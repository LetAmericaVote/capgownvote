const fs = require('fs');
const csvtojson = require('csvtojson');
const uuid = require('uuid');
const postal = require('postal-abbreviations');

function parseCsv(file) {
  const data = [];
  return new Promise((resolve) =>
    csvtojson().fromFile(file).on('json', json => data.push(json)).on('done', () => resolve(data))
  );
}

function formatData(source) {
  const schools = [];
  
  source.forEach(data => {
    schools.push({
      id: uuid.v4(),
      name: data['SCHOOL NAME'].toLowerCase(),
      city: data['CITY'],
      stateCode: data['STATE'],
      zipcode: data['ZIP'],
    });
  });

  const states = require('./states').states.map((state) => ({
    name: state,
    code: postal(state),
  }));

  return { schools, states };
}

function writeData(data) {
  fs.writeFileSync(`${__dirname}/competition.json`, JSON.stringify(data, null, '\t'));
}

parseCsv(`${__dirname}/20180208_HighSchools.csv`)
  .then(formatData)
  .then(writeData)
  .then(() => console.log('done'))
  .catch(console.error);
