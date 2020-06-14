"use strict";
const express = require('express');
const { translationEng, translation, translationWithModel } = require('../controllers/translation');
const router = express.Router();
router.route('/:target/:text').get(translationEng);
router.route('/:source/:target/:text').get(translation);
router.route('/model/:source/:target/:text').get(translationWithModel);
module.exports = router;
//# sourceMappingURL=translation.js.map