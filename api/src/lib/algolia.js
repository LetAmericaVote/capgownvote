const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_API_KEY);
const index = client.initIndex('schools');

module.exports = {
  addSchool: function(school) {    
    const object = {
      objectID: school.id,
      name: school.name,
    };

    return new Promise((resolve, reject) => {
      index.addObject(object, (err, content) => {
        if (err) {
          return reject(err);
        }

        resolve(content);
      });
    });
  },

  deleteSchool: function(school) {
    return new Promise((resolve, reject) => {
      index.deleteObject(school.id, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  },
};
