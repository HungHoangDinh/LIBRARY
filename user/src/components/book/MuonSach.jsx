import { useEffect, useState } from "react";
import { cart } from "./Sach";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MuonSach(props){
    let navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [items, setItems] = useState(cart);
    useEffect(() => {
        const getBooks = async () => {
            console.log(cart)
            const res = await axios.get("http://localhost:5000/books/getTempCart", {params: {cart: cart}})
            setBooks(res.data);
        }
        if(cart.length > 0){
            getBooks();
        }else{
            alert("Không còn sách nào cần mượn")
            navigate("/book")
        }
    }, [items])
    const [borrowDate, setBorrowDate] = useState(getBorrowDate());
    const [expireDate, setExpireDate] = useState(getExpireDate());
    function getBorrowDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      function getExpireDate() {
        const today = new Date();
        const date = new Date(today);
        date.setMonth(today.getMonth() + 6)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      function handleChangeDate(event){
        setExpireDate(event.target.value);
        console.log(event.target.value);
      }
      async function handleBorrow(e){
        e.preventDefault();
        var a=prompt("Press 'y' to borrow books");
        if(a==="y"){
            const res = await axios.get("http://localhost:5000/loans/getThisBill", {params: {userId: props.id}});

            if(res.data.tt === 'YES' || res.data.numOfBill === 0){
               var borrowedBook = [];
               for(let i = 0; i < cart.length; i++){
                    borrowedBook.push({bookId: cart[i]})
               } 
               var id = res.data.numOfBill + 1
               var billID = props.id + id;
               const bill = {
                    billID: billID,
                    userId: props.id,
                    username:props.email,
                    borrowDate: borrowDate,
                    returnDate: 'None',
                    expireDate: expireDate,
                    state: 'Borrowed',
                    borrowedBook: borrowedBook
                }
            
                const res2 = await axios.post("http://localhost:5000/books/borrowBook", cart);
               
             
                cart.splice(0, cart.length);
                
                const res1 = await axios.post("http://localhost:5000/loans/", bill);
                alert("Mượn thành công")
                navigate("/homepage")
            }
            else{
                alert("Tồn tại đơn chưa trả")
                navigate("/homepage")
            }
        }
      }
      function Book(props){
        function handleDelete(){
            const newItems = [...items];
            for(let i = 0; i < cart.length; i++){
                if(cart[i] === props.id){
                    cart.splice(i, 1);
                    newItems.splice(i,1)
                    setItems(newItems)
                    break
                }
            }
        }
        return (
            <div>
            <div className="items">    
            <div className="product">
                <div className="row justify-content-center align-items-center" style={{width: '867px',transform: 'translateX(-25px)',height: '293.625px'}}>
                    <div className="col-md-3" style={{width: '255.75px',transform: 'translateX(-50px)'}}>
                        <div className="product-image"><img className="img-fluid d-block mx-auto image" src={props.image} alt="xyz"/></div>
                    </div>
                    <div className="col-md-5 col-xxl-3 product-info" style={{transform: 'scale(1.39)',width: '254.75px'}}><a className="product-name" >{props.name}</a>
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
            </div><button className="btn btn-outline-success" type="button" style={{transform: 'translateX(811px) translateY(-363px) scale(0.70)',background: 'rgb(237,203,203)',borderColor: 'rgb(0,0,0)',width: 41}} onClick={handleDelete}><i className="fa fa-close border-primary" style={{color: 'rgb(0,0,0)',transform: 'translateX(0px) scale(1.49)'}} onClick={handleDelete}></i></button></div>
        )
    }
    return (
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
                                        <h4><span className="text">Mã đơn</span><span className="price">--</span></h4>
                                        <h4><label className="form-label" style={{width: '247.0938px',fontSize: '16px',fontWeight: 'bold'}}>Ngày mượn:</label><input type="date" style={{fontSize: 15}} value={borrowDate} readOnly/></h4>
                                        <h4><label className="form-label" style={{width: '247.0938px',fontSize: '16px',fontWeight: 'bold'}}>Ngày hết hạn</label><input type="date" style={{fontSize: 15}} value={expireDate} onChange={handleChangeDate}/></h4>
                                        <div style={{height: 18}}></div><button className="btn btn-primary btn-lg d-block w-100" type="button" onClick={handleBorrow}>Xác nhận giao dịch</button>
                                    </div>
                                </div>
                            </div>
                            {books.filter((book, index) => {
                                return index !== 0;
                            }).map((book) => {
                                return (
                                    <div className="row g-0">
                                        <div className="col-md-12 col-lg-8" style={{height: 415.188}}>
                                            <Book id={book._id} name={book.name} author={book.author} category={book.category} publishor={book.publishor} image={book.image}/>
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
export default MuonSach;