import { Bill, Book } from "../models/schema.js";
export const getLoans = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
      } catch (err) {
        res.status(500).json({ error: err });
      }
};

export const getLoan = async (req, res) => {
    try {
        const {billID} = req.query;
        const bill = await Bill.findOne({ billID });
        const books = [];
        for (let i = 0; i < bill.borrowedBook.length; i++){
            const book = await Book.findOne({_id: bill.borrowedBook[i].bookId})
            books.push(book);
        }
        const result = {
            bill: bill,
            books: books
        }
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err });
      }
};

export const updateState = async (req, res) => {
    try{
        const bills = await Bill.find({returnDate: 'None'});
        const today = new Date();
        await Promise.all(bills.map(async (bill) => {
            if (new Date(bill.expireDate) < today) {
                await Bill.updateOne({ billID: bill.billID }, { $set: { state: 'Overdue' } });
                console.log("Overdue");
            }
        }));
        res.status(200).json({tt:"ok"})
    }catch(err){
        res.status(500).json({tt:"err"})
    }
    
};

export const createLoan = async (req, res) => {
    try{
        // console.log(req.body);
        const bill = new Bill(req.body);
        bill.save();
        res.status(200).json({tt: "OK"})  
      }catch(error){
        res.status(500).json({tt: "ERROR"})
      }
};

export const updateLoan = async (req, res) => {
    try{
        const updateBill = req.body;
        const book = await Bill.findOneAndUpdate({billID: updateBill.billID}, updateBill, {new: true});
        console.log("Thành công");
        res.status(200).json({tt: "OK"})
      }catch(error){
        console.log("Lỗi", error);
        res.status(500).json({tt: "Lỗi"})
      }
};

export const getThisLoan = async (req, res) => {
    try{
        // console.log(req.query);
        const bills = await Bill.find({userId: req.query.userId});
        var flag = true;
        for(let i = 0; i < bills.length; i++){
            if(bills[i].state !== 'Returned'){
                flag = false;
                break;
            }
        }
        // console.log(flag);
        if(flag){
            // console.log({tt: "YES", numOfBill: bills.length});
            res.status(200).json({tt: "YES", numOfBill: bills.length})
        }else{
            // console.log({tt: "NO", numOfBill: bills.length});
            res.status(200).json({tt: "NO", numOfBill: bills.length})
        }
    }catch(error){

    }
};

export const getNoneLoan = async (req, res) => {
    try{
        console.log(req.query);
        const bills = await Bill.find({userId: req.query.userId});
        var books = [];
        for(let i = 0; i < bills.length; i++){
            if(bills[i].returnDate === 'None'){
                for(let j = 0; j < bills[i].borrowedBook.length; j++){
                    books.push(bills[i].borrowedBook[j].bookId)
                }
                res.status(200).json({billID: bills[i].billID, borrowDate: bills[i].borrowDate, expireDate: bills[i].expireDate, books: books})
                break;
            }
        }
    }catch(error){

    }
};