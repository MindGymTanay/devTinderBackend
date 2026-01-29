const express=require('express');

const app=express();

//This will only handle GET calls to /user
//This are the Dynamic Routes for our application
app.get("/user/:userId/:name/:password", (req,res)=>{
    console.log(req.params);
    res.send({firstName:"Tanay",lastName:"Agrawal"});
})

app.post("/user",(req,res)=>{

    console.log("Save data to the database");
    res.send("Data scuscesfully saved to the database ");
})

app.delete("/user",(req,res)=>{

   
    res.send("Data deleted sucessfully ");
})


//This Will match all the HTTP methods API calls to /test
app.use("/hello",(req,res)=>{
    res.send("Hello Hello Hello");

})

app.use("/test",(req,res)=>{
    res.send("Hello from the server");

})
// app.use("/",(req,res)=>{
//     res.send("Namaste NodeJS ")
// })


app.listen(7777,()=>{
    console.log("Server is running successfully on port 7777");
});