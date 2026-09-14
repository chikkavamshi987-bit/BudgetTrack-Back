import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error('SMTP Error Details:', JSON.stringify(error, null, 2));
    } else {
        console.log('SMTP server is ready');
    }
});
