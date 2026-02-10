import express from "express";

const app = express();

app.get("/", (req, res)=>{
    console.log("Hello this line got added in the default route");
    res.send("Ok");
})

app.listen(3000, ()=>{
    console.log("server started liteing...");
});