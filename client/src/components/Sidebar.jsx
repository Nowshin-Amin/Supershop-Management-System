import { NavLink } from "react-router-dom";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-3">
        🛒 Admin Panel
      </h4>

      <hr className="text-white" />

      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
            }
          >
            📊 Dashboard
          </NavLink>
        </li>

        {/* Products */}
        <li className="nav-item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
            }
          >
            📦 Products
          </NavLink>
        </li>

        {/* Categories */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <li className="nav-item">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              🗂 Categories
            </NavLink>
          </li>
        )}

        {/* Customers */}
        <li className="nav-item">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
            }
          >
            👥 Customers
          </NavLink>
        </li>

        {/* Suppliers */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <li className="nav-item">
            <NavLink
              to="/suppliers"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              🚚 Suppliers
            </NavLink>
          </li>
        )}

        {/* Branches */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <li className="nav-item">
            <NavLink
              to="/branches"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              🏢 Branches
            </NavLink>
          </li>
        )}

        {/* Purchases */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <li className="nav-item">
            <NavLink
              to="/purchases"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              🛍 Purchases
            </NavLink>
          </li>
        )}

        {/* Sales */}
        <li className="nav-item">
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
            }
          >
            💰 Sales
          </NavLink>
        </li>

        {/* Reports */}
        {(user?.role === "Admin" || user?.role === "Manager") && (
          <li className="nav-item">
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              📈 Reports
            </NavLink>
          </li>
        )}

        {/* Users - Admin Only */}
        {user?.role === "Admin" && (
          <li className="nav-item">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              👤 Users
            </NavLink>
          </li>
        )}

        {/* Settings - Admin Only */}
        {user?.role === "Admin" && (
          <li className="nav-item">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white rounded" : "text-white"}`
              }
            >
              ⚙️ Settings
            </NavLink>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;