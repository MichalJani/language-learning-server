// eslint-disable-next-line no-unused-vars
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const {Translate} = require('@google-cloud/translate').v2;
// Imports the Google Cloud Translation library
const {TranslationServiceClient} = require('@google-cloud/translate');
// eslint-disable-next-line node/no-unsupported-features/es-syntax
const translate = new Translate({...process.argv.slice(2)});
// Instantiates a client
const translationClient = new TranslationServiceClient();


// @desc      Get single translation in English
// @route     GET /api/v1/translation/:target/:text
// @access    Public
exports.translationEng = asyncHandler(async (req, res, next) => {
  console.log('exports.translation -> req:', req.params);
  // const bootcamp = await Bootcamp.findById(req.params.id);
  const {text, target} = req.params;

  // The text to translate

  // The target language

  // Translates some text into Russian
  const [translated] = await translate.translate(text, target);

  console.log(`Translation: ${translated}`);

  if (!translated) {
    return next(
      new ErrorResponse(
        `Translation not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({success: true, data: translated});
});


// @desc      Get single translation
// @route     GET /api/v1/translation/:source/:target/:text
// @access    Public
exports.translation = asyncHandler(async (req, res, next) => {




  const {projectId = 'ringed-metric-278907' ,location = 'global'}= {...process.argv.slice(2)}


const {source, target, text } = req.params





  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: source,
    targetLanguageCode: target,
  };

  try {
    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      console.log(`Translation: ${translation.translatedText}`);
    }

    res.status(200).json({success: true, data: response});
  } catch (error) {
    console.error(error.details);
  }


})



// @desc      Get single translation
// @route     GET /api/v1/translation/model/:source/:target/:text
// @access    Public
exports.translationWithModel = asyncHandler(async (req, res, next) => {

// const projectId = 'YOUR_PROJECT_ID';
// const location = 'us-central1';
// const modelId = 'YOUR_MODEL_ID';
// const text = 'text to translate';


  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'en',
    targetLanguageCode: 'ja',
    model: `projects/${projectId}/locations/${location}/models/${modelId}`,
  };

  try {
    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      console.log(`Translated Content: ${translation.translatedText}`);
    }


    res.status(200).json({success: true, data: response});
  } catch (error) {
    console.error(error.details);
  }


})
