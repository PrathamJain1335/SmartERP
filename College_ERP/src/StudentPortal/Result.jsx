import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download, BarChart2, FileText, Award, PieChart, Book, GraduationCap, User, TrendingUp } from "lucide-react"; // Added new icons
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Added ArcElement for Pie chart
} from "chart.js";

// Register Chart.js components including ArcElement
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
import { Bar, Pie } from "react-chartjs-2";

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A", // JECRC Blue
  secondary: "#10B981", // Accent Green
  accent: "#F59E0B", // Orange accent (used for grades/highlights)
  danger: "#EF4444",
  neutral: "#6B7280",
  lightBlue: "#E0E7FF", // Lighter blue for backgrounds/accents
};

// Dummy Student and Overall Result Data (You'd likely get this via props or API)
const studentInfo = {
  name: "Pratham Jain",
  rollNumber: "24BCON2776",
  program: "B.Tech – Computer Science & Engineering",
  semesterInfo: "3rd Semester", // Changed name to avoid conflict with overallResult.semester
  academicYear: "2025–26",
};

// Dummy subjects and result data (kept from your original code)
const subjects = [
  { id: "sub1", name: "Computer Networks", code: "CS401", inSemI: 15, inSemII: 18, assignment: 10, practical: 12, endSem: 45, total: 100, grade: "A" },
  { id: "sub2", name: "Operating System", code: "CS402", inSemI: 17, inSemII: 16, assignment: 12, practical: 14, endSem: 48, total: 100, grade: "A+" },
  { id: "sub3", name: "Discrete Mathematics", code: "MA301", inSemI: 14, inSemII: null, assignment: 11, practical: 13, endSem: 42, total: 100, grade: "B" },
  { id: "sub4", name: "R Programming", code: "ST401", inSemI: 16, inSemII: 15, assignment: 13, practical: 15, endSem: 50, total: 100, grade: "A+" },
  { id: "sub5", name: "Probabilistic Modelling Using Python", code: "ST402", inSemI: 18, inSemII: 17, assignment: 14, practical: 16, endSem: 47, total: 100, grade: "A" },
  { id: "sub6", name: "Life Skills", code: "HS401", inSemI: 15, inSemII: null, assignment: 12, practical: 14, endSem: 44, total: 100, grade: "B+" },
  { id: "sub7", name: "Software Engineering And Project Management", code: "CS403", inSemI: 17, inSemII: 16, assignment: 13, practical: 15, endSem: 49, total: 100, grade: "A+" },
  { id: "sub8", name: "Data Structure and Algorithm", code: "CS404", inSemI: 16, inSemII: 15, assignment: 14, practical: 16, endSem: 46, total: 100, grade: "A" },
  { id: "sub9", name: "Computer Networks", code: "CS401", inSemI: 14, inSemII: null, assignment: 11, practical: 13, endSem: 43, total: 100, grade: "B+" },
  { id: "sub10", name: "Operating System", code: "CS402", inSemI: 15, inSemII: 18, assignment: 12, practical: 14, endSem: 45, total: 100, grade: "A" },
];

const overallResult = {
  cgpa: 8.7,
  sgpa: 8.9,
  totalCredits: 24,
  resultStatus: "Passed", // Added result status
  semester: "Fall 2025",
};

const classComparison = { averageCgpa: 8.2, studentRank: 5, classSize: 50 };
const universityComparison = { averageCgpa: 7.9, studentRank: 12, totalStudents: 500 };


export default function Result() {
  const [activeTab, setActiveTab] = useState("marksheet"); // Changed default tab to 'marksheet'
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const filterData = (data) => {
    return data.filter((item) =>
      (searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  };

  const filteredSubjects = filterData(subjects);
  const pagedSubjects = filteredSubjects.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const maxPage = Math.ceil(filteredSubjects.length / rowsPerPage);

  const handleDownloadResult = () => {
    // This will download the current active tab's content
    const input = document.getElementById("result-content"); // Changed ID to target the main content area
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => { // Increased scale for better PDF quality
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // 'p' for portrait, 'mm' for units, 'a4' for size
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add a margin to the PDF
      const margin = 10;
      pdf.addImage(imgData, "PNG", margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
      pdf.save(`JECRC_University_Result_${studentInfo.name.replace(/\s+/g, '_')}_${studentInfo.academicYear}.pdf`);
    });
  };

  // Chart data for Analytics tab
  const classComparisonData = {
    labels: ["Your CGPA", "Class Avg"],
    datasets: [
      {
        label: "CGPA",
        data: [overallResult.cgpa, classComparison.averageCgpa],
        backgroundColor: [jecrcColors.primary, jecrcColors.neutral],
        borderColor: [jecrcColors.primary, jecrcColors.neutral],
        borderWidth: 1,
      },
    ],
  };

  const universityComparisonData = {
    labels: ["Your CGPA", "University Avg"],
    datasets: [
      {
        data: [overallResult.cgpa, universityComparison.averageCgpa],
        backgroundColor: [jecrcColors.secondary, jecrcColors.danger],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexible height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins, sans-serif',
          },
          color: jecrcColors.neutral,
        }
      },
      title: {
        display: false, // Title handled by h3/h4 in JSX
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Assuming CGPA is out of 10
        grid: {
          color: '#f0f0f0',
        },
        ticks: {
          font: {
            family: 'Poppins, sans-serif',
          },
          color: jecrcColors.neutral,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Poppins, sans-serif',
          },
          color: jecrcColors.neutral,
        }
      }
    }
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans antialiased text-gray-800">
      {/* Top Header - Kept from your original code */}
      <div className="flex items-center mb-8">
        <img
          src="./image.png" // Assuming logo is in public folder or adjust path
          alt="JECRC University Logo"
          className="w-20 h-auto mr-4 transform transition-all duration-300 hover:scale-110 hover:rotate-6 perspective-1000"
          style={{ perspective: "1000px" }}
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-900">Result Portal</h2>
          <p className="text-sm text-gray-600">Jaipur Engineering College and Research Centre, Jaipur, Rajasthan, India</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8 overflow-x-auto bg-white p-2 rounded-xl shadow-lg border border-gray-100">
        {[
          { id: "marksheet", label: "Marksheet", icon: <FileText size={16} /> },
          { id: "overall", label: "Overall Result", icon: <Award size={16} /> },
          { id: "analytics", label: "Analytics", icon: <BarChart2 size={16} /> },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setActiveTab(tabItem.id)}
            className={`px-6 py-3 rounded-xl transition duration-300 flex items-center gap-2 text-lg font-semibold
              ${activeTab === tabItem.id ? "bg-gradient-to-r from-jecrc-blue to-blue-700 text-black shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-jecrc-blue"}
            `}
          >
            {tabItem.icon}
            {tabItem.label}
          </button>
        ))}
        <button
          onClick={handleDownloadResult}
          className="ml-auto px-6 py-3 rounded-xl bg-accent-green text-black hover:bg-green-600 transition duration-300 flex items-center gap-2 text-lg font-semibold shadow-md"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      {/* Main Content Area - This will be captured for PDF */}
      <div id="result-content" className="bg-white rounded-xl shadow-2xl p-8 lg:p-12 border border-gray-200">

        {/* --- Header Section (Integrated into Marksheet & Overall) --- */}
        {(activeTab === "marksheet" || activeTab === "overall") && (
          <>
            <header className="flex items-center justify-between pb-6 mb-6 border-b-2 border-jecrc-blue">
              {/* JECRC Logo (Optional, can be removed if already in top header) */}
              <img src="./image.png" alt="JECRC University Logo" className="w-25 h-15 mr-3" />
              <div className="flex-grow text-center">
                <h1 className="font-roboto text-jecrc-blue text-4xl font-bold m-0">JECRC University</h1>
                <p className="text-accent-green text-xl font-semibold mt-1">Academic Scorecard / Result</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Semester: {studentInfo.semesterInfo}</p>
                <p>Academic Year: {studentInfo.academicYear}</p>
              </div>
            </header>

            <hr className="my-6 border-gray-200" />

            {/* Student Information Section */}
            <section className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-jecrc-blue mb-4 flex items-center gap-2">
                <User size={24} /> Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-lg">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-36">Name:</span>
                  <span className="text-gray-900 font-medium">{studentInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-36">Program:</span>
                  <span className="text-gray-900 font-medium">{studentInfo.program}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-36">Roll Number:</span>
                  <span className="text-gray-900 font-medium">{studentInfo.rollNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-36">Semester:</span>
                  <span className="text-gray-900 font-medium">{studentInfo.semesterInfo}</span>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Internal Marks (Marksheet Tab) */}
        {activeTab === "marksheet" && (
          <>
            {/* Performance Summary */}
            <section className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-jecrc-blue mb-4 flex items-center gap-2">
                <TrendingUp size={24} /> Performance Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                  <span className="font-semibold text-gray-700 mb-1">CGPA / SGPA:</span>
                  <span className="text-accent-green text-3xl font-bold">{overallResult.cgpa} / {overallResult.sgpa}</span>
                </div>
                <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                  <span className="font-semibold text-gray-700 mb-1">Total Credits:</span>
                  <span className="text-gray-900 text-3xl font-bold">{overallResult.totalCredits}</span>
                </div>
                <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                  <span className="font-semibold text-gray-700 mb-1">Result Status:</span>
                  <span className={`text-3xl font-bold
                    ${overallResult.resultStatus === 'Distinction' ? 'text-accent-green' : ''}
                    ${overallResult.resultStatus === 'Pass' ? 'text-green-600' : ''}
                    ${overallResult.resultStatus === 'Fail' ? 'text-red-600' : ''}
                  `}>
                    {overallResult.resultStatus}
                  </span>
                </div>
              </div>
            </section>

            {/* Subject-wise Marks Table */}
            <section className="mb-8 pb-6 border-b border-gray-200 overflow-x-auto">
              <h3 className="text-2xl font-bold text-jecrc-blue mb-4 flex items-center gap-2">
                <Book size={24} /> Subject-wise Marks (Internal)
              </h3>
              <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search by subject or code..."
                  className="bg-white border border-gray-300 rounded-md p-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-jecrc-blue transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-gray-200 overflow-hidden shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-jecrc-blue text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Sr. No.</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject Code</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">In-Sem I (20)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">In-Sem II (20)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Assignment (20)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Practical (20)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">End-Sem (80)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total (100)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {pagedSubjects.map((subject, index) => (
                      <tr key={subject.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{(page - 1) * rowsPerPage + index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{subject.code}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{subject.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.inSemI || 'N/A'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.inSemII || 'N/A'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.assignment}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.practical}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject.endSem}</td>
                        {/* Calculate total marks from all components for display */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                            {(subject.inSemI || 0) + (subject.inSemII || 0) + (subject.assignment || 0) + (subject.practical || 0) + (subject.endSem || 0)}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold
                          ${subject.grade === 'A+' ? 'text-accent-green' : ''}
                          ${subject.grade === 'A' ? 'text-green-600' : ''}
                          ${subject.grade === 'B+' ? 'text-blue-600' : ''}
                          ${subject.grade === 'B' ? 'text-yellow-600' : ''}
                          ${subject.grade === 'C' ? 'text-orange-600' : ''}
                          ${subject.grade === 'F' ? 'text-red-600' : ''}
                        `}>
                          {subject.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6 text-gray-600 text-sm">
                <span>
                  Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredSubjects.length)} of {filteredSubjects.length} subjects
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-3 font-semibold text-gray-800">{page}</span>
                  <button
                    disabled={page === maxPage}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Overall Result Section */}
        {activeTab === "overall" && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-jecrc-blue mb-4 flex items-center gap-2">
              <Award size={24} /> End Semester Result - {overallResult.semester}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-700 mb-3">Overall Performance Summary</h4>
                <div className="space-y-3 text-lg">
                  <p className="flex justify-between items-center">
                    <span className="font-medium">CGPA:</span>
                    <span className="text-accent-green font-bold text-2xl">{overallResult.cgpa}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium">SGPA:</span>
                    <span className="text-blue-600 font-bold text-2xl">{overallResult.sgpa}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Total Credits:</span>
                    <span className="text-gray-900 font-bold text-2xl">{overallResult.totalCredits}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Result Status:</span>
                    <span className={`font-bold text-2xl
                      ${overallResult.resultStatus === 'Distinction' ? 'text-accent-green' : ''}
                      ${overallResult.resultStatus === 'Pass' ? 'text-green-600' : ''}
                      ${overallResult.resultStatus === 'Fail' ? 'text-red-600' : ''}
                    `}>{overallResult.resultStatus}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Semester:</span>
                    <span className="text-gray-900 font-bold text-2xl">{overallResult.semester}</span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-balck-100">
                <h4 className="text-xl font-semibold text-gray-700 mb-3">Subject-wise End-Sem Marks</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {subjects.map((subject) => (
                    <p key={subject.id} className="flex justify-between items-center text-base text-gray-700">
                      <span className="font-medium">{subject.name} ({subject.code}):</span>
                      <span className="font-semibold text-gray-900">{subject.endSem} / 80</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-jecrc-blue mb-4 flex items-center">
                <BarChart2 size={20} className="mr-2" /> Class Comparison
              </h3>
              <p className="mb-2"><strong>Average Class CGPA:</strong> <span className="text-blue-700 font-semibold">{classComparison.averageCgpa}</span></p>
              <p className="mb-4"><strong>Your Rank:</strong> <span className="text-accent-green font-semibold">{classComparison.studentRank}</span> / {classComparison.classSize}</p>
              <div className="h-64">
                <Bar data={classComparisonData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-jecrc-blue mb-4 flex items-center">
                <PieChart size={20} className="mr-2" /> University Comparison
              </h3>
              <p className="mb-2"><strong>Average University CGPA:</strong> <span className="text-blue-700 font-semibold">{universityComparison.averageCgpa}</span></p>
              <p className="mb-4"><strong>Your Rank:</strong> <span className="text-accent-green font-semibold">{universityComparison.studentRank}</span> / {universityComparison.totalStudents}</p>
              <div className="h-64">
                <Pie data={universityComparisonData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {/* Footer (Common to Marksheet and Overall, potentially) */}
        {(activeTab === "marksheet" || activeTab === "overall") && (
          <footer className="pt-8 mt-8 border-t border-gray-200 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>Signature of Head of Department</p>
              <p>Date of Declaration: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-center md:text-right">
              {/* Optional University Seal */}
              <img src="./image.png" alt="University Seal" className="w-24 h-auto mx-auto md:ml-auto mb-2" />
              <p className="italic text-gray-500">Disclaimer: This is a computer-generated result; no signature required.</p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}