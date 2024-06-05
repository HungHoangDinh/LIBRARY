import {Book} from "../models/schema.js"
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
      } catch (err) {
        res.status(500).json({ error: err });
      }
};

export const getBook = async (req, res) => {
  try {
    console.log(req.query.bookId);
    const { bookId } = req.query;
    const book = await Book.findOne({ bookId });
    return res.status(200).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try{
    console.log(req.body);
    const book = new Book(req.body);
    book.save();
    res.status(200).json({tt: "OK"})  
  }catch(error){
    res.status(500).json({tt: "ERROR"})
  }
};

export const updateBook = async (req, res) => {
    try{
      const updateBook = req.body;
      console.log(updateBook);
      const book = await Book.findOneAndUpdate({bookId: updateBook.bookId}, updateBook, {new: true});
      console.log("Thành công");
      res.status(200).json({tt: "OK"})
    }catch(error){
      console.log("Lỗi", error);
      res.status(500).json({tt: "Lỗi"})
    }
};

export const deleteBook = async (req, res) => {
    try {
        console.log(req.body);
        const bookId = req.body.bookId;
        await Book.deleteOne({bookId: bookId})
        res.status(200).json({tt: "OK"});
      } catch (err) {
        res.status(500).json({tt: "ERR" });
      }
};

export const getPage = async (req, res) =>{
    try{
      var page = req.query.page;
      var limit = req.query.limit;
      if(page && limit){
        page = parseInt(page)
        limit = parseInt(limit)
        if(page < 1){
          page = 1;
        }
        var soluongboqua = (page-1)*limit
        const books = await Book.find().skip(soluongboqua).limit(limit);
        res.status(200).json(books);
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}

export const getLastPage = async(req, res) => {
      try{
        var limit = req.query.limit;
        if(limit){
          limit = parseInt(limit);
          const count = await Book.countDocuments();
          const page = Math.ceil(count / limit);
          res.status(200).json(page)
        }
      }catch(err){
        res.status(500).json({error: err})
      }
}
export const namePage = async (req, res) =>{
  try{
    var page = req.query.page;
    var limit = req.query.limit;
    var s = req.query.question;
    if(page && limit){
      page = parseInt(page)
      limit = parseInt(limit)
      if(page < 1){
        page = 1;
      }
      var soluongboqua = (page-1)*limit
      const books = await Book.find({ name: { $regex: new RegExp(s, "i") } }).skip(soluongboqua).limit(limit);
      res.status(200).json(books);
    }
  }catch(err){
    res.status(500).json({error: err})
  }
}

export const nameLastPage = async(req, res) => {
    try{
      var limit = req.query.limit;
      var s = req.query.question;
      if(limit){
        limit = parseInt(limit);
        const count = await Book.countDocuments({ name: { $regex: new RegExp(s, "i") } });
        const page = Math.ceil(count / limit);
        res.status(200).json(page)
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}
export const bookIdPage = async (req, res) =>{
  try{
    var page = req.query.page;
    var limit = req.query.limit;
    var s = req.query.question;
    if(page && limit){
      page = parseInt(page)
      limit = parseInt(limit)
      if(page < 1){
        page = 1;
      }
      var soluongboqua = (page-1)*limit
      const books = await Book.find({ bookId: { $regex: new RegExp(s, "i") } }).skip(soluongboqua).limit(limit);
      res.status(200).json(books);
    }
  }catch(err){
    res.status(500).json({error: err})
  }
}

export const bookIdLastPage = async(req, res) => {
    try{
      var limit = req.query.limit;
      var s = req.query.question;
      if(limit){
        limit = parseInt(limit);
        const count = await Book.countDocuments({ bookId: { $regex: new RegExp(s, "i") } });
        const page = Math.ceil(count / limit);
        res.status(200).json(page)
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}
export const authorPage = async (req, res) =>{
  try{
    var page = req.query.page;
    var limit = req.query.limit;
    var s = req.query.question;
    if(page && limit){
      page = parseInt(page)
      limit = parseInt(limit)
      if(page < 1){
        page = 1;
      }
      var soluongboqua = (page-1)*limit
      const books = await Book.find({ author: { $regex: new RegExp(s, "i") } }).skip(soluongboqua).limit(limit);
      res.status(200).json(books);
    }
  }catch(err){
    res.status(500).json({error: err})
  }
}

export const authorLastPage = async(req, res) => {
    try{
      var limit = req.query.limit;
      var s = req.query.question;
      if(limit){
        limit = parseInt(limit);
        const count = await Book.countDocuments({ author: { $regex: new RegExp(s, "i") } });
        const page = Math.ceil(count / limit);
        res.status(200).json(page)
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}
export const publishorPage = async (req, res) =>{
  try{
    var page = req.query.page;
    var limit = req.query.limit;
    var s = req.query.question;
    if(page && limit){
      page = parseInt(page)
      limit = parseInt(limit)
      if(page < 1){
        page = 1;
      }
      var soluongboqua = (page-1)*limit
      const books = await Book.find({ publishor: { $regex: new RegExp(s, "i") } }).skip(soluongboqua).limit(limit);
      res.status(200).json(books);
    }
  }catch(err){
    res.status(500).json({error: err})
  }
}

export const publishorLastPage = async(req, res) => {
    try{
      var limit = req.query.limit;
      var s = req.query.question;
      if(limit){
        limit = parseInt(limit);
        const count = await Book.countDocuments({ publishor: { $regex: new RegExp(s, "i") } });
        const page = Math.ceil(count / limit);
        res.status(200).json(page)
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}
export const categoryPage = async (req, res) =>{
  try{
    var page = req.query.page;
    var limit = req.query.limit;
    var s = req.query.question;
    if(page && limit){
      page = parseInt(page)
      limit = parseInt(limit)
      if(page < 1){
        page = 1;
      }
      var soluongboqua = (page-1)*limit
      const books = await Book.find({ category: { $regex: new RegExp(s, "i") } }).skip(soluongboqua).limit(limit);
      res.status(200).json(books);
    }
  }catch(err){
    res.status(500).json({error: err})
  }
}

export const categoryLastPage = async(req, res) => {
    try{
      var limit = req.query.limit;
      var s = req.query.question;
      if(limit){
        limit = parseInt(limit);
        const count = await Book.countDocuments({ category: { $regex: new RegExp(s, "i") } });
        const page = Math.ceil(count / limit);
        res.status(200).json(page)
      }
    }catch(err){
      res.status(500).json({error: err})
    }
}

export const userSearch = async (req, res) => {
  try {
    var page = req.query.page;
    var limit = req.query.limit;
    console.log(req.query);
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      if (page < 1) {
        page = 1;
      }
      var soluongboqua = (page - 1) * limit;

      var and = [];

      if (req.query.cau.question.author !== "") {
        and.push({ author: { $regex: req.query.cau.question.author, $options: 'i' } });
      }
      if (req.query.cau.question.name !== "") {
        and.push({ name: { $regex: req.query.cau.question.name, $options: 'i' } });
      }
      if (req.query.cau.question.publishor !== "") {
        and.push({ publishor: { $regex: req.query.cau.question.publishor, $options: 'i' } });
      }
      if (req.query.cau.categories.length > 1) {
        and.push({ category: { $in: req.query.cau.categories } });
      }

      console.log(and);
      if (and.length === 0) {
        const books = await Book.find().skip(soluongboqua).limit(limit);
        res.status(200).json(books);
      } else {
        const searchConditions = {
          $and: and,
        };
        const books = await Book.find(searchConditions).skip(soluongboqua).limit(limit);
        res.status(200).json(books);
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const userSearchLastPage = async (req, res) => {
  try {
    var limit = req.query.limit;
    console.log(req.query);
    if (limit) {
      limit = parseInt(limit);

      var and = [];

      if (req.query.cau.question.author !== "") {
        and.push({ author: { $regex: req.query.cau.question.author, $options: 'i' } });
      }
      if (req.query.cau.question.name !== "") {
        and.push({ name: { $regex: req.query.cau.question.name, $options: 'i' } });
      }
      if (req.query.cau.question.publishor !== "") {
        and.push({ publishor: { $regex: req.query.cau.question.publishor, $options: 'i' } });
      }
      if (req.query.cau.categories.length > 1) {
        and.push({ category: { $in: req.query.cau.categories } });
      }

      console.log(and);
      if (and.length === 0) {
        const totalCount = await Book.countDocuments();
        const lastPage = Math.ceil(totalCount / limit);
        
        res.status(200).json(lastPage);
      } else {
        const searchConditions = {
          $and: and,
        };

        const totalCount = await Book.countDocuments(searchConditions);
        
        const lastPage = Math.ceil(totalCount / limit);
        res.status(200).json(lastPage);
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBookInTempCart = async (req, res) => {
  try{
    console.log(req.query.cart);
    const cart = req.query.cart;
    const books = [];
    for (let i = 0; i <  cart.length; i++){
      const book = await Book.findOne({bookId: cart[i]})
      books.push(book);
    }
    res.status(200).json(books);
  }catch(err){
    res.status(500).json({ error: err });
  }
  
}

export const borrowBook = async (req, res) => {
  try{
    console.log(req.body);
    const cart = req.body;
    await Promise.all(cart.map(async (bookId) => {
      const result = await Book.findOneAndUpdate(
        { bookId },
        { $inc: { available: -1 } },
        { new: true }
      );
    }));
    // console.log(cart[0]);
    const book = await Book.findOne({bookId: cart[0]})
    res.status(200).json(book)
  }catch(error){

  }
}

export const returnBook = async (req, res) => {
  try{
    console.log(req.body);
    const cart = req.body;
    await Promise.all(cart.map(async (bookId) => {
      const result = await Book.findOneAndUpdate(
        { bookId },
        { $inc: { available: +1 } },
        { new: true }
      );
    }));
  }catch(error){

  }
}
export const totalBook=async(req,res)=>{
  Book.find().then(result=>{
    res.status(200).json({
        error: false,
        message: result.length,
    });
}).catch(err=>{
    console.log(err);
        res.status(500);
}); 
}