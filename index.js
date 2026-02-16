import express from "express";
import {rateLimit} from "express-rate-limit";
import { emailQueue } from "./queue/mailQueue.js";
import { sendMail } from "./utils/sendMail.js";

const app = express();
const apiReqLimitUser = rateLimit({
    windowMs: 1000 * 60 * 5, // five minute
    limit: 3,
    message: "Too many request",
    standardHeaders : true,
    legacyHeaders: false,
});

const apiReqLimitAdmin = rateLimit({
    windowMs: 1000 * 60 * 5, // five minute
    limit: 3,
    message: "Too many request",
    standardHeaders : true,
    legacyHeaders: false,
});

// app.use(apiReqLimit);
app.use(express.json());


app.post('/sendemail', apiReqLimitAdmin, async (req,res)=>{
    let {email, subject, body} = req.body;
    if(!email || !subject || !body){
        res.status(400).json({
            message: 'Invalid Inputs!',
        });
    }
    emailQueue.add('sendEmail', {
        email,
        subject,
        body
    }, {
        removeOnComplete : true,
        removeOnFail: false,
    });
    // await sendMail(email, subject,body);
    res.status(201).json({
        message: `Email is sent to ${email} regarding ${subject}`,
    });
});

app.get("/show/sum/:a/:b", apiReqLimitUser, (req,res)=>{
    let {a = 0,b = 0} = req.params;
    res.send(Number(a) + Number(b));
});

app.get('/show/:name/:age', (req,res)=>{
    console.log(`${req.params.name}' is ${req.params.age}  years old.`);
    res.send("Printed the details");
});

// new comment line

app.get("/show/:name", apiReqLimitUser, (req,res)=>{
    let name = req.params.name;
    console.log(name);
    res.send(name);
});

app.get("/hello", apiReqLimitUser, (req,res)=>{
    res.send('world');
});

app.get("/", apiReqLimitAdmin, (req, res)=>{
    console.log("Hello this line got added in the default route");
    res.send("Ok");
});


app.listen(3000, ()=>{
    console.log("server started liteing...");
});