const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muhammadshiraz492@gmail.com',
        pass: 'tldv klbv ynwj nhjo' // Consider using environment variables for credentials
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload-and-send-email', upload.single('pdf'), async (req, res) => {
    try {
        // Validate request
        if (!req.file || !req.body.advocate || !req.body.location || !req.body.score || !req.body.htmlContent) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        const { advocate, location, score, htmlContent } = req.body;
        const pdfPath = req.file.path;

        const mailOptions = {
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
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Clean up the file after sending the email
        fs.unlink(pdfPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        console.log('Email sent successfully');
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error in processing request:', error);

        // Clean up the file if an error occurred before the file was deleted
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file after failure:', err);
                }
            });
        }

        res.status(500).json({ success: false, message: 'Failed to process request' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
