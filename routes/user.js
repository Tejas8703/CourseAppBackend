const { Router } = require("express")
const { User, Purchased } = require("../database/db")
const userRouter = Router();
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config")
// const z = require("zod");

// const Validform = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
//   firstName: z.string(),
//   lastName: z.string()

// });


userRouter.post("/signup", async function(req,res){
    
    const { email, password, firstName,lastName } = req.body;
   

    
        await User.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        
        res.json({
            message: "signup successful"
        })
     

}) 

userRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;

    const user = await User.findOne({
        email:email,
        password:password
    })
    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD);
        
        res.json({
            token: token
        })
    }else {
        res.status(403).json({
            message:"Incorrect ID or Password"
        })
    }
})

userRouter.get("/purchases",async function(req,res){

    const userId = req.userId

    const purchases = await Purchased.find({
        userId
    })
    res.json({
        purchases
    })

})

module.exports = {
    userRouter : userRouter
}