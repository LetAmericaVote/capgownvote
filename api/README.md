# capgownvote/api

This is the core API behind the Cap Gown Vote. It provides a set of restful endpoints for the public facing client to engage with. The API also acts as a proxy to the Mobile Commons & Rock the Vote API's.

## Installation

Requires the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli).

```sh
$ npm install

# Copy & fill out all env values
$ cp .env.example .env

$ npm run seed-schools-local

# Warning: This one is optional and takes a few minutes depending on your computer.
# Useful for testing the leaderboard at scale.
$ npm run seed-users-local
```

## Usage

```sh
$ npm start
```

## Deploys

Push to master & deploy within Heroku.
