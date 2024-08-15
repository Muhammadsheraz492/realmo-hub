const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors'); // Correct import

const app = express(); // Correct usage of express
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS  // Use environment variables
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
);

router.get('/', (req, res) => {
    res.status(200).json("Server is Working");
});

router.post('/upload-and-send-email', upload.single('pdf'), async (req, res) => {
    try {
        // Validate request
        if (!req.file || !req.body.advocate || !req.body.location || !req.body.score || !req.body.htmlContent) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        const { advocate, location, score, htmlContent } = req.body;
        const pdfPath = req.file.path;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'tocybernatesolution@gmail.com',
            subject: 'Quiz Results',
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
        console.log('Error in processing request:', error);

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

app.use(router);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
