import avatar from "../img/koduck.png"
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navigator from "./common/Navigator";
import Sach from "./book/Sach";
import Footer from "./common/Footer";
function HomePage(pros){
  const navigate=useNavigate();
  function functionClick(){
    navigate("/book");
  }
      return (
<div>
  <Navigator user={pros.user}></Navigator>
  <main className="page landing-page">
  <section
  className="clean-block clean-hero"
  style={{
    backgroundImage: `${avatar}`,
    color: "rgba(9, 162, 255, 0.85)"
  }}
>
  <div className="text">
    <h2>THƯ VIỆN SÁCH ĐẠI HỌC BÁCH KHOA HÀ NỘI</h2>
    <p>
      Nơi cung cấp tài liệu học thuật, truyện tranh, tiểu thuyết và các loại
      sách khác...
    </p>
    <button className="btn btn-outline-light btn-lg" type="button" onClick={functionClick}>
      TÌM HIỂU THÊM
    </button>
  </div>
</section>
  </main>
  <Sach user={pros.user} mainpage={false}></Sach>
  <Footer ></Footer>
</div>

);
}
export default HomePage;