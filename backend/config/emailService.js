import dotenv from 'dotenv'
dotenv.config();
import http from 'http'
import nodemailer from 'nodemailer';



  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
})

async function sendEmail(to,subject,text){
    try{
       const info = await transporter.sendMail({
             from: process.env.EMAIL,
             to,
             subject,
             text
        });

        return {success:true, messageId:info.messageId}
    }catch(err){
        console.log(err)
        return {success:false, error:error.message}
    }
}

export default sendEmail