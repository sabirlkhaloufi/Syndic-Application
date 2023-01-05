const pdf = require('html-pdf');
const pdfTemplate = require('./pdfPrint');
const generatePdf = async(data, res)=>{
    // await pdf.create(pdfTemplate(data), {}).toFile(`uploads/result.pdf`, (err) => {
    //     if(err) {
    //         res.send(Promise.reject());
    //     }

    //     res.send(data);
    // });

    pdf.create(pdfTemplate(data), {}).toFile('uploads/result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send({m:"d"});
    });
}

module.exports = generatePdf