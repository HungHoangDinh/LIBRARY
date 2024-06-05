
import { useState } from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import React from "react";
import AddBook from "./Book/AddBook";
import EditBook from "./Book/EditBook";
import LoanDetail from "./Book/LoanDetail";
import ManageLoan from "./Book/ManageLoan";
import {BrowserRouter, Route,Navigate , Routes} from 'react-router-dom'
import ManageBook from "./Book/ManageBook";
function App() {
	const [admin, setAdmin] = useState("");
    function changeAdmin(adminId){
       setAdmin(adminId);
	};
	return (
		<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login admin={admin} state={changeAdmin} />} />
        <Route path='/login' element={<Login admin={admin} state={changeAdmin}></Login>}> </Route>
        <Route path='/homepage' element={(admin!=="")?<HomePage admin={admin} state={changeAdmin}></HomePage>:<Navigate to='/login'></Navigate>}></Route>
        <Route path='/addbook' element={(admin!=="")?<AddBook admin={admin} state={changeAdmin}></AddBook>:<Navigate to='/login'></Navigate>}></Route>
        <Route path='/managebook/:bookId' element={(admin!=="")?<EditBook admin={admin} state={changeAdmin}></EditBook>:<Navigate to='/login'></Navigate>}></Route>
        <Route path="/managebook" element={(admin!=="")?<ManageBook admin={admin} state={changeAdmin}></ManageBook>:<Navigate to ='/login'></Navigate>}></Route>
        <Route path='/manageloan/:billID' element={(admin!=="")?<LoanDetail admin={admin} state={changeAdmin}></LoanDetail>:<Navigate to='/login'></Navigate>}></Route>
        <Route path='/manageloan' element={(admin!=="")?<ManageLoan admin={admin} state={changeAdmin}></ManageLoan>:<Navigate to='/login'></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
	);
}

export default App;