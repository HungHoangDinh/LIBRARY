import React, {useState, useEffect} from "react";
import LoanRow from "./LoanRow";
import Navigator from "../Hung/Navigator";
import axios from "axios";
import SearchBoard from "../Hung/SearchBoard";
function ManageLoan(){
    var i = 1;
    const [bills, setBills] = useState([]);
    useEffect(() => {
        const updateState = async () => {
            try{
                const res =  await axios.get("http://localhost:5000/loans/updateState");
                console.log(res.data.tt);
            }catch(error){
                console.log(error);
            }
        }
        const getBills = async () => {
            try{
                const res = await axios.get("http://localhost:5000/loans/");
                setBills(res.data);
                console.log(res.data);
            }catch(error){
                console.log(error.message);
            }
        }
        updateState();
        getBills();
    }, [])
    return (
        <div id="wrapper">
        <Navigator></Navigator>
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <SearchBoard></SearchBoard>
                <div className="container-fluid">
                    <h3 className="text-dark mb-4"><strong>MANAGE LOAN</strong></h3>
                    <div className="card shadow">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">All loans</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 text-nowrap">
                                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                                                <option value="10" selected="">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>&nbsp;</label></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"/></label></div>
                                </div>
                            </div>
                            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                <table className="table table-striped my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Bill ID</th>
                                            <th>Student Email</th>
                                            <th>Borrow Date</th>
                                            <th>Return date</th>
                                            <th>Status</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bills.length > 0 && bills.map(bill => {
                                            return <LoanRow key={bill.billID} stt={i++} billID={bill.billID} username={bill.username} borrowDate={bill.borrowDate} returnDate={bill.returnDate} state={bill.state}/>
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><strong>#</strong></td>
                                            <td><strong>Bill ID</strong></td>
                                            <td><strong>Student Email</strong></td>
                                            <td><strong>Borrow Date</strong></td>
                                            <td><strong>Return date</strong></td>
                                            <td><strong>Status</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-6 align-self-center">
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2024</span></div>
                </div>
            </footer>
        </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
    </div>
    )
}

export default ManageLoan;