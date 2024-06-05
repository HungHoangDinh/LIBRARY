import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BookDetail(props){
    let navigate = useNavigate();
    function handleDelete(){
        const deleteBook = async () => {
            try{
                const res = await axios.post("http://localhost:5000/books/delete", {bookId: props.bookId});
                console.log(res.data);
                alert("Xóa thành công")
            }catch(error){
                console.log(error.message);
                alert("Xóa thất bại")
            }
        }
        deleteBook();
        navigate("/homepage");
    }
    function handleEdit(){
        navigate(`/managebook/${props.bookId}`)
    }
    return (
        <tr>
            <td>{props.stt}</td>
            <td>{props.bookId}</td>
            <td>{props.name}</td>
            <td>{props.publishor}</td>
            <td>{props.author}</td>
            <td>{props.category}</td>
            <td>{props.amount}</td>
            <td>{props.available}</td>
            <td><button className="btn btn-primary btn-sm border rounded-pill" type="button" onClick={handleEdit}>Edit</button><button className="btn btn-danger btn-sm border rounded-pill" type="button" onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}

export default BookDetail;