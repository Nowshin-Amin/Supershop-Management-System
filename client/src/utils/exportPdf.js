import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPdf = (title, data) => {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(title, 14, 18);

  if (!data.length) {

    doc.text("No Data Found", 14, 30);

    doc.save(`${title}.pdf`);

    return;

  }

  const columns = Object.keys(data[0]);

  const rows = data.map(item =>
    columns.map(col => item[col])
  );

  autoTable(doc, {

    head: [columns],

    body: rows,

    startY: 28,

  });

  doc.save(`${title}.pdf`);

};

export default exportPdf;