import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({ 
    name:String,
    phone:String,
    email:String,
    password:String, 
    googleId: String,
    facebookId:String,
    resetToken:String,
    penaltyNumber:Number,
    isChecked:Boolean,
    isMember:Boolean,
    resetToken:String,
    avatar:String,
});
export const User=mongoose.model("User",userSchema);
export const Admin=mongoose.model("Admin",{
    name:String,
    email:String,
    phone: String,
    password:String
});
export const Book=mongoose.model("Book",{
    bookId:String,
    name:String,
    author:String,
    publishor:String,
    category:String,
    amount:Number,
    available:Number,
    description:String,
    image: String
});
export const Bill=mongoose.model("Bill",{
    billID:String,
    userId:String,
    borrowDate: String,
    returnDate:String,
    expireDate:String,
    state:String,
    borrowedBook:[{
        bookId:String
    }]
});
export const Plan=mongoose.model("Plan",{
    planId: mongoose.Schema.Types.ObjectId,  // Trường làm khóa chính
    title: String,
    amount: Number,
    duration: Number,
    status: String,
});
export const PurchaseHistory=mongoose.model("PurchaseHistory",{
    userId: String,
    planName: String,
    startDate: Date,
    endDate: Date,
    status: String,
});
export const Notifications=mongoose.model("Notifications",{
    title: String,
    content: String,
    date: String
});