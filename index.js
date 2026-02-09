import express from "express";

const app = express();

app.get("/show/:name", (req,res)=>{
    let name = req.params.name;
    console.log(name);
    res.send(name);
});

app.get("/hello", (req,res)=>{
    res.send('world');
});

app.get("/", (req, res)=>{
    res.send("Ok");
});

app.listen(3000, ()=>{
    console.log("server started liteing...");
});