const mongoose=require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then(result=>{
    console.log("MongoDB Atlas connected with pfserver");
}).catch(err=>{
    console.log("connection failed!!");
    console.log(err);
})
