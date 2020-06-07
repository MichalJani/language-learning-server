const express = require('express');

const {
  languageDetection,
  translationLanguages,
  translationLanguagesInEng,
} = require('../controllers/languages');

const router = express.Router();

router.route('/detection/:text').get(languageDetection);

router.route('/languages/:target').get(translationLanguages);

router.route('/languages').get(translationLanguagesInEng);

module.exports = router;
