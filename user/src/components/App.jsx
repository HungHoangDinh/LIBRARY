import Login from './Login'
import HomePage from './HomePage'
import { useState } from "react";
import React from 'react';
import { useEffect } from 'react'
import axios from "axios";

import {BrowserRouter, Route,Navigate , Routes} from 'react-router-dom'

import GioHang from  './book/GioHang'
import Sach from './book/Sach'
import XemChiTiet from './book/XemChiTiet'

const URL="http://localhost:5000/";
function App() {
  const [user, setUser] = useState(null);
	const getUser = async () => {
		try {
			const url = URL+`auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      console.log(user);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
    getUser();
	}, []);
  
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login user={user} state={setUser}></Login>}></Route>
        <Route path="/login" element={<Login user={user} state={setUser}></Login>}></Route>
        <Route path="/homepage" element={user?<HomePage user={user}></HomePage>:<Navigate to="/login"></Navigate>}></Route>
        <Route path='/cart' element={(user)?<GioHang user={user} ></GioHang>:<Navigate to='/login'></Navigate>}></Route>
        <Route path='/book' element={(user)?<Sach user={user} mainpage={true}></Sach>:<Navigate to='/login'></Navigate>}></Route>
        <Route path='/book-detail/:bookId' element={(user)?<XemChiTiet user={user} ></XemChiTiet>:<Navigate to='/login'></Navigate>}></Route>
        
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
