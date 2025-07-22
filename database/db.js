const mongoose = require("mongoose")
const {MONGO_URL} = require("../config")

// connect to mongoDB
mongoose.connect(MONGO_URL);

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName:String
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName:String
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }

})

const PurchasedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
})

const Admin = mongoose.model("Admin",AdminSchema)
const User = mongoose.model("User",UserSchema)
const Course = mongoose.model("course",CourseSchema)
const Purchased = mongoose.model("purchase",PurchasedSchema)

module.exports = {
    Admin,
    User,
    Course,
    Purchased
}