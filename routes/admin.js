
const { Router } = require("express")
const adminRouter = Router();
const {Admin, Course} = require("../database/db")
// const z = require("zod");
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const course = require("./course");

adminRouter.post("/signup", async function(req,res){
    const { email, password, firstName,lastName } = req.body;

    await Admin.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
            
    res.json({
        message: "signup successful"
    })
    
}) 

adminRouter.post("/signin", async function(req,res){

    const {email,password} = req.body;

    const admin = await Admin.findOne({
        email:email,
        password:password
    })
    if(admin){
        const token = jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD);
        
        res.json({
            token: token
        })
    }else {
        res.status(403).json({
            message:"Incorrect ID or Password"
        })
    }

})

adminRouter.post("/course/create",adminMiddleware,async function(req,res){
    //create course
    const adminId = req.userId;

    const {title,description,imageUrl,price} = req.body;

    const course = await Course.create({
        title:  title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        message: "course created",
        courseId: course._id
    })
}) 

adminRouter.get("/course/view",adminMiddleware,async function(req,res){
        //display all courses
        const adminId = req.userId;

        const courses = await Course.find({
            _id : course._id
        })
        res.json({
            courses 
        })

})

adminRouter.put("course/update" ,adminMiddleware,async function(req,res){
    //update existing course

    const adminId = req.userId;

    const {title,description,imageUrl,price,courseId} = req.body;

    const course = await Course.updateOne({
        _id: courseId,

        creatorId: adminId
    
    },{
        title:  title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminIcourse
    })
    res.json({
        message: "course updated",
        courseId: course._id
    })
})


module.exports = {
    adminRouter:adminRouter
}