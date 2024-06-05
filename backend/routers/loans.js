import express from 'express';
import { getLoans, createLoan, updateLoan, getLoan, updateState, getThisLoan, getNoneLoan, returnBill } from '../controllers/loans.js';

const router = express.Router();

router.get('/', getLoans);

router.get('/unique', getLoan);

router.get('/updateState', updateState)

router.post('/', createLoan);

router.post('/update', updateLoan);

router.get("/getThisBill", getThisLoan)

router.get("/getNoneLoan", getNoneLoan)

router.post("/returnBill", returnBill)

export default router;