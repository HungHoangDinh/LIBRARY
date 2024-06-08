import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import Navigator from "../Hung/Navigator";
import SearchBoard from "../Hung/SearchBoard";
import Footer from "../Hung/Footer";
function LoanDetail(){
    var i = 1;
    let location=useLocation();
    let navigate = useNavigate();
    function handleBack(){
        navigate("/manageLoan");
    }
    function BookDetail(props){
        return (
            <tr>
                <td>{props.stt}</td>
                <td>{props.bookId}</td>
                <td>{props.name}</td>
                <td>{props.publishor}</td>
                <td>{props.author}</td>
                <td>{props.category}</td>
            </tr>
        )
    }
    const [k1,setK]=useState("");
    const { billID } = useParams();
    const [bill, setBill] = useState({})
    const [books, setBook] = useState([])
    function handleChange(event){
        setBill(preBill => {
            return {
                ...preBill,
                [event.target.name]: event.target.value,
                
            }
        })
    }
    function handleUpdate(event){
        event.preventDefault();
        const a=prompt("Press 'y' to confirm the update");
   
   
        if(a==='y'){
            const updateBill = async () => {
                try{
                    if(k1==="None" &&bill.state=="Returned"){
                        let now = new Date();

                        // Lấy ngày, tháng, năm
                        let day = now.getDate();
                        let month = now.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
                        let year = now.getFullYear()
                        let dateString = year + '-' + month + '-' + day;
                        bill.returnDate=dateString;
                    }
                    const res = await axios.post("http://localhost:5000/loans/update", bill);
                    console.log(res.data);
                    alert("Cập nhật thành công");
                }catch(error){
                    alert("Lỗi cập nhật")
                }
                
            }
            updateBill();
            navigate("/manageLoan");
        }else{
            
            navigate(location.pathname);
        }
        
    }
    useEffect (() => {
        const getBill = async () => {
            try{
                const res = await axios.get("http://localhost:5000/loans/unique", {params:{billID: billID}});
                setBill(res.data.bill);
                setK(res.data.bill.returnDate);
                
                setBook(res.data.books);
                
            }catch(error){
                console.log(error.message);
            }
        }
        getBill();
    },[])
    return (
        <div id="wrapper">
        <Navigator></Navigator>
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <SearchBoard></SearchBoard>
                {Object.keys(bill).length > 0 && books.length > 0 &&
                <div className="container-fluid">
                    <h3 className="text-dark mb-4">Bill Detail</h3>
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Bill Detail</p>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="username"><strong>BILL ID</strong></label><input className="form-control" type="text" value={bill.billID}/></div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="username"><strong>USER EMAIL</strong></label><input className="form-control" type="text" id="bookID" name="userId" value={bill.username}/></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="first_name"><strong>Status</strong></label>
                                        <select value={bill.state} onChange={handleChange} name="state" className="form-select">
                                                <option value="Returned">Returned</option>
                                                <option value="Borrowed">Borrowed</option>
                                                <option value="Overdue">Overdue</option>
                                                <option value="Waiting">Waiting</option>
                                            </select></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="first_name"><strong><span style={{color: 'rgb(0, 0, 0)'}}>Borrow Date</span></strong></label><input className="form-control" type="date" value={bill.borrowDate}/></div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="first_name"><strong><span style={{color: 'rgb(0, 0, 0)'}}>Expire date</span></strong></label><input className="form-control" type="date" value={bill.expireDate}/></div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" for="first_name"><strong><span style={{color: 'rgb(0, 0, 0)'}}>Return Date</span></strong></label><input className="form-control" type="date" value={bill.returnDate}/></div>
                                    </div>
                                </div>
                                <div className="mb-3"><button className="btn btn-success btn-sm" type="submit" onClick={handleUpdate} style={{marginTop: 17}}>Update</button><button className="btn btn-secondary btn-sm" type="submit" style={{marginTop: 17, marginLeft: 5}} onClick={handleBack}>Back</button></div>
                            </form>
                        </div>
                    </div>
                    <div className="card shadow">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Book loan</p>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive text-nowrap table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                <table className="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Book ID</th>
                                            <th>Book name</th>
                                            <th>Publisher</th>
                                            <th>Author</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map(book => {
                                            return <BookDetail key={book.bookId} stt={i++} bookId={book.bookId} name={book.name} publishor={book.publishor} author={book.author} category={book.category}/>
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
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }</div>
            <Footer></Footer>
        </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
    </div>
    )
}

export default LoanDetail;