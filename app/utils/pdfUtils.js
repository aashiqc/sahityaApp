// pdfUtils.js

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (competitionName, participants) => {
  try {
    const pdf = new jsPDF();
    const table = document.createElement("table");

    // Add table body
    const tbody = document.createElement("tbody");
    participants.forEach((participant, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${participant.fullName}</td>
        <td>${participant.codeLetter}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to the document body (temporarily)
    document.body.appendChild(table);

    // Wait for the DOM to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Convert table to canvas
    const canvas = await html2canvas(table, { scale: 2 });

    // Remove the temporary table from the document body
    document.body.removeChild(table);

    // Add canvas as an image to the PDF with custom styles
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 100);

    // Save or print the PDF
    pdf.save(`${competitionName}_participants.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
