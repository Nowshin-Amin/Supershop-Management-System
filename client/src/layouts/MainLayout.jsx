import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          minHeight: "100vh",
        }}
      >

        {/* Top Navbar */}

        <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">

          <div>

            <h5 className="mb-0">
              Welcome, {user?.name}
            </h5>

          </div>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* Page Content */}

        <div className="p-4">

          {children}

        </div>

      </div>

    </div>

  );

}

export default MainLayout;