import React, {useState, useEffect} from "react";
import BookDetail from "./BookDetail";
import Navigator from "../Hung/Navigator";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBoard from "../Hung/SearchBoard";
function ManageBook(){
    var i = 1;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [question, setQuestion] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
     const getBooks = async () => {
        try{
            if (search === "name"){
                console.log("name");
                const res = await axios.get("http://localhost:5000/books/name", {params: {page: page, limit: limit, question: question}});
                setBooks(res.data);
                console.log(page);
            }
            else if(search === "bookId"){
                console.log("bookId");
                const res = await axios.get("http://localhost:5000/books/bookId", {params: {page: page, limit: limit, question: question}});
                setBooks(res.data);
                console.log(page);
            }
            else if(search === "author"){
                console.log("author");
                const res = await axios.get("http://localhost:5000/books/author", {params: {page: page, limit: limit, question: question}})
                setBooks(res.data);
                console.log(page);
            }
            else if(search === "publishor"){
                console.log("publishor");
                const res = await axios.get("http://localhost:5000/books/publishor", {params: {page: page, limit: limit, question: question}});
                setBooks(res.data);
                console.log(page);
            }
            else if(search === "category"){
                console.log("category");
                const res = await axios.get("http://localhost:5000/books/category", {params: {page: page, limit: limit, question: question}});
                setBooks(res.data);
                console.log(page);
            }else{
                console.log("abc");
                const res = await axios.get("http://localhost:5000/books/page", {params: {page: page, limit: limit}});
                setBooks(res.data);
                console.log(page);
            }
        }catch(error){
            console.log(error.message);
        }
    }
    useEffect(() => {
    
        getBooks();
    }, [page])
    function handleFirstPage(){
        const getBooks = async () => {
            try{
                setPage(1)
                console.log(page);
            }catch(error){
                console.log(error.message);
            }
        }
        getBooks();
    }
    function handleNextPage(){
        const getBooks = async () => {
            try{
                setPage((prePage) => prePage + 1)
            }catch(error){
                console.log(error.message);
            }
        }
        getBooks();
    }
    function handlePreviousPage(){
        const getBooks = async () => {
            try{
                setPage((prePage) => prePage - 1)
            }catch(error){
                console.log(error.message);
            }
        }
        getBooks();
    }
    function handleLastPage(){
        const getBooks = async () => {
            try{
                if (search === "name"){
                    const res = await axios.get("http://localhost:5000/books/nameLastPage", {params: {limit: limit, question: question}});
                    setPage(res.data)
                    console.log(page);
                }
                else if(search === "bookId"){
                    const res = await axios.get("http://localhost:5000/books/bookIdLastPage", {params: {limit: limit, question: question}});
                    setPage(res.data)
                    console.log(page);
                }
                else if(search === "author"){
                    const res = await axios.get("http://localhost:5000/books/authorLastPage", {params: {limit: limit, question: question}});
                    setPage(res.data)
                    console.log(page);
                }
                else if(search === "publishor"){
                    const res = await axios.get("http://localhost:5000/books/publishorLastPage", {params: {limit: limit, question: question}});
                    setPage(res.data)
                    console.log(page);
                }
                else if(search === "category"){
                    const res = await axios.get("http://localhost:5000/books/categoryLastPage", {params: {limit: limit, question: question}});
                    setPage(res.data)
                    console.log(page);
                }else{
                    const res = await axios.get("http://localhost:5000/books/lastpage", {params: {limit: limit}});
                    setPage(res.data)
                    console.log(page);
                }
            }catch(error){
                console.log(error.message);
            }
        }
        getBooks();
    }
    function handleChangeLimit(event){
        const getBooks = async () => {
            try{
                if (search === "name"){
                    const res = await axios.get("http://localhost:5000/books/name", {params: {page: 1, limit: event.target.value, question: question}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }
                else if(search === "bookId"){
                    const res = await axios.get("http://localhost:5000/books/bookId", {params: {page: 1, limit: event.target.value, question: question}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }
                else if(search === "author"){
                    const res = await axios.get("http://localhost:5000/books/author", {params: {page: 1, limit: event.target.value, question: question}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }
                else if(search === "publishor"){
                    const res = await axios.get("http://localhost:5000/books/publishor", {params: {page: 1, limit: event.target.value, question: question}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }
                else if(search === "category"){
                    const res = await axios.get("http://localhost:5000/books/category", {params: {page: 1, limit: event.target.value, question: question}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }else{
                    const res = await axios.get("http://localhost:5000/books/page", {params: {page: 1, limit: event.target.value}});
                    setPage(1)
                    setBooks(res.data);
                    console.log(page);
                }
            }catch(error){
                console.log(error.message);
            }
        }
        setLimit(event.target.value); 
        getBooks();       
    }
    function handleChangeSearch(event){
        setSearch(event.target.value)       
    }
    function handleChangeQuestion(event){
        setQuestion(event.target.value)
        setPage(1);
        if(search === "name"){
            const getBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:5000/books/name", {params: {page: 1, limit: limit, question: event.target.value}});
                    setBooks(res.data);
                    console.log(page);
                }catch(error){
                    console.log(error.message);
                }
            }
            getBooks();
        }
        else if(search === "bookId"){
            const getBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:5000/books/bookId", {params: {page: 1, limit: limit, question: event.target.value}});
                    setBooks(res.data);
                    console.log(page);
                }catch(error){
                    console.log(error.message);
                }
            }
            getBooks();
        }
        else if(search === "author"){
            const getBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:5000/books/author", {params: {page: 1, limit: limit, question: event.target.value}});
                    setBooks(res.data);
                    console.log(page);
                }catch(error){
                    console.log(error.message);
                }
            }
            getBooks();
        }
        else if(search === "publishor"){
            const getBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:5000/books/publishor", {params: {page: 1, limit: limit, question: event.target.value}});
                    setBooks(res.data);
                    console.log(page);
                }catch(error){
                    console.log(error.message);
                }
            }
            getBooks();
        }
        else if(search === "category"){
            const getBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:5000/books/category", {params: {page: 1, limit: limit, question: event.target.value}});
                    setBooks(res.data);
                    console.log(page);
                }catch(error){
                    console.log(error.message);
                }
            }
            getBooks();
        }
    }
    return (
        <div id="wrapper">
        <Navigator></Navigator>
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <SearchBoard></SearchBoard>
                <div className="container-fluid">
                    <h3 className="text-dark mb-4"><strong>Manage Book</strong></h3>
                    <div className="card shadow">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">All books</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 text-nowrap">
                                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;
                                    <select value={limit} onChange={handleChangeLimit} className="d-inline-block form-select form-select-sm">
                                                <option value="3">3</option>
                                                <option value="5">5</option>
                                                <option value="7">7</option>
                                                <option value="10">10</option>
                                            </select>&nbsp;</label></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label" style={{marginRight: 12}}>Filter by</label>
                                    <select value={search} onChange={handleChangeSearch} style={{marginRight: 23}}>
                                            <optgroup label="Filter">
                                                <option value="name">Book name</option>
                                                <option value="bookId">Book ID</option>
                                                <option value="publishor">Publisher</option>
                                                <option value="author">Author</option>
                                                <option value="category">Category</option>
                                                <option value="" selected="">None</option>
                                            </optgroup>
                                        </select><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" value={question} onChange={handleChangeQuestion}/></label></div>
                                </div>
                            </div>
                            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                <table className="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Book ID</th>
                                            <th>Book name</th>
                                            <th>Publisher</th>
                                            <th>Author</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Available</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.length > 0 && books.map(book => {
                                            return <BookDetail stt={i++} bookId={book.bookId} key1={book._id} name={book.name} author={book.author} publishor={book.publishor} category={book.category} amount={book.amount} available={book.available}  />
                                        })} 
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><strong>#</strong></td>
                                            <td><strong>Book ID</strong></td>
                                            <td><strong>Book name</strong></td>
                                            <td><strong>Publisher</strong></td>
                                            <td><strong>Author</strong></td>
                                            <td><strong>Category</strong></td>
                                            <td><strong>Amount</strong></td>
                                            <td><strong>Available</strong></td>
                                            <td><strong>Action</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-6 align-self-center">
                                </div>
                                <div className="col-md-6">
                                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                        <ul className="pagination">
                                            <li className="page-item"><button className="page-link" aria-label="Previous" onClick={handlePreviousPage}><span aria-hidden="true">«</span></button></li>
                                            <li className="page-item active"><button className="page-link" onClick={handleFirstPage}>1</button></li>
                                            <li className="page-item"><button className="page-link">...</button></li>
                                            <li className="page-item"><button className="page-link" onClick={handleLastPage}>End</button></li>
                                            <li className="page-item"><button className="page-link" aria-label="Next" onClick={handleNextPage}><span aria-hidden="true">»</span></button></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2024</span></div>
                </div>
            </footer>
        </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
    </div>
    );
}
export default ManageBook;