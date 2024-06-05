import express from 'express';
import { userRegister, userlogin, adminlogin, adminRegister } from '../controllers/login.js';
const router = express.Router();
router.post('/login', userlogin);
router.post("/admin/login",adminlogin);
router.post("/register",userRegister);
router.post("/admin/register",adminRegister);
export default router;