// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const path = require('path');
// const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

// Load env vars
// dotenv.config({path: './config/config.env'});

const translation = require('./routes/translation');
const languages = require('./routes/languages');


// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/translation', translation);
app.use('/api/v1/languages', languages);


const PORT = process.env.PORT || 8080;

// eslint-disable-next-line no-unused-vars
const server = app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}`.yellow.bold,
    ),
);

// Handle unhandled promise rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});


// https://cloud.google.com/translate/docs/how-to
