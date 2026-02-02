const express=require('express');

const app=express();

const {adminAuth,userAuth}=require("./middlewares/auth.js")
//app.use("/route",rh,[rh2,rh3],rh4,rh5);

app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
    res.send("user logged in successfully");

})



 app.get("/user/data",userAuth,(req,res)=>{
    
    res.send("User Data Sent");

})
app.get("/admin/getAllData", (req,res)=>{

         res.send("All Data Sent");
})

app.get("/admin/deleteUser", (req,res)=>{
    res.send("Delete a user");
    
})



app.use("/",(req,res,next)=>{
    console.log("matching route");

    next();
  

})

app.get("/user",(req,res,next)=>{
    console.log("Handling the route user 2!!");
   res.send("2nd Route Handler");
    next();
})


app.get("/user",
(req,res,next)=>{
   // res.send("Route handler 1");
   console.log("Handling the route user!!");
   //next();
   
},
);


app.listen(7777,()=>{
    console.log("Server is running successfully on port 7777");
});

//This will only handle GET calls to /user
//This are the Dynamic Routes for our application
// app.get("/user/:userId/:name/:password", (req,res)=>{
//     console.log(req.params);
//     res.send({firstName:"Tanay",lastName:"Agrawal"});
// })

// app.post("/user",(req,res)=>{

//     console.log("Save data to the database");
//     res.send("Data scuscesfully saved to the database ");
// })

// app.delete("/user",(req,res)=>{

   
//     res.send("Data deleted sucessfully ");
// })


//This Will match all the HTTP methods API calls to /test
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello Hello");

// })

// app.use("/test",(req,res)=>{
//     res.send("Hello from the server");

// })
// app.use("/",(req,res)=>{
//     res.send("Namaste NodeJS ")
// })


