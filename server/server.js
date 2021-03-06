/////////////////////////////////////////////////////
////////  		strategic machines            ////////
///////     markeplace server v 1.2.0      ////////
//////////////////////////////////////////////////

const express = require('express');
const setup = require('./config/').init();
require('dotenv').config()

const app = express();
const port = setup.port;

////////////////////////////////////////////////////
//////////////// DB Config and Init ////////////////
////////////////////////////////////////////////////

const db = process.env.DB_URI || setup.db.uri;
require('./db/mongoose')(db);

///////////////////////////////////////////////////
/////////// Register and Config Routes ////////////
///////////////////////////////////////////////////

const access = express.Router();
const repos = express.Router();
const issues = express.Router();

require('./routes/access')(access);
require('./routes/repos')(repos);
require('./routes/issues')(issues);

////////////////////////////////////
/////////// API Catalog ////////////
////////////////////////////////////

app.use(access);
app.use('/api/github/repos', repos);
app.use('/api/github/issues', issues);

////////////////////////////////
//////// Spin up server ////////
////////////////////////////////

app.listen(port, () => {
    console.log(`Server listening and running on port ${port}; Ctrl + C to stop`) 
});
