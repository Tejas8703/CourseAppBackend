require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose")

const app = express()
app.use(express.json());
const port = 3000;

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")


app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/admin", adminRouter )


async function connection(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected")
        app.listen(port, ()=>{
            console.log("listening port 3000")
        });

    }catch(err){
        console.error("faliled to connect")
    }


  
}

connection();
