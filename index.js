import express from "express";
import {rateLimit} from "express-rate-limit";

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

app.get("/show/sum/:a/:b", apiReqLimitUser, (req,res)=>{
    let {a = 0,b = 0} = req.params;
    res.send(Number(a) + Number(b));
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