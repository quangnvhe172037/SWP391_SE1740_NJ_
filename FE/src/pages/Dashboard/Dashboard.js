import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="containers mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Admin Dashboard</h5>
                            <p className="card-text">Welcome to the Admin Dashboard!</p>
                            <Link to="/account-list" className="btn" style={{border: "1px solid black"}}>View Account List</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;