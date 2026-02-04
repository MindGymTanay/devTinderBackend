const express=require('express');
const connectDB=require("./config/database");

const app=express();
const User=require("./models/User");

app.post("/signUp",async (req,res)=>{

    const userObj={
        firstName:"Sachin",
        lastName:"Tendulkar",
        emailId:"sachin@gmail.com",
        password:"Sachin@123",
        
    }
    const user=new User(userObj);

    //creating a new instance of User model
    try{
       
        await user.save();
        res.send("user added successfully");
         
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
   


})

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("Server is running successfully listening on port 7777");
    });
    
})
.catch((err)=>{
    console.error("Database cannot be connected");
});



