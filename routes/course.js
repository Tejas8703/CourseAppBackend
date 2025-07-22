
const { Router } = require("express")
const {Course, Purchased} = require("../database/db");
const { userMiddleware } = require("../middleware/user");
const courseRouter = Router();

courseRouter.get("/preview",userMiddleware,async function(req,res){

    const userId = req.userId
    const courseId = req.body.courseId

    await Purchased.create({
        userId,
        courseId
    })
    
    res.json({
        message:"u bought the course"
    })

})


courseRouter.post("/purchase",async function(req,res){
    const courses = await Course.find({})

    res.json({
        courses
    })

})

module.exports = {
    courseRouter: courseRouter
}