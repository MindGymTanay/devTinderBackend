const express=require('express');
const connectDB=require("./config/database");

const app=express();
const User=require("./models/User");

app.use(express.json());

app.post("/signUp",async (req,res)=>{

    console.log(req.body);

    // const userObj={
    //     firstName:"Sachin",
    //     lastName:"Tendulkar",
    //     emailId:"sachin@gmail.com",
    //     password:"Sachin@123",
        
    // }
    const user=new User(req.body);

    //creating a new instance of User model
    try{
       
        await user.save();
        res.send("user added successfully");
         
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
   


})

//get user By email 
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{

        const user=await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
        res.send(user);
        }

    // const users=await User.find({emailId:userEmail});
    // if(users.length===0){
    //     res.status(404).send("User not found");
    // }
    // else{
    // res.send(users);
    // }

    }
    catch(err){
        res.status(400).send('something went wrong');
    }
})

app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);

        res.send("User deleted Successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{

        const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"});
        console.log(user);
        res.send("user updated successfully ")

    }
    catch(err){
        res.status(400).send("something went wrong");

    }

})
app.get("/feed",async (req,res)=>{

    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
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



