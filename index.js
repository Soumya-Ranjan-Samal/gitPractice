import express from "express";

const app = express();


app.get("/show/sum/:a/:b", (req,res)=>{
    let {a = 0,b = 0} = req.params;
    res.send(Number(a) + Number(b));
});



app.get("/show/:name", (req,res)=>{
    let name = req.params.name;
    console.log(name);
    res.send(name);
});

app.get("/hello", (req,res)=>{
    res.send('world');
});

app.get("/", (req, res)=>{
    console.log("Hello this line got added in the default route");
    res.send("Ok");
});


app.listen(3000, ()=>{
    console.log("server started liteing...");
});