import DoughnutChart from "./DoughnutChart";
function Revenue(){
    return (
        <div className="col-lg-5 col-xl-4">
  <div className="card shadow mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <h6 className="text-primary fw-bold m-0">Revenue Sources</h6>
      <div className="dropdown no-arrow">
        <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
          <i className="fas fa-ellipsis-v text-gray-400"></i>
        </button>
        <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
          <p className="text-center dropdown-header">dropdown header:</p>
          <a className="dropdown-item" href="/login">&nbsp;Action</a>
          <a className="dropdown-item" href="/login">&nbsp;Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/login">&nbsp;Something else here</a>
        </div>
      </div>
    </div>
    <div className="card-body">
      <div className="chart-area">
      <DoughnutChart></DoughnutChart>
      </div>
      <div className="text-center small mt-4">
        <span className="me-2">
          <i className="fas fa-circle text-primary"></i>&nbsp;Direct </span>
        <span className="me-2">
          <i className="fas fa-circle text-success"></i>&nbsp;Social </span>
        <span className="me-2">
          <i className="fas fa-circle text-info"></i>&nbsp;Refferal </span>
      </div>
    </div>
  </div>
</div>
    );
}
export default Revenue;