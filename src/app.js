const express=require('express');
const connectDB=require("./config/database");

const app=express();
const User=require("./models/User");
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt");


app.use(express.json());

app.post("/signUp",async (req,res)=>{

    try{

    validateSignUpData(req);
    const {firstName,lastName,emailId,password}=req.body;

    console.log(req.body);

    // const userObj={
    //     firstName:"Sachin",
    //     lastName:"Tendulkar",
    //     emailId:"sachin@gmail.com",
    //     password:"Sachin@123",
        
    // }
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

    //creating a new instance of User model
    
       
        await user.save();
        res.send("user added successfully");
         
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
   


})

app.post("/login",async(req,res)=>{

    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid credentials");
        }

        
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("Login Successful!!!");
        }
        else{
           throw new Error("Invalid credentials");
        }



    }
    catch(err){
        res.status(400).send("Error:" + err.message);

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

app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{

    const ALLOWED_UPDATES=[
       "photoUrl","about","gender","age","skills"
    ]

    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("update not allowed");
    }
    if(data?.skills.length>10){
        throw new Error("skills cannot be more than 10");
    }
    

        const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("user updated successfully ")

    }
    catch(err){
        res.status(400).send("something went wrong "+ err.message);

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



