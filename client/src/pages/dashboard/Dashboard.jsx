
import { useEffect, useState } from "react";

import {
  getDashboardReport,
  getLowStockProducts,
  getRecentSales,
  getRecentPurchases,
  getMonthlySales,
} from "../../api/reportApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [report, setReport] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const reportRes = await getDashboardReport();
      setReport(reportRes.data);

      const stockRes = await getLowStockProducts();
      setLowStock(stockRes.data);

      const salesRes = await getRecentSales();
      setRecentSales(salesRes.data);

      const purchaseRes = await getRecentPurchases();
      setRecentPurchases(purchaseRes.data);

      const monthRes = await getMonthlySales();
      setMonthlySales(monthRes.data);

    } catch (err) {

      console.log(err);

    }

  };

  const barData = {

    labels: [
      "Products",
      "Customers",
      "Suppliers",
      "Sales",
      "Purchases",
    ],

    datasets: [

      {

        label: "Business Statistics",

        data: [

          report.totalProducts || 0,
          report.totalCustomers || 0,
          report.totalSuppliers || 0,
          report.totalSales || 0,
          report.totalPurchases || 0,

        ],

        backgroundColor: "#0d6efd",

        borderRadius: 8,

      },

    ],

  };

  const pieData = {

    labels: ["Sales", "Purchases"],

    datasets: [

      {

        data: [

          Number(report.salesAmount || 0),
          Number(report.purchaseAmount || 0),

        ],

        backgroundColor: [
          "#198754",
          "#dc3545",
        ],

      },

    ],

  };

  const lineData = {

    labels: monthlySales.map(item => item.month),

    datasets: [

      {

        label: "Monthly Sales",

        data: monthlySales.map(item => item.total),

        borderColor: "#0d6efd",

        backgroundColor: "#0d6efd",

        fill: false,

        tension: 0.3,

      },

    ],

  };
  return (

<div className="container-fluid mt-4">

  <h2 className="mb-4">
    Dashboard
  </h2>

  {/* Statistics Cards */}

  <div className="row g-3 mb-4">

    <div className="col-md-2">
      <div className="card bg-primary text-white shadow">
        <div className="card-body text-center">
          <h6>Products</h6>
          <h2>{report.totalProducts || 0}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card bg-success text-white shadow">
        <div className="card-body text-center">
          <h6>Customers</h6>
          <h2>{report.totalCustomers || 0}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card bg-warning text-dark shadow">
        <div className="card-body text-center">
          <h6>Suppliers</h6>
          <h2>{report.totalSuppliers || 0}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card bg-info text-white shadow">
        <div className="card-body text-center">
          <h6>Sales</h6>
          <h2>{report.totalSales || 0}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card bg-secondary text-white shadow">
        <div className="card-body text-center">
          <h6>Purchases</h6>
          <h2>{report.totalPurchases || 0}</h2>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card bg-danger text-white shadow">
        <div className="card-body text-center">
          <h6>Profit</h6>
          <h2>৳ {report.profit || 0}</h2>
        </div>
      </div>
    </div>

  </div>

  {/* Charts */}

  <div className="row">

    {/* Bar Chart */}

    <div className="col-lg-8 mb-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h5 className="mb-0">
            Business Statistics
          </h5>

        </div>

        <div className="card-body">

          <Bar data={barData} />

        </div>

      </div>

    </div>

    {/* Pie Chart */}

    <div className="col-lg-4 mb-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">

          <h5 className="mb-0">
            Sales vs Purchases
          </h5>

        </div>

        <div className="card-body">

          <Pie data={pieData} />

        </div>

      </div>

    </div>

  </div>

  {/* Monthly Sales */}

  <div className="card shadow mb-4">

    <div className="card-header bg-dark text-white">

      <h5 className="mb-0">
        Monthly Sales Report
      </h5>

    </div>

    <div className="card-body">

      <Line data={lineData} />

    </div>

  </div>
    {/* Low Stock Products */}

  <div className="card shadow mb-4">

    <div className="card-header bg-danger text-white">

      <h5 className="mb-0">
        Low Stock Products
      </h5>

    </div>

    <div className="card-body">

      <table className="table table-bordered table-hover">

        <thead className="table-light">

          <tr>

            <th>ID</th>
            <th>Product</th>
            <th>Stock</th>

          </tr>

        </thead>

        <tbody>

          {lowStock.length === 0 ? (

            <tr>

              <td colSpan="3" className="text-center">

                No Low Stock Products

              </td>

            </tr>

          ) : (

            lowStock.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.name}</td>

                <td className="text-danger fw-bold">

                  {item.stock}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </div>

  <div className="row">

    {/* Recent Sales */}

    <div className="col-lg-6">

      <div className="card shadow mb-4">

        <div className="card-header bg-success text-white">

          <h5 className="mb-0">

            Recent Sales

          </h5>

        </div>

        <div className="card-body">

          <table className="table table-striped">

            <thead>

              <tr>

                <th>Invoice</th>

                <th>Customer</th>

                <th>Total</th>

              </tr>

            </thead>

            <tbody>

              {recentSales.length === 0 ? (

                <tr>

                  <td colSpan="3" className="text-center">

                    No Sales

                  </td>

                </tr>

              ) : (

                recentSales.map((sale) => (

                  <tr key={sale.id}>

                    <td>{sale.invoice_no}</td>

                    <td>{sale.customer_name}</td>

                    <td>৳ {sale.total}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    {/* Recent Purchases */}

    <div className="col-lg-6">

      <div className="card shadow mb-4">

        <div className="card-header bg-warning">

          <h5 className="mb-0">

            Recent Purchases

          </h5>

        </div>

        <div className="card-body">

          <table className="table table-striped">

            <thead>

              <tr>

                <th>Supplier</th>

                <th>Total</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {recentPurchases.length === 0 ? (

                <tr>

                  <td colSpan="3" className="text-center">

                    No Purchases

                  </td>

                </tr>

              ) : (

                recentPurchases.map((purchase) => (

                  <tr key={purchase.id}>

                    <td>{purchase.supplier_name}</td>

                    <td>৳ {purchase.total}</td>

                    <td>{purchase.purchase_date}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

</div>

);

}

export default Dashboard;