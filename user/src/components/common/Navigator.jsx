import avatar from "../../img/koduck.png"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'
function Navigator(pros){
    const URL="http://localhost:5000/";

    
    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-body clean-navbar navbar-light">
        <div className="container"><Link className="navbar-brand logo" to="/homepage"><strong>THƯ VIỆN SÁCH</strong></Link><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <div></div><Link className="nav-link active" to="/homepage">Home</Link>
                    </li>
                    <li className="nav-item"><Link className="nav-link" to="/book">SÁCH</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/cart">GIỎ HÀNG&nbsp;<i className="fa fa-shopping-cart text-primary"></i></Link></li>
                   
                    <li className="nav-item dropdown no-arrow mx-1">
                        <div className="nav-item dropdown">
                        <a className="dropdown-toggle dropdowninfor" aria-expanded="false" data-bs-toggle="dropdown" href="#">{pros.user.name}&nbsp;
                        <img src={pros.user.avatar||avatar} /></a>
                            <div className="dropdown-menu menusize">
                            <a className="dropdown-item fontItemUsser"  href="/login"><i className="fa fa-sign-out"></i>&nbsp;Đăng xuất</a>
                            
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
export default Navigator;