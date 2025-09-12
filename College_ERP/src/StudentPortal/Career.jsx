import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ChevronLeft, ChevronRight, Download, Search, Calendar, AlertTriangle, BarChart2, PieChart, FileText, Bot, TrendingUp, Briefcase, School, FileTextIcon, Gavel, HelpCircle, Lightbulb } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
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
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, zoomPlugin, Filler);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
  neutral: "#6B7280",
};

// Dummy data for JECRC University Career Portal
const initialDocuments = [
  { id: "doc1", title: "Resume", type: "PDF", date: "2025-09-01" },
  { id: "doc2", title: "Academic Transcript", type: "PDF", date: "2025-08-15" },
  { id: "doc3", title: "Internship Certificate", type: "PDF", date: "2025-07-20" },
  { id: "doc4", title: "Extra-Curricular Certificate", type: "PDF", date: "2025-06-10" },
  { id: "doc5", title: "Project Report", type: "PDF", date: "2025-05-05" },
  { id: "doc6", title: "Skill Certification", type: "PDF", date: "2025-04-01" },
  { id: "doc7", title: "Recommendation Letter", type: "PDF", date: "2025-03-15" },
  { id: "doc8", title: "Academic Award", type: "PDF", date: "2025-02-10" },
  { id: "doc9", title: "Volunteer Certificate", type: "PDF", date: "2025-01-05" },
  { id: "doc10", title: "Training Certificate", type: "PDF", date: "2024-12-01" },
];

const initialInternships = [
  { id: "int1", company: "TCS", position: "Software Intern", duration: "6 months", status: "Applied" },
  { id: "int2", company: "Infosys", position: "Data Analyst Intern", duration: "3 months", status: "Pending" },
  { id: "int3", company: "Accenture", position: "IT Intern", duration: "4 months", status: "Accepted" },
  { id: "int4", company: "Wipro", position: "Developer Intern", duration: "5 months", status: "Rejected" },
  { id: "int5", company: "Capgemini", position: "Testing Intern", duration: "6 months", status: "Applied" },
  { id: "int6", company: "HCL", position: "Network Intern", duration: "3 months", status: "Pending" },
  { id: "int7", company: "Tech Mahindra", position: "AI Intern", duration: "4 months", status: "Accepted" },
  { id: "int8", company: "IBM", position: "Cloud Intern", duration: "5 months", status: "Rejected" },
  { id: "int9", company: "Deloitte", position: "Consulting Intern", duration: "6 months", status: "Applied" },
  { id: "int10", company: "KPMG", position: "Audit Intern", duration: "3 months", status: "Pending" },
];

const initialCompanies = [
  { id: "comp1", name: "TCS", visitDate: "2025-10-15", requirements: "CGPA > 7.0, No backlogs", selectionRatio: 0.85 },
  { id: "comp2", name: "Infosys", visitDate: "2025-10-20", requirements: "CGPA > 6.5", selectionRatio: 0.75 },
  { id: "comp3", name: "Accenture", visitDate: "2025-10-25", requirements: "CGPA > 6.0", selectionRatio: 0.70 },
  { id: "comp4", name: "Wipro", visitDate: "2025-11-01", requirements: "CGPA > 7.5", selectionRatio: 0.80 },
  { id: "comp5", name: "Capgemini", visitDate: "2025-11-05", requirements: "CGPA > 6.0", selectionRatio: 0.65 },
  { id: "comp6", name: "HCL", visitDate: "2025-11-10", requirements: "CGPA > 6.5", selectionRatio: 0.78 },
  { id: "comp7", name: "Tech Mahindra", visitDate: "2025-11-15", requirements: "CGPA > 7.0", selectionRatio: 0.82 },
  { id: "comp8", name: "IBM", visitDate: "2025-11-20", requirements: "CGPA > 6.0", selectionRatio: 0.75 },
  { id: "comp9", name: "Deloitte", visitDate: "2025-11-25", requirements: "CGPA > 7.5", selectionRatio: 0.90 },
  { id: "comp10", name: "KPMG", visitDate: "2025-11-30", requirements: "CGPA > 6.5", selectionRatio: 0.70 },
];

const initialDisciplinaryRecords = [
  { id: "disc1", date: "2025-08-01", description: "Late Submission of Assignment", action: "Warning" },
  { id: "disc2", date: "2025-08-15", description: "Absence without Leave", action: "Fine ₹500" },
];

const initialPreparation = initialCompanies.map((c) => ({
  id: c.id,
  resources: ["Company Profile", "Interview Questions", "Resume Tips"],
}));

const initialPortfolio = {
  certifications: ["Python Certification", "Data Science Certification"],
  internships: ["TCS Internship", "Infosys Internship"],
  academics: "CGPA 8.5, B.Tech CSE",
  extracurricular: "Debate Club, Coding Competition Winner",
};

const companyDistributionRaw = [
  { companyName: "TechCorp", count: 45 },
  { companyName: "InnovateX", count: 32 },
  { companyName: "DevSolutions", count: 23 },
];

// Transform to Chart.js Pie data format
const companyDistributionData = {
  labels: companyDistributionRaw.map((c) => c.companyName),
  datasets: [
    {
      data: companyDistributionRaw.map((c) => c.count),
      backgroundColor: [
        jecrcColors.primary,
        jecrcColors.secondary,
        jecrcColors.accent,
        jecrcColors.danger,
        jecrcColors.neutral,
      ],
      borderWidth: 1,
      borderColor: "#fff",
    },
  ],
};

export default function Career() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [selectedCompany, setSelectedCompany] = useState(initialCompanies[0].name);
  const rowsPerPage = 5;

  // Chart Data
  const placementTrendData = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Placement Rate (%)",
        data: [85, 88, 90, 92, 95],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
        pointBackgroundColor: jecrcColors.accent,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: jecrcColors.accent,
        pointHoverBorderColor: jecrcColors.primary,
      },
    ],
  };

  // Dynamically compute company selection ratio data
  const updateCompanySelectionRatioData = () => {
    const company = initialCompanies.find((c) => c.name === selectedCompany);
    const selectionRatio = company ? company.selectionRatio * 100 : 0;
    return {
      labels: ["Selected", "Not Selected"],
      datasets: [
        {
          data: [selectionRatio, 100 - selectionRatio],
          backgroundColor: [jecrcColors.secondary, jecrcColors.neutral],
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    };
  };
  const [companySelectionRatioData, setCompanySelectionRatioData] = useState(updateCompanySelectionRatioData());

  // Update chart data when selectedCompany changes
  React.useEffect(() => {
    setCompanySelectionRatioData(updateCompanySelectionRatioData());
  }, [selectedCompany]);

  const filterData = (data) => {
    return data.filter((item) => 
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredDocuments = filterData(initialDocuments);
  const filteredInternships = filterData(initialInternships);
  const filteredCompanies = filterData(initialCompanies);
  const filteredDisciplinary = filterData(initialDisciplinaryRecords);
  const filteredPreparation = filterData(initialPreparation);

  const pagedDocuments = filteredDocuments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedInternships = filteredInternships.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedCompanies = filteredCompanies.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedDisciplinary = filteredDisciplinary.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedPreparation = filteredPreparation.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredDocuments.length / rowsPerPage);

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
  };

  const handleApplyInternship = (internshipId) => {
    console.log("Applying for internship:", internshipId);
  };

  const handleGeneratePortfolio = () => {
    console.log("AI generating portfolio based on:", portfolio);
    alert("Portfolio generated successfully!");
  };

  const handleViewCompanyDetails = (company) => {
    console.log("Viewing company details:", company.name);
  };

  const handleViewDisciplinary = (record) => {
    console.log("Viewing disciplinary record:", record.id);
  };

  const handleAccessPreparation = (resource) => {
    console.log("Accessing preparation resource:", resource);
  };

  // Utility: Convert JSON to CSV
  const convertToCSV = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : [objArray];
    if (array.length === 0) return "";

    const headers = Object.keys(array[0]);
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(","));

    // Add data rows
    array.forEach((row) => {
      const values = headers.map((header) =>
        `"${row[header] ? row[header].toString().replace(/"/g, '""') : ""}"`
      );
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  // Export handler to trigger CSV download
  const handleExport = () => {
    let exportData = [];

    switch (activeTab) {
      case "documents":
        exportData = filteredDocuments;
        break;
      case "internships":
        exportData = filteredInternships;
        break;
      case "companies":
        exportData = filteredCompanies;
        break;
      case "preparation":
        exportData = filteredPreparation;
        break;
      case "disciplinary":
        exportData = filteredDisciplinary;
        break;
      default:
        exportData = [];
    }

    if (exportData.length === 0) {
      alert("No data available to export.");
      return;
    }

    const csvContent = convertToCSV(exportData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeTab}_export.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Unique Features
  const uniqueFeatures = [
    { id: "portfolio-generator", title: "AI Portfolio Generation", icon: <Bot size={16} />, description: "Generate a personalized portfolio using AI." },
    { id: "job-match", title: "Job Match Simulator", icon: <Lightbulb size={16} />, description: "Simulate job matches based on your profile." },
    { id: "interview-prep", title: "Virtual Interview Prep", icon: <HelpCircle size={16} />, description: "Prepare for interviews with virtual practice." },
    { id: "career-path", title: "Career Path Visualizer", icon: <TrendingUp size={16} />, description: "Visualize your career path." },
  ];

  const handleUniqueFeatureClick = (feature) => {
    console.log("Accessing unique feature:", feature.title);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex items-center mb-6">
        <img src="./image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold text-blue-900">Student Career Portal</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto bg-white p-2 rounded-lg shadow-md">
        {["dashboard", "documents", "portfolio", "internships", "companies", "preparation", "disciplinary", "analytics", "uniquefeatures"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"} transition duration-200 flex items-center gap-2`}
          >
            {tab === "portfolio-generator" && <Bot size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Document View */}
      {modalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedDocument.title} - Document View</h2>
            <p><strong>Type:</strong> {selectedDocument.type}</p>
            <p><strong>Date:</strong> {selectedDocument.date}</p>
            <p>View PDF content here (simulate with iframe or PDF viewer).</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Section */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Cards */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <School size={20} className="mr-2" /> Career Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">CGPA</span>
                <span className="font-medium text-blue-900">8.5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">Internships</span>
                <span className="font-medium text-blue-900">2</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">Certifications</span>
                <span className="font-medium text-blue-900">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">Extra-Curricular</span>
                <span className="font-medium text-blue-900">4</span>
              </div>
            </div>
          </div>

          {/* Placement Rate Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <TrendingUp size={20} className="mr-2" /> Placement Rate Over Years
            </h3>
            <div style={{ height: "320px", width: "100%" }}>
            <Line
                data={placementTrendData}
                options={{
                responsive: true,
                maintainAspectRatio: false, // allows the height of container to set chart height
                plugins: {
                    legend: { position: "top", labels: { color: jecrcColors.neutral } },
                    zoom: { zoom: { mode: "x", speed: 0.1 } },
                    tooltip: { backgroundColor: jecrcColors.primary, titleColor: "#fff", bodyColor: "#fff" },
                },
                scales: {
                    y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    title: { display: true, text: "Placement Rate (%)", color: jecrcColors.neutral },
                    },
                    x: { title: { display: true, text: "Year", color: jecrcColors.neutral } },
                },
                }}
            />
            </div>
          </div>

          {/* Company Selection Ratio Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <PieChart size={20} className="mr-2" /> Selection Ratio for {selectedCompany}
            </h3>
            <div className="mb-4">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                {initialCompanies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            {companySelectionRatioData && companySelectionRatioData.labels && (
              <div className="w-full h-[250px]">
                <Pie
                    data={companySelectionRatioData}
                    options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top", labels: { color: jecrcColors.neutral } },
                        tooltip: { backgroundColor: jecrcColors.primary, titleColor: "#fff", bodyColor: "#fff" },
                    },
                    }}
                />
            </div>
            )}
          </div>

          {/* Internship Status Chart */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <Briefcase size={20} className="mr-2" /> Internship Status
            </h3>
            <div className="w-full h-[250px]">
                <Pie
                    data={{
                    labels: ["Applied", "Pending", "Accepted", "Rejected"],
                    datasets: [
                        {
                        data: [3, 2, 2, 1],
                        backgroundColor: [jecrcColors.accent, jecrcColors.neutral, jecrcColors.secondary, jecrcColors.danger],
                        borderWidth: 1,
                        borderColor: "#fff",
                        },
                    ],
                    }}
                    options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top", labels: { color: jecrcColors.neutral } },
                        tooltip: { backgroundColor: jecrcColors.primary, titleColor: "#fff", bodyColor: "#fff" },
                    },
                    }}
                />
            </div>

          </div>
        </div>
      )}

      {/* Documents Section */}
      {activeTab === "documents" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search documents..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Documents
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedDocuments.length > 0 ? (
                  pagedDocuments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewDocument(item)}
                        >
                          View PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredDocuments.length)} of {filteredDocuments.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      {activeTab === "portfolio" && (
        <div>
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Bot size={20} className="mr-2 text-blue-900" /> AI Portfolio Generation
            </h3>
            <p className="text-gray-600 mb-4">Generate a personalized portfolio based on your details.</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleGeneratePortfolio}
            >
              <Bot size={16} className="mr-2" /> Generate Portfolio
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Portfolio Details</h3>
            <p><strong>Certifications:</strong> {portfolio.certifications.join(", ")}</p>
            <p><strong>Internships:</strong> {portfolio.internships.join(", ")}</p>
            <p><strong>Academics:</strong> {portfolio.academics}</p>
            <p><strong>Extra-Curricular:</strong> {portfolio.extracurricular}</p>
          </div>
        </div>
      )}

      {/* Internships Section */}
      {activeTab === "internships" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search internships..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Internships
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Company</th>
                  <th className="p-2">Position</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedInternships.length > 0 ? (
                  pagedInternships.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.company}</td>
                      <td className="p-2">{item.position}</td>
                      <td className="p-2">{item.duration}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleApplyInternship(item.id)}
                        >
                          Apply/View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No internships found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredInternships.length)} of {filteredInternships.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Companies Section */}
      {activeTab === "companies" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search companies..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Companies
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Name</th>
                  <th className="p-2">Visit Date</th>
                  <th className="p-2">Requirements</th>
                  <th className="p-2">Preparation</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedCompanies.length > 0 ? (
                  pagedCompanies.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.visitDate}</td>
                      <td className="p-2">{item.requirements}</td>
                      <td className="p-2">{initialPreparation.find((prep) => prep.id === item.id)?.resources.join(", ") || "N/A"}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewCompanyDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredCompanies.length)} of {filteredCompanies.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preparation Section */}
      {activeTab === "preparation" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search preparation resources..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Preparation Resources
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Company</th>
                  <th className="p-2">Resources</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedPreparation.length > 0 ? (
                  pagedPreparation.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{initialCompanies.find((c) => c.id === item.id)?.name}</td>
                      <td className="p-2">{item.resources.join(", ")}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleAccessPreparation(item.resources[0])}
                        >
                          Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No preparation resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredPreparation.length)} of {filteredPreparation.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disciplinary Section */}
      {activeTab === "disciplinary" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search disciplinary records..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Disciplinary Records
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Date</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedDisciplinary.length > 0 ? (
                  pagedDisciplinary.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.description}</td>
                      <td className="p-2">{item.action}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewDisciplinary(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No disciplinary records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredDisciplinary.length)} of {filteredDisciplinary.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Line size={20} className="mr-2 text-blue-900" /> Placement Trend
            </h3>
            <Line data={placementTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-blue-900" /> Company Distribution
            </h3>
            <Pie data={companyDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
          </div>
        </div>
      )}

      {/* Unique Features Section */}
      {activeTab === "uniquefeatures" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniqueFeatures.map((feature) => (
            <div key={feature.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-600">Click to access {feature.title.toLowerCase()}.</p>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleUniqueFeatureClick(feature)}
              >
                Access
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}