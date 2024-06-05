import { useNavigate } from "react-router-dom";
function LoanRow(props){
    let navigate = useNavigate();
    function handleView(){
        navigate(`/manageloan/${props.billID}`)
    }
    return (
        <tr>
            <td>{props.stt}</td>
            <td>{props.billID}</td>
            <td>{props.userId}</td>
            <td>{props.borrowDate}</td>
            <td>{props.returnDate}</td>
            <td>{props.state}</td>
            <td><button className="btn btn-primary btn-sm border rounded-pill" type="button" onClick={handleView}>View</button></td>
        </tr>
    )
}
export default LoanRow;