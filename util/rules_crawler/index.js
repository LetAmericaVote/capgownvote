const URL = 'https://www.vote.org/voter-registration-rules/';

const cheerio = require('cheerio');
const request = require('request');
const postal = require('postal-abbreviations');

const data = [];

request(URL, (err, res, html) => {
  const $ = cheerio.load(html);
  const $states = $('.state');

  $states.each(function (index, state) {
    const title = $(this)
      .find('h2')
      .text()
      .replace('voter registration rules', '')
      .trim();

    const item = {
      title,
      code: postal(title),
      rules: [],
    };

    $(this).find('.text ul li').each(function (index, rule) {
      item.rules.push($(this).text());
    });

    data.push(item);
  });

  console.log(data);
  require('fs').writeFileSync(`${__dirname}/rules.json`, JSON.stringify({ rules: data }, null, "\t"));
});
