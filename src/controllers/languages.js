// eslint-disable-next-line no-unused-vars
const path = require('path');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const {Translate} = require('@google-cloud/translate').v2;
// eslint-disable-next-line
const translate = new Translate({...process.argv.slice(2)});

// @desc      Detect language
// @route     GET /api/v1/languages/detection/:text
// @access    Public
exports.languageDetection = asyncHandler(async (req, res, next) => {
  const {text} = req.params;
  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.

  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log('Detections:');
  detections.forEach(detection => {
    console.log(`${detection.input} => ${detection.language}`);
  });

  if (!detections) {
    return next(new ErrorResponse('Language not detected', 404));
  }

  res.status(200).json({success: true, data: detections});
});

// @desc      List available languages in english
// @route     GET /api/v1/translation/languages
// @access    Public
exports.translationLanguagesInEng = asyncHandler(async (req, res, next) => {
  // Lists available translation language with their names in English (the default).
  const [languages] = await translate.getLanguages();

  console.log('Languages:');
  languages.forEach(language => console.log(language));

  if (!languages) {
    return next(
        new ErrorResponse(
            `Translation not found with id of ${req.params.id}`,
            404,
        ),
    );
  }

  res.status(200).json({success: true, data: languages});
});

// @desc      List available languages in a target language
// @route     GET /api/v1/translation/languages/:target
// @access    Public
exports.translationLanguages = asyncHandler(async (req, res, next) => {
  // Lists available translation language with their names in a target language
  const {target} = req.params;
  console.log('exports.translationLanguages -> target', target);

  const [languages] = await translate.getLanguages(target);

  console.log('Languages:');
  languages.forEach(language => console.log(language));

  if (!languages) {
    return next(
        new ErrorResponse(
            `Translation not found with id of ${req.params.id}`,
            404,
        ),
    );
  }

  res.status(200).json({success: true, data: languages});
});

// @desc      Get a list of supported languages
// @route     GET /api/v1/translation/languages/supported
// @access    Public
exports.translationLanguagesSupported = asyncHandler(async (req, res, next) => {
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */

  const location = 'global';
  const projectId = 'ringed-metric-278907';
  // Imports the Google Cloud Translation library
  const {TranslationServiceClient} = require('@google-cloud/translate');

  // Instantiates a client
  const translationClient = new TranslationServiceClient();


  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    // Get supported languages
    const [response] = await translationClient.getSupportedLanguages(request);

    for (const language of response.languages) {
      // Supported language code, generally consisting of its ISO 639-1 identifier, for
      // example, 'en', 'ja'. In certain cases, BCP-47 codes including language and
      // region identifiers are returned (for example, 'zh-TW' and 'zh-CN')
      console.log(`Language - Language Code: ${language.languageCode}`);
      // Human readable name of the language localized in the display language specified
      // in the request.
      console.log(`Language - Display Name: ${language.displayName}`);
      // Can be used as source language.
      console.log(`Language - Support Source: ${language.supportSource}`);
      // Can be used as target language.
      console.log(`Language - Support Target: ${language.supportTarget}`);
    }
  } catch (error) {
    console.error(error.details);
  }


  if (!languages) {
    return next(
        new ErrorResponse(
            `Translation not found with id of ${req.params.id}`,
            404,
        ),
    );
  }

  res.status(200).json({success: true, data: response});
});
