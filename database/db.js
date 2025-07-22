const mongoose = require("mongoose")


// connect to mongoDB
mongoose.connect('mongodb+srv://user03:mXQPVTwMdRJRhBly@cluster0.i8xu1.mongodb.net/CourseApp');

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