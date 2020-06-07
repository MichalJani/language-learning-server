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
// @route     GET /api/v1/languages
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
        404
      )
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
        404
      )
    );
  }

  res.status(200).json({success: true, data: languages});
});
