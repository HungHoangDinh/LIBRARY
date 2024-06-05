import {React, useState ,useEffect} from 'react'
import axios from 'axios'
function Data(){
    const URL="http://localhost:5000/"
    const [totalBook,setTotalBook]=useState(0);
    useEffect(()=>{
      const getTotalBook=async()=>{
        try{
            const res =await axios.get(`${URL}books/totalbook`);
            setTotalBook(res.data.message);
        }catch(error){
            console.log(error.message);
        }
      };
      getTotalBook();
    },[]);
    const [totalUser,setTotalUser]=useState(0);
    useEffect(()=>{
      const getTotalUser=async()=>{
        try{
            const res =await axios.get(`${URL}manageusers/totaluser`);
            setTotalUser(res.data.message);
            console.log(res.data);
        }catch(error){
            console.log(error.message);
        }
      };
      getTotalUser();
    },[]);
    return (
        <div className="row">
  <div className="col-md-6 col-xl-3 mb-4">
    <div className="card shadow border-start-primary py-2">
      <div className="card-body">
        <div className="row align-items-center no-gutters">
          <div className="col me-2">
            <div className="text-uppercase text-primary fw-bold text-xs mb-1">
              <span>Total books</span>
            </div>
            <div className="text-dark fw-bold h5 mb-0">
              <span>{totalBook}</span>
            </div>
          </div>
          <div className="col-auto">
            <i className="fas fa-calendar fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-6 col-xl-3 mb-4">
    <div className="card shadow border-start-success py-2">
      <div className="card-body">
        <div className="row align-items-center no-gutters">
          <div className="col me-2">
            <div className="text-uppercase text-success fw-bold text-xs mb-1">
              <span>total users</span>
            </div>
            <div className="text-dark fw-bold h5 mb-0">
              <span>{totalUser}</span>
            </div>
          </div>
          <div className="col-auto">
            <i className="fas fa-user-circle fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-6 col-xl-3 mb-4">
    <div className="card shadow border-start-info py-2">
      <div className="card-body">
        <div className="row align-items-center no-gutters">
          <div className="col me-2">
            <div className="text-uppercase text-info fw-bold text-xs mb-1">
              <span>total revenue</span>
            </div>
            <div className="row g-0 align-items-center">
              <div className="col-auto">
                <div className="text-dark fw-bold h5 mb-0 me-3">
                  <span>50000</span>
                </div>
              </div>
              <div className="col">
                <div className="progress progress-sm">
                  <div className="progress-bar bg-info" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"50%"}}>
                    <span className="visually-hidden">50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-6 col-xl-3 mb-4">
    <div className="card shadow border-start-warning py-2">
      <div className="card-body">
        <div className="row align-items-center no-gutters">
          <div className="col me-2">
            <div className="text-uppercase text-warning fw-bold text-xs mb-1">
              <span>total books loan</span>
            </div>
            <div className="text-dark fw-bold h5 mb-0">
              <span>5</span>
            </div>
          </div>
          <div className="col-auto">
            <i className="fas fa-comments fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}
export default Data