const express=require('express');

const app=express();

//app.use("/route",rh,[rh2,rh3],rh4,rh5);


app.use("/user",[(req,res,next)=>{
   // res.send("Route handler 1");
   console.log("Handling the route user");
   next();
   
},(req,res,next)=>{
    console.log("Handling the route user 2!!");
   // res.send("2nd Response!!");
   next();


},(req,res,next)=>{
    console.log("Handling the route user 3!!");
    next();
}
,
(req,res,next)=>{
    console.log("Handling the route user 4!!");
    //res.send("4 th Response!!");
    next();
},
(req,res)=>{
    console.log("Handling the route user 5");
    res.send("5 th Response");
}
]




);

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


app.listen(7777,()=>{
    console.log("Server is running successfully on port 7777");
});