import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSale } from "../../api/saleApi";

function Invoice() {

  const { id } = useParams();

  const [sale, setSale] = useState({});

  useEffect(() => {
    loadSale();
  }, []);

  const loadSale = async () => {
    try {
      const res = await getSale(id);
      setSale(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = Number(sale.total || 0);
  const discount = subtotal * 0.05;
  const vat = (subtotal - discount) * 0.10;
  const grandTotal = subtotal - discount + vat;

  const loyaltyPoints = Math.floor(grandTotal / 100);

  const membership =
    grandTotal >= 5000
      ? "Gold"
      : grandTotal >= 2000
      ? "Silver"
      : "Regular";

  const printInvoice = () => {
    window.print();
  };

  return (

<div className="container mt-4 mb-5">

<div className="card border-0 shadow-lg">

<div
className="text-white p-5"
style={{
background:"linear-gradient(90deg,#0d47a1,#1976d2)"
}}
>

<div className="row">

<div className="col-md-8">

<h1>SUPERSHOP</h1>

<h4>Management System</h4>

<p>Dhaka, Bangladesh</p>

<p>Phone : 01700000000</p>

</div>

<div className="col-md-4 text-end">

<h2>INVOICE</h2>

<h5>#{sale.invoice_no}</h5>

</div>

</div>

</div>

<div className="card-body p-5">

<div className="row mb-4">

  <div className="col-md-6">

    <div
      className="p-4"
      style={{
        background:"#f8f9fa",
        borderRadius:"10px",
        borderLeft:"5px solid #0d6efd"
      }}
    >

      <h5 className="text-primary">
        Customer Information
      </h5>

      <hr />

      <p>
        <strong>Name :</strong> {sale.customer_name}
      </p>

      <p>
        <strong>Phone :</strong> {sale.phone}
      </p>

      <p>
        <strong>Address :</strong> {sale.address}
      </p>

    </div>

  </div>

  <div className="col-md-6">

    <div
      className="p-4"
      style={{
        background:"#f8f9fa",
        borderRadius:"10px",
        borderLeft:"5px solid #198754"
      }}
    >

      <h5 className="text-success">
        Invoice Details
      </h5>

      <hr />

      <p>
        <strong>Invoice No :</strong> {sale.invoice_no}
      </p>

      <p>
        <strong>Date :</strong> {sale.sale_date}
      </p>

      <p>
        <strong>Payment Method :</strong>{" "}
        <span className="badge bg-success">
          {sale.payment_method || "Cash"}
        </span>
      </p>

      <p>
        <strong>Payment Status :</strong>{" "}
        <span className="badge bg-primary">
          Paid
        </span>
      </p>

      <p>
        <strong>Membership :</strong>{" "}
        <span className="badge bg-warning text-dark">
          {membership}
        </span>
      </p>

      <p>
        <strong>Loyalty Points :</strong>{" "}
        <span className="badge bg-info text-dark">
          {loyaltyPoints}
        </span>
      </p>

    </div>

  </div>

</div>
{/* Product Table */}

<div className="table-responsive">

  <table className="table table-bordered table-striped">

    <thead className="table-primary">

      <tr>

        <th>Product</th>

        <th>Unit Price</th>

        <th>Quantity</th>

        <th>Total</th>

      </tr>

    </thead>

    <tbody>

      <tr>

        <td>{sale.product_name}</td>

        <td>৳ {Number(sale.selling_price || 0).toFixed(2)}</td>

        <td>{sale.quantity}</td>

        <td>৳ {subtotal.toFixed(2)}</td>

      </tr>

    </tbody>

  </table>

</div>

{/* Bill Summary */}

<div className="row justify-content-end mt-4">

  <div className="col-md-5">

    <table className="table table-bordered shadow">

      <tbody>

        <tr>

          <th>Subtotal</th>

          <td>৳ {subtotal.toFixed(2)}</td>

        </tr>

        <tr>

          <th>Discount (5%)</th>

          <td className="text-danger">
            - ৳ {discount.toFixed(2)}
          </td>

        </tr>

        <tr>

          <th>VAT (10%)</th>

          <td className="text-success">
            + ৳ {vat.toFixed(2)}
          </td>

        </tr>

        <tr>

          <th>Grand Total</th>

          <th className="bg-primary text-white">
            ৳ {grandTotal.toFixed(2)}
          </th>

        </tr>

      </tbody>

    </table>

  </div>

</div>
<hr className="mt-5" />

<div className="row mt-4">

  <div className="col-md-6">

    <h5 className="text-primary">
      Payment Information
    </h5>

    <p>
      <strong>Payment Method :</strong>{" "}
      <span className="badge bg-success">
        {sale.payment_method || "Cash"}
      </span>
    </p>

    <p>
      <strong>Payment Status :</strong>{" "}
      <span className="badge bg-primary">
        Paid
      </span>
    </p>

    <p>
      <strong>Membership :</strong>{" "}
      <span className="badge bg-warning text-dark">
        {membership}
      </span>
    </p>

    <p>
      <strong>Loyalty Points :</strong>{" "}
      <span className="badge bg-info text-dark">
        {loyaltyPoints}
      </span>
    </p>

    <p>
      <strong>Cashier :</strong> Admin
    </p>

  </div>

  <div className="col-md-6 text-end">

    <br />
    <br />
    <br />

    ___________________________

    <br />

    <strong>Authorized Signature</strong>

  </div>

</div>

<div className="text-center mt-5">

  <h3 className="text-primary fw-bold">
    Thank You For Shopping
  </h3>

  <p>We Appreciate Your Business.</p>

  <p>Please Visit Again.</p>

</div>

<div className="text-center mt-4">

  <button
    className="btn btn-primary btn-lg px-5"
    onClick={printInvoice}
  >
    Print Invoice
  </button>

</div>

</div>

</div>

</div>

);

}

export default Invoice;