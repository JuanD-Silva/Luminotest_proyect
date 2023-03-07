const express = require('express');
const pdfController = require('../controllers/pdfsController');

const routerPdf = express.Router();

routerPdf.get('/generate-pdf', pdfController.generatePDF);

module.exports = routerPdf;
