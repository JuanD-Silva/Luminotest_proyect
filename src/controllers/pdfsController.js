const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, data) => {
          if (err) {
            Console.log('Error')
            throw err; 
          }

        const doc = new PDFDocument();
        const stream = doc.pipe(fs.createWriteStream('documento.pdf'));

        data.forEach((item) => {
            console.log(`${item.name}`)
            doc.text(`Nombre: ${item.name}`);
            doc.text(`Email: ${item.email}`);
            doc.text('-----------------------------------------');
          });
          doc.end();

          // Envía el archivo PDF como descarga
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=datos.pdf');
          doc.pipe(res);
        });
      });
    }

    module.exports = {
        generatePDF
    }