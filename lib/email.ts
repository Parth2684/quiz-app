

import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER as string, 
        pass: process.env.EMAIL_PASS as string,
    }
})

export const verifyEmail = (email: string, token: string, name: string) => transporter.sendMail({
    from: "Quizzo",
    to: email,
    subject: "Verify your email",
    html: `<p>Hi ${name}, click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}">here</a> to verify your email and set the password </p>`
})