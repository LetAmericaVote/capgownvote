const express = require('express');
const common = require('./src/lib/common');
common.dbConnect();

const app = express();
common.jsonMiddleware(app);
common.cors(app);

require('./src/lib/models');
require('./src/routes/schools')(app);
require('./src/routes/rtv')(app);
require('./src/routes/chatbot')(app);
require('./src/routes/invites')(app);
require('./src/routes/user')(app);
require('./src/routes/auth')(app);
require('./src/routes/reminder')(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}`));
