const express = require('express');
const pdfController = require('../controllers/pdfsController');


const routerPdf = express.Router();

routerPdf.get('/generate-pdf', pdfController.generatePDF);
routerPdf.post('/insert-data', pdfController.insertData);

module.exports = routerPdf;
