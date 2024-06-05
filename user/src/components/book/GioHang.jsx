import { useEffect, useState } from "react";
import axios from "axios";
import Navigator from "../common/Navigator";
import MuonSach from "./MuonSach";
import TraSach from "./TraSach";
import Footer from "../common/Footer";
function GioHang(props){
    const [tt, setTT] = useState('');
    const [numOfBill, setNum] = useState([])
    useEffect(() => {
        const getBorrow = async () => {
            const res = await axios.get("http://localhost:5000/loans/getThisBill", {params: {userId: props.user.id}});
            setTT(res.data.tt);
            setNum(res.data.numOfBill);
        }
        getBorrow();
    }, [])
    return (
      <div>
          <div>
            <Navigator user={props.user}/>
            {(tt === 'YES' || numOfBill === 0) ? <MuonSach id={props.user.id} /> : <TraSach id={props.user.id}/>}
                   
        </div>
        <Footer></Footer> 
      </div>

    )
}
export default GioHang;