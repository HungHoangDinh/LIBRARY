import express from "express"
import bodyParser from "body-parser"
import passport from "passport"
import cookieSession from "cookie-session"
import logins from './routers/logins.js'
import dotenv from 'dotenv';

 import mongoose  from "mongoose"
 import cors from 'cors'

 import books from './routers/books.js'
 import loans from './routers/loans.js'

 import manageUsers from './routers/manageUsers.js'


dotenv.config();
const app = express();
const port = 5000;



app.use((req, res, next) => {
	const allowedOrigins = ['http://localhost:3000','http://localhost:4000'];
	const origin = req.headers.origin;
  
	if (allowedOrigins.includes(origin)) {
	  res.header('Access-Control-Allow-Origin', origin);
	} else {
	}
  
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Credentials', true);

	return next();
  });
  
app.use(bodyParser.json({limit:"50mb"})); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://hoangdinhhung20012003:8pXBe1IP4jwpf966@cluster0.veicgk6.mongodb.net/").then(()=>{

	console.log("thành công")}).catch(()=>{console.log("Thất bại")});

app.use("/logins",logins);
app.use("/books",books);
app.use('/loans',loans);
app.use("/manageusers", manageUsers)
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});