import { useEffect, useState } from "react";
import { cart } from "./Sach";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TraSach(props){
    let navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [items, setItems] = useState([]);
    const [borrowDate, setBorrowDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [billID, setBillID] = useState('');
    useEffect(() => {
        const getBooks = async () => {
            console.log("Trả sách");
            const res = await axios.get("http://localhost:5000/loans/getNoneLoan", {params: {userId: props.id}})
            setItems(res.data.books);
            setBorrowDate(res.data.borrowDate)
            setExpireDate(res.data.expireDate)
            setBillID(res.data.billID)
            const res1 = await axios.get("http://localhost:5000/books/getTempCart", {params: {cart: res.data.books}})
            setBooks(res1.data);
        }
        getBooks();
    }, [])
    function Book(props){
        return (
            <div>
            <div className="items">    
            <div className="product">
                <div className="row justify-content-center align-items-center" style={{width: '867px',transform: 'translateX(-25px)',height: '293.625px'}}>
                    <div className="col-md-3" style={{width: '255.75px',transform: 'translateX(-50px)'}}>
                        <div className="product-image"><img className="img-fluid d-block mx-auto image" src={props.image} alt="xyz"/></div>
                    </div>
                    <div className="col-md-5 col-xxl-3 product-info" style={{transform: 'scale(1.39)',width: '254.75px'}}><a className="product-name">{props.name}</a>
                        <div className="product-specs">
                            <div><span>Tác giả:&nbsp;</span><span className="value">{props.author}</span></div>
                            <div><span>Thể loại:&nbsp;</span><span className="value">{props.category}</span></div>
                            <div><span>Nhà xuất bản:</span><span className="value" style={{transform: 'translate(60px)'}}>&nbsp;{props.publishor}</span></div>
                        </div>
                    </div>
                    <div className="col-6 col-md-2 price">
                        <div><span style={{color: 'rgb(0,128,255)',fontSize: '16px',transform: 'translateX(393px)'}}>Số lượng</span></div>
                        <div><input type="number" style={{width: '46px',transform: 'translateX(-10px)'}} value="1"/></div>
                    </div>
                </div>
            </div>
            </div><button className="btn btn-outline-success" type="button" style={{transform: 'translateX(811px) translateY(-363px) scale(0.70)',background: 'rgb(237,203,203)',borderColor: 'rgb(0,0,0)',width: 41}}><i className="fa fa-close border-primary" style={{color: 'rgb(0,0,0)',transform: 'translateX(0px) scale(1.49)'}}></i></button></div>
        )
    }
    async function handleReturnBook(){
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var formattedDate = year + '-' + month + '-' + day;
        console.log("Trả sách");
        const res1 = await axios.post("http://localhost:5000/loans/returnBill", {billID: billID, returnDate: formattedDate});
        const res2 = await axios.post("http://localhost:5000/books/returnBook", items);
        console.log(res1.data);
        alert("Trả sách thành công")
        navigate("/book")
    }
    return(
        <main className="page shopping-cart-page">
            {books.length > 0 &&
                <section className="clean-block clean-cart dark" style={{transform: 'translateY(-100px)'}}>
                    <div className="container" style={{width: 1333}}>
                        <div className="block-heading">
                            <h2 className="text-info">GIỎ HÀNG</h2>
                            <p>Danh sách các đơn hàng mượn sách</p>
                        </div>
                        <div className="content">
                            <div className="row g-0">
                                <div className="col-md-12 col-lg-8" style={{height: 415.188}}>
                                    <Book bookId={books[0].bookId} name={books[0].name} author={books[0].author} category={books[0].category} publishor={books[0].publishor} image={books[0].image}/>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="bg-body-tertiary summary">
                                        <h3>hóa đơn</h3>
                                        <h4 className="border-primary-subtle" style={{borderColor: 'var(--bs-primary-border-subtle)'}}><span className="text">Số lượng tổng</span><span className="price">{books.length}</span></h4>
                                        <h4><span className="text">Mã đơn</span><span className="price">{billID}</span></h4>
                                        <h4><label className="form-label" style={{width: '247.0938px',fontSize: '16px',fontWeight: 'bold'}}>Ngày mượn:</label><input type="date" style={{fontSize: 15}} value={borrowDate} readOnly/></h4>
                                        <h4><label className="form-label" style={{width: '247.0938px',fontSize: '16px',fontWeight: 'bold'}}>Ngày hết hạn</label><input type="date" style={{fontSize: 15}} value={expireDate} readOnly/></h4>
                                        <div style={{height: 18}}></div><button className="btn btn-primary btn-lg d-block w-100" type="button" onClick={handleReturnBook}>Xác nhận trả sách</button>
                                    </div>
                                </div>
                            </div>
                            {books.filter((book, index) => {
                                return index !== 0;
                            }).map((book) => {
                                return (
                                    <div className="row g-0">
                                        <div className="col-md-12 col-lg-8" style={{height: 415.188}}>
                                            <Book bookId={book.bookId} name={book.name} author={book.author} category={book.category} publishor={book.publishor} image={book.image}/>
                                        </div>
                                        <div className="col-md-12 col-lg-4">
                                            <div className="bg-body-tertiary summary">
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            }
            </main>
    )
}
export default TraSach;