const pdf = require('html-pdf');
const pdfTemplate = require('./pdfPrint');
const generatePdf = async(data, res)=>{
    await pdf.create(pdfTemplate(data), {}).toFile(`Controllers/pdf/facture${data._id}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
    });
}

module.exports = generatePdf