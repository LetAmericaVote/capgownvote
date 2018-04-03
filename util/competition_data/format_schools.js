const fs = require('fs');
const csvtojson = require('csvtojson');
const postal = require('postal-abbreviations');
const nc = require('namecase');

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
      name: nc(data['School Name']),
      city: nc(data['City']),
      stateCode: data['State'].toLowerCase(),
      zipcode: `${data['ZIP'].length === 5 ? '' : '0'}${data['ZIP']}`,
    });
  });

  return { schools };
}

function writeData(data) {
  fs.writeFileSync(`${__dirname}/competition.json`, JSON.stringify(data, null, '\t'));
}

parseCsv(`${__dirname}/CapGownVoteCities.csv`)
  .then(formatData)
  .then(writeData)
  .then(() => console.log('done'))
  .catch(console.error);
