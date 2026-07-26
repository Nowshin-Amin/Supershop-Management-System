import { useEffect, useState } from "react";
import { getDashboardReport } from "../../api/reportApi";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {

  const [report, setReport] = useState({});

  useEffect(() => {

    loadReport();

  }, []);

  const loadReport = async () => {

    try {

      const res = await getDashboardReport();

      setReport(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ===============================
  // Export PDF
  // ===============================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("SUPERSHOP REPORT", 60, 20);

    autoTable(doc, {

      startY: 35,

      head: [["Report", "Value"]],

      body: [

        ["Total Products", report.totalProducts || 0],

        ["Total Customers", report.totalCustomers || 0],

        ["Total Suppliers", report.totalSuppliers || 0],

        ["Total Sales", report.totalSales || 0],

        ["Total Purchases", report.totalPurchases || 0],

        ["Sales Amount", report.salesAmount || 0],

        ["Purchase Amount", report.purchaseAmount || 0],

        ["Profit", report.profit || 0],

      ],

    });

    doc.save("Supershop_Report.pdf");

  };

  // ===============================
  // Export Excel
  // ===============================

  const exportExcel = () => {

    const data = [

      {

        "Total Products": report.totalProducts,

        "Total Customers": report.totalCustomers,

        "Total Suppliers": report.totalSuppliers,

        "Total Sales": report.totalSales,

        "Total Purchases": report.totalPurchases,

        "Sales Amount": report.salesAmount,

        "Purchase Amount": report.purchaseAmount,

        "Profit": report.profit,

      },

    ];
        const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    const excelBuffer = XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array",

    });

    const fileData = new Blob(

      [excelBuffer],

      {

        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      }

    );

    saveAs(fileData, "Supershop_Report.xlsx");

  };

  // ===============================
  // Print
  // ===============================

  const printReport = () => {

    window.print();

  };

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Reports Dashboard</h2>

        <div>

          <button
            className="btn btn-danger me-2"
            onClick={exportPDF}
          >
            PDF
          </button>

          <button
            className="btn btn-success me-2"
            onClick={exportExcel}
          >
            Excel
          </button>

          <button
            className="btn btn-primary"
            onClick={printReport}
          >
            Print
          </button>

        </div>

      </div>

      <div className="row g-3">

        <div className="col-md-3">

          <div className="card bg-primary text-white shadow">

            <div className="card-body text-center">

              <h5>Total Products</h5>

              <h2>{report.totalProducts || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-success text-white shadow">

            <div className="card-body text-center">

              <h5>Total Customers</h5>

              <h2>{report.totalCustomers || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-warning text-white shadow">

            <div className="card-body text-center">

              <h5>Total Suppliers</h5>

              <h2>{report.totalSuppliers || 0}</h2>

            </div>

          </div>

        </div>
                <div className="col-md-3">

          <div className="card bg-danger text-white shadow">

            <div className="card-body text-center">

              <h5>Total Sales</h5>

              <h2>{report.totalSales || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-info text-white shadow">

            <div className="card-body text-center">

              <h5>Total Purchases</h5>

              <h2>{report.totalPurchases || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-dark text-white shadow">

            <div className="card-body text-center">

              <h5>Sales Amount</h5>

              <h2>৳ {report.salesAmount || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-secondary text-white shadow">

            <div className="card-body text-center">

              <h5>Purchase Amount</h5>

              <h2>৳ {report.purchaseAmount || 0}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-12">

          <div
            className={`card shadow ${
              report.profit >= 0
                ? "bg-success"
                : "bg-danger"
            } text-white`}
          >

            <div className="card-body text-center">

              <h3>Total Profit</h3>

              <h1>৳ {report.profit || 0}</h1>

            </div>

          </div>

        </div>
              </div>

    </div>

  );

}

export default Reports;