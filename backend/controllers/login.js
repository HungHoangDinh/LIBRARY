import bcrypt from 'bcrypt'
import { User } from '../models/schema.js';
import { Admin } from '../models/schema.js';
import nodemailer from 'nodemailer'
const saltRounds=10;
export const adminlogin = async (req, res) => {
    console.log(req.body.params.password);
    const adminname1=req.body.params.email;
    const password=req.body.params.password;
    Admin.findOne({email:adminname1}).then((admin)=>{
        if(admin){
            bcrypt.compare(password, admin.password).then(function(result) {
                if(result===true){
                    res.send({
                        state:"ok",
                        adminId:admin._id
                    });
                }
                else{
                    res.send("Mật khẩu không chính xác");
                }
            });
        }
        else{
            res.send("Tài khoản chưa được đăng kí, vui lòng chọn tài khoản");
        }
    })
};
export const userlogin = async (req, res) => {
    console.log(req);
    const username1=req.body.params.email;
    const password=req.body.params.password;
    User.findOne({email:username1}).then((user)=>{
        if(user){
            bcrypt.compare(password, user.password).then(function(result) {
                if(result===true){
                    res.send({
                        state:"ok",
                        user:{
                            id:user._id,
                            name:user.name,
                            penaltyNumber:user.penaltyNumber,
                            isChecked:user.isChecked,
                            isMember:user.isMember,
                            avatar:user.avatar,
                            googleId:user.googleId,
				            facebookId:user.facebookId
                        }
                    });
                }
                else{
                    res.send("Mật khẩu không chính xác");
                }
            });
        }
        else{
            res.send("Tài khoản chưa được đăng kí, vui lòng đăng kí tài khoản");
        }
    })
};
export const adminRegister = async (req, res) => {
    const email1=req.body.email;
    console.log(email1);
    Admin.exists({email:email1}).then((result)=>{
        if(result===null){
            var id;
            
            bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                // Store hash in your password DB.
                const newUser=new Admin({
                    name: req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:hash
                });
                newUser.save().then((result)=>id=result._id).catch((err)=>console.log(err));
            });
            
            res.status(200).send({
                state:"oke",
                userId:id
            });
        }
        else res.send("Tài khoản đã tồn tại");
    });

};
export const userRegister = async (req, res) => {
    const email1=req.body.params.email;
    User.exists({email:email1}).then((result)=>{
        if(result===null){
            var id;
            bcrypt.hash(req.body.params.password, saltRounds).then(function(hash) {
                // Store hash in your password DB.
                const newUser=new User({
                    name: req.body.params.name,
                    phone:req.body.params.phone,
                    email:req.body.params.email,
                    password:hash,
                    googleId:"",
                    facebookId:"",
                    penaltyNumber:0,
                    resetToken:"",
                    isChecked:false,
                    isMember:true,
                    avatar:""
                });
                newUser.save().then((result)=>{
                   
                    res.status(200).send({
                        state:"oke",
                        user:{
                            id:result._id,
                            name:newUser.name,
                            penaltyNumber:newUser.penaltyNumber,
                            isChecked:newUser.isChecked,
                            isMember:newUser.isMember,
                            avatar:newUser.avatar,
                            googleId:newUser.googleId,
                            facebookId:newUser.facebookId
                        }
                    });
                }).catch((err)=>console.log(err));
                console.log(id)
              
            });
            
            
        }
        else res.send("Tài khoản đã tồn tại");
    });

};
