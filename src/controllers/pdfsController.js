const PDFDocument = require('pdfkit');
const fs = require('fs');



function generatePDF(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM formulario', (err, data) => {
          if (err) {
            Console.log('Error')
            throw err; 
          }

        const doc = new PDFDocument();
        const stream = doc.pipe(fs.createWriteStream('documento.pdf'));

        const blueColor = '#7DD2E4';
        const secondaryColor = '#36C0E1';
        
        doc.polygon([10, 50], [100 + 10, 50], [200 + 10, 0], [10, 0]).fill(blueColor);
        doc.polygon([200 + 10, 0], [290 + 10, 0], [250 + 10, 50], [160 + 10, 50]).fill(secondaryColor);



        doc.translate(10, 60);
        data.forEach((item) => {
            console.log(`${item["campo-texto"]}`);
            doc.text(`mensaje ${item["campo-texto"]}`);
            doc.text(`imagen ${item["campo-imagen"]}`);
            doc.text(`estado ${item["campo-seleccion"]}`);
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

    function insertData(req, res) {
      const data = req.body;
      req.getConnection((err, conn) => {
      conn.query('INSERT INTO formulario SET ?', [data], (err, rows) => {
      if (err) {
      console.log('Error inserting data: ', err);
      res.sendStatus(500);
      } else {
      console.log('Data inserted successfully');
      res.sendStatus(200);
      
            }
          })
        })
      }

    module.exports = {
        generatePDF,
        insertData
    }