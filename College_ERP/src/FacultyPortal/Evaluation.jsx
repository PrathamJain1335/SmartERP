import React, { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import "jspdf-autotable";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const sectionOptions = [
  { label: "CS101 - Section A", value: "CS101A" },
  { label: "CS102 - Section B", value: "CS102B" },
];

const mockData = {
  CS101A: {
    marksUpload: {
      internal: "Upload",
      assignment: "Upload",
      outOf: 64,
    },
    grades: [
      { student: "Aarav Sharma", subject: "CS101", marks: 88, grade: "A" },
      { student: "Diya Patel", subject: "PHY101", marks: 92, grade: "A+" },
      { student: "Rohan Gupta", subject: "MA203", marks: 75, grade: "B" },
    ],
  },
  CS102B: {
    marksUpload: {
      internal: "Upload",
      assignment: "Upload",
      outOf: 64,
    },
    grades: [
      { student: "Sia Verma", subject: "CS102", marks: 81, grade: "A" },
      { student: "Rahul Mehta", subject: "PHY102", marks: 85, grade: "A" },
      { student: "Ananya Das", subject: "MA204", marks: 78, grade: "B+" },
    ],
  },
};

export default function Evaluation() {
  const [activeTab, setActiveTab] = useState("Marks Upload");
  const [selectedSection, setSelectedSection] = useState(sectionOptions[0].value);

  const currentData = mockData[selectedSection];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Summary Report", 14, 16);

    const tableColumn = ["Student", "Subject", "Marks", "Grade"];
    const tableRows = currentData.grades.map(g => [g.student, g.subject, g.marks, g.grade]);

    // AutoTable (tabular summary)
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22,
    });

    // Chart summary as image
    const chartCanvas = document.getElementById("summaryChart");
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL("image/png");
      doc.addImage(chartImage, "PNG", 14, doc.lastAutoTable.finalY + 10, 180, 60);
    }

    doc.save("summary.pdf");
  };

  // Chart data
  const chartData = {
    labels: currentData.grades.map(g => g.student),
    datasets: [
      {
        label: "Marks",
        data: currentData.grades.map(g => g.marks),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Evaluation & Result</h3>
          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="bg-gray-200 text-black px-2 py-1 rounded"
          >
            {sectionOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleExportPDF}
          >
            Generate Summary
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          {["Marks Upload", "Grades", "Summary"].map(tab => (
            <button
              key={tab}
              className={`px-3 py-1 rounded ${activeTab === tab ? "bg-gray-300 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-900"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Marks Upload" && (
          <div className="flex space-x-4">
            <div className="p-3 border dark:border-gray-700 rounded flex-1">
              <div className="font-bold mb-1">Upload Internal Marks</div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded">{currentData.marksUpload.internal}</button>
              <div className="mt-2 text-sm text-gray-600">Out of {currentData.marksUpload.outOf}</div>
            </div>
            <div className="p-3 border dark:border-gray-700 rounded flex-1">
              <div className="font-bold mb-1">Assignment Marks</div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded">{currentData.marksUpload.assignment}</button>
              <div className="mt-2 text-sm text-gray-600">Out of {currentData.marksUpload.outOf}</div>
            </div>
          </div>
        )}

        {activeTab === "Grades" && (
          <div>
            <table className="min-w-full border dark:border-gray-700 mt-4">
              <thead>
                <tr>
                  <th className="border p-2">Student</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Marks</th>
                  <th className="border p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentData.grades.map((g, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{g.student}</td>
                    <td className="border p-2">{g.subject}</td>
                    <td className="border p-2">{g.marks}</td>
                    <td className="border p-2">{g.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Summary" && (
          <div className="mt-6">
            <Bar data={chartData} id="summaryChart" />
            <table className="min-w-full border dark:border-gray-700 mt-8">
              <thead>
                <tr>
                  <th className="border p-2">Student</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Marks</th>
                  <th className="border p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentData.grades.map((g, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{g.student}</td>
                    <td className="border p-2">{g.subject}</td>
                    <td className="border p-2">{g.marks}</td>
                    <td className="border p-2">{g.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
