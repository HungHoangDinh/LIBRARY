import { Link } from "react-router-dom";
function Footer(){
    return  <footer className="page-footer dark">
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
                <h5>Get started</h5>
                <ul>
                    <li><Link to="/homepage">Trang chủ</Link></li>
                    <li><Link to="/book">Sách</Link></li>
                
                </ul>
            </div>
             <div className="col-sm-3">
                <h5>About us</h5>
                <ul>
                    <li><a>Name: Hoàng Đình Hùng</a></li>
                    <li><a>Email: Hung.HD210399@sis.hust.edu.vn</a></li>
                    <li><a>Phone: 0375838482</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-copyright">
        <p>© 2024 Copyright Text</p>
    </div>
</footer> 
}
export default Footer;