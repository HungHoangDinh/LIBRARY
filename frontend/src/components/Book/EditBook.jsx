import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigator from "../Hung/Navigator";
import SearchBoard from "../Hung/SearchBoard";
function EditBook(){
    let navigate = useNavigate();
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    var k="";
    useEffect(() => {
        const getBook = async () => {
            try{
                const res = await axios.get("http://localhost:5000/books/uniquebook", {params:{id: bookId}});
                setBook(res.data);
                console.log(res.data);
                k=res.data.amount-res.data.available;
            }catch(error){
                console.log(error.message);
            }
        }
        getBook();
    }, [])

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
    // Mở cửa sổ chọn file khi nút được nhấn
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setBook(prebook=>{
                return {
                    ...prebook,
                    image: reader.result
                }
            })

        }
        event.target.value = null;
    };
    
    function handleChange(event){
        setBook(prebook => {
            if(event.target.name=="amount"){
                return {
                    ...prebook,
                    [event.target.name]:event.target.value,
                    available: event.target.value-k
                }
            }
            else{
                return {
                    ...prebook,
                    [event.target.name]:event.target.value
                }
            }
        })
    }
    function handleBack(){
        navigate("/managebook");
    }
    function handleSubmit(event){
        event.preventDefault();
        var a=prompt("Press 'y' to submit")
        if(a==='y'){
            const updateBook = async () => {
                try{
                    const res = await axios.post("http://localhost:5000/books/update", book);
                    console.log(res.data);
                    alert("Cập nhật thành công");
                }catch(error){
                    alert("Lỗi cập nhật")
                }
                
            }
            updateBook();
            navigate("/managebook");
        }
    }
    return (
        <div id="wrapper">
        <Navigator></Navigator>
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <SearchBoard></SearchBoard>
                {Object.keys(book).length > 0 &&
                <div className="container-fluid">
                    <h3 className="text-dark mb-4"><strong>EDIT BOOK</strong></h3>
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <div className="card mb-3">
                                <div className="card-body text-center shadow"><img className="img-thumbnail mb-3 mt-4" src={book.image} width="160" height="160" alt="xyz"/>
                                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleButtonClick}>Change Photo</button>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row mb-3 d-none">
                                <div className="col">
                                    <div className="card text-white bg-primary shadow">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Peformance</p>
                                                    <p className="m-0"><strong>65.2%</strong></p>
                                                </div>
                                                <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                            </div>
                                            <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card text-white bg-success shadow">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Peformance</p>
                                                    <p className="m-0"><strong>65.2%</strong></p>
                                                </div>
                                                <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                            </div>
                                            <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="card shadow mb-3">
                                        <div className="card-header py-3">
                                            <p className="text-primary m-0 fw-bold">Fill the form</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="username"><strong>Book Title</strong></label><input className="form-control" type="text" id="book-title" name="name" value={book.name} onChange={handleChange}/></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="username"><strong>Book Tag</strong></label><input className="form-control" type="text" id="bookID" name="bookId" value={book.bookId} readOnly/></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="first_name"><strong>Author</strong></label><input className="form-control" type="text" id="author" name="author" value={book.author} onChange={handleChange}/></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="last_name"><strong>Publisher</strong></label><input className="form-control" type="text" id="publisher" name="publishor" value={book.publishor} onChange={handleChange}/></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="first_name"><strong>Category</strong></label>
                                                        <select className="form-select" id="category" value={book.category} name="category" onChange={handleChange}>
                                                                <optgroup label="This is a group">
                                                                    <option value="Tiểu thuyết" selected="">Tiểu thuyết</option>
                                                                    <option value="Truyện tranh">Truyện tranh</option>
                                                                    <option value="Sách tham khảo">Sách tham khảo</option>
                                                                </optgroup>
                                                            </select></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="first_name"><strong>Amount</strong></label><input className="form-control" type="text" id="amount" name="amount" value={book.amount} onChange={handleChange}/></div>
                                                    </div>
                                                  
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label id="available-1" className="form-label" for="last_name"><strong>Description</strong></label></div><textarea className="form-control" rows="6" name="description" value={book.description} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="mb-3"><button className="btn btn-success btn-sm" type="submit" style={{marginTop: 17}}>Update</button><button className="btn btn-secondary btn-sm" onClick={handleBack} style={{marginTop: 17, marginLeft: 5}}>Back</button></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }</div>
            <footer classNameName="bg-white sticky-footer">
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2024</span></div>
                </div>
            </footer>
        </div><a className="border rounded d-inline scroll-to-top" href="http://localhost:3000/"><i className="fas fa-angle-up"></i></a>
    </div>
    );
}

export default EditBook;