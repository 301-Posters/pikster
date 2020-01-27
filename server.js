'use strict';

///////////////// DEPENDENCIES ///////////////////
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const cors = require('cors');
app.use(cors());

app.get('/hi', (request, response) => {
response.send('Hello')
}) 



app.listen(PORT, () => console.log(`We are listening on port ${PORT}!`))

