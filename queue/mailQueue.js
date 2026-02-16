import {Queue, Worker} from 'bullmq';
import { sendMail } from '../utils/sendMail.js';

let connectionSetting = {
    connection: {
        host: 'localhost',
        port: 6379,
    }
}

let emailQueue = new Queue('Email', connectionSetting);

let emailWorker = new Worker('Email', job => {
    if(job.name === 'sendEmail'){

        let {email, subject, body} = job.data;
        if(!email || !subject || !body){
            console.log('not enough data to send an email, EMail-', email, ', Subject-', subject,', Body-',body);
            return ;
        }
        async function callSendMail(){
            await sendMail(email, subject, body);
        }

        callSendMail();
    }
}, connectionSetting);

export {emailQueue};