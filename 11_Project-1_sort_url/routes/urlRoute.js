const express = require("express");
const router = express.Router();

const {handleGenerateSortURL} = require('../controllers/urlControllers');

router.post('/',handleGenerateSortURL );

module.exports = router