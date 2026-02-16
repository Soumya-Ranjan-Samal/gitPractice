import {createTransport} from "nodemailer";
import {configDotenv} from "dotenv";

configDotenv();

const transporter = createTransport({
    port : process.env.EMAIL_PORT,
    host : process.env.EMAIL_HOST,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


async function sendMail(email, subject, body){
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: body,
        });
    }catch(error){
        console.log(error);
    }
    
}

export {sendMail};