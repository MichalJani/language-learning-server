// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

// Load env vars
dotenv.config({path: './config/config.env'});

const translation = require('./routes/translation');
const languages = require('./routes/languages');

const {Translate} = require('@google-cloud/translate').v2;

function main(
  projectId = 'YOUR_PROJECT_ID' // Your GCP Project Id
) {
  // console.log("projectId", projectId)
  // [START translate_quickstart]

  // const projectId = 'YOUR_PROJECT_ID';

  // Imports the Google Cloud client library

  // Instantiates a client
  const translate = new Translate({projectId});
  // console.log("translate", translate)

  async function quickStart() {
    // The text to translate
    const text = 'Hello, world!';

    // The target language
    const target = 'ru';

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  }

  quickStart();
  // [END translate_quickstart]
}

main(...process.argv.slice(2));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/translation', translation);
app.use('/api/v1/languages', languages);


const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-unused-vars
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});




// https://cloud.google.com/translate/docs/how-to
