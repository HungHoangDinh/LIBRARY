import Navigator from "./Hung/Navigator";
import Data from "./Hung/Data";
import Earning from "./Hung/Earning";
import Revenue from "./Hung/Revenue";
import Footer from "./Hung/Footer";
import SearchBoard from './Hung/SearchBoard'
function HomePage(props){
    return (
        <div  id="page-top">
            <div id="wrapper">
            <Navigator state={props.state}></Navigator>
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <SearchBoard></SearchBoard>
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Dashboard</h3>
                    </div>
                    <Data></Data>
                    <div className="row">
                        <Earning></Earning>
                        <Revenue></Revenue>
                    </div>
                    
                </div>
            </div>
            <Footer></Footer>
        </div>
        <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
    </div>
        </div>
    );
}
export default HomePage;