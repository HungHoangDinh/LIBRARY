import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({ 
    email:String,
    password:String, 
});
export const User=mongoose.model("User",userSchema);
export const Admin=mongoose.model("Admin",{
    email:String,
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
    username:String,
    borrowDate: String,
    returnDate:String,
    expireDate:String,
    state:String,
    borrowedBook:[{
        bookId:String
    }]
});
