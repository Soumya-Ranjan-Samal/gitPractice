import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("Ok");
});

// new modification in index.js

app.listen(3000, ()=>{
    console.log("server started liteing...");
});