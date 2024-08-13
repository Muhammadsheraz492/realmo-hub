const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muhammadshiraz492@gmail.com',
        pass: 'zitb fibj usxq lvrg'
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload-and-send-email', upload.single('pdf'), (req, res) => {
    const { advocate, location, score, htmlContent } = req.body;
    const pdfPath = req.file.path;
    console.log(pdfPath);
    

    transporter.sendMail({
        from: 'muhammadshiraz492@gmail.com',
        to: 'tocybernatesolution@gmail.com',
        subject: 'Quiz Results',
        text: `Advocate: ${advocate}\nLocation: ${location}\nScore: ${score}`,
        html: htmlContent,
        attachments: [
            {
                path: pdfPath,
                filename: 'results.pdf'
            }
        ]
    }, (error, info) => {
        // Clean up the file after sending the email
        // fs.unlink(pdfPath, (err) => {
        //     if (err) console.error('Error deleting file:', err);
        // });

        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
