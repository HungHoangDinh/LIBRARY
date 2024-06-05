
import React from "react";
import { useState ,useEffect} from "react";
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import avatar from "../img/koduck.png"
const URL="http://localhost:5000/";
function Login(pros){
     
    let navigate=useNavigate();
    const [user, stateUser]=useState({
       email:"",
       password:""
    });
    function update(e){
       stateUser(previousState=>{
        return {...previousState, [e.target.name]:e.target.value}
       });
    };
    async function  onLogin(e){
        e.preventDefault();
        try {
            const res= await axios.post(URL+"logins/login",{params: {
                email:user.email,
                password:user.password
            }});
            if(res.data.state==="ok"){
                pros.state(res.data.user);
            }
            else{
                alert("Mật khẩu không chính xác hoặc tài khoản chưa đăng kí");
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      if(pros.user!==null){
        console.log(pros.user);
        navigate("/homepage")
      }
    },[pros.user]);
    return (
        <div className="page login-page">
        <section className="clean-block clean-form dark">
            <div className="container containerlogin">
                <div className="block-heading">
                    <h2 className="text-info">Đăng nhập</h2>
                    <p></p>
                </div>
                <form className="form1" onSubmit={onLogin}>
                    <div className="mb-3">
                        <p>Email</p><input className="form-control item" type="email" id="email" data-bs-theme="light" name="email" value={user.email} onChange={update} />
                    </div>
                    <div className="mb-3">
                        <p>Password</p><input className="form-control" type="password" id="password" data-bs-theme="light" name="password" value={user.password} onChange={update} />
                    </div>
                    <div><a className="btn btn-primary" role="button" onClick={onLogin}><strong>Đăng nhập</strong></a><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
                    <div></div><span>&nbsp; &nbsp;&nbsp;</span>
                  
                </form>
                
            </div>
        </section>
        </div>
    );
}
export default Login;