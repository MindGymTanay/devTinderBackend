const mongoose=require('mongoose');

const connectDB=async ()=>{
    await 
    mongoose.connect("mongodb+srv://NamasteDev:2r_FQBL%40PbEVMgd@namastenode.ed8uhbk.mongodb.net/?appName=NamasteNode");
   
}
module.exports=connectDB;

