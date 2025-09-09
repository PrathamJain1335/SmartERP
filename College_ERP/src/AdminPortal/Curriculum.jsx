import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, BookOpen, Video, PlayCircle, Mic, Scan, Brain, Lightbulb, Moon, Sun } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import { BarChart } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,

} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, zoomPlugin, Filler);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
};

// Dummy curriculum data
const initialCourses = [
  { id: "c1", code: "CS101", title: "Introduction to Programming", credits: 4, school: "School of Engineering & Technology", branch: "Computer Science", semester: 1 },
  { id: "c2", code: "ME201", title: "Thermodynamics", credits: 4, school: "School of Engineering & Technology", branch: "Mechanical", semester: 2 },
  { id: "c3", code: "PH301", title: "Quantum Physics", credits: 3, school: "School of Sciences", branch: "Physics", semester: 3 },
  { id: "c4", code: "LA401", title: "Constitutional Law", credits: 4, school: "School of Law", branch: "LLB", semester: 4 },
  { id: "c5", code: "BB501", title: "Principles of Management", credits: 3, school: "School of Business", branch: "BBA", semester: 5 },
  { id: "c6", code: "DS601", title: "Graphic Design Basics", credits: 4, school: "School of Design", branch: "B.Des", semester: 6 },
  { id: "c7", code: "HS701", title: "Sociology", credits: 3, school: "School of Humanities & Social Sciences", branch: "BA", semester: 7 },
  { id: "c8", code: "AH801", title: "Human Anatomy", credits: 4, school: "School of Allied Health Sciences", branch: "B.Sc Nursing", semester: 8 },
  { id: "c9", code: "CA901", title: "Data Structures", credits: 4, school: "School of Computer Applications", branch: "BCA", semester: 1 },
  { id: "c10", code: "SC1001", title: "Organic Chemistry", credits: 3, school: "School of Sciences", branch: "Chemistry", semester: 2 },
  { id: "c11", code: "CE1101", title: "Structural Analysis", credits: 4, school: "School of Engineering & Technology", branch: "Civil", semester: 3 },
  { id: "c12", code: "LA1201", title: "International Law", credits: 4, school: "School of Law", branch: "LLM", semester: 4 },
  { id: "c13", code: "EE1301", title: "Circuit Theory", credits: 4, school: "School of Engineering & Technology", branch: "Electrical", semester: 5 },
  { id: "c14", code: "BB1401", title: "Marketing Management", credits: 3, school: "School of Business", branch: "MBA", semester: 6 },
  { id: "c15", code: "DS1501", title: "UI/UX Design", credits: 4, school: "School of Design", branch: "M.Des", semester: 7 },
  { id: "c16", code: "HS1601", title: "Psychology", credits: 3, school: "School of Humanities & Social Sciences", branch: "MA", semester: 8 },
  { id: "c17", code: "AH1701", title: "Physiotherapy Basics", credits: 4, school: "School of Allied Health Sciences", branch: "BPT", semester: 1 },
  { id: "c18", code: "CA1801", title: "Algorithms", credits: 4, school: "School of Computer Applications", branch: "MCA", semester: 2 },
  { id: "c19", code: "SC1901", title: "Calculus", credits: 3, school: "School of Sciences", branch: "Mathematics", semester: 3 },
  { id: "c20", code: "CS2001", title: "Object-Oriented Programming", credits: 4, school: "School of Engineering & Technology", branch: "Computer Science", semester: 4 },
  { id: "c21", code: "ME2101", title: "Fluid Mechanics", credits: 4, school: "School of Engineering & Technology", branch: "Mechanical", semester: 5 },
  { id: "c22", code: "PH2201", title: "Classical Mechanics", credits: 3, school: "School of Sciences", branch: "Physics", semester: 6 },
  { id: "c23", code: "LA2301", title: "Criminal Law", credits: 4, school: "School of Law", branch: "LLB", semester: 7 },
  { id: "c24", code: "BB2401", title: "Financial Accounting", credits: 3, school: "School of Business", branch: "BBA", semester: 8 },
  { id: "c25", code: "DS2501", title: "Product Design", credits: 4, school: "School of Design", branch: "B.Des", semester: 1 },
  { id: "c26", code: "HS2601", title: "History", credits: 3, school: "School of Humanities & Social Sciences", branch: "BA", semester: 2 },
  { id: "c27", code: "AH2701", title: "Nursing Practices", credits: 4, school: "School of Allied Health Sciences", branch: "B.Sc Nursing", semester: 3 },
  { id: "c28", code: "CA2801", title: "Database Management", credits: 4, school: "School of Computer Applications", branch: "BCA", semester: 4 },
  { id: "c29", code: "SC2901", title: "Physical Chemistry", credits: 3, school: "School of Sciences", branch: "Chemistry", semester: 5 },
  { id: "c30", code: "CE3001", title: "Geotechnical Engineering", credits: 4, school: "School of Engineering & Technology", branch: "Civil", semester: 6 },
];

const initialSyllabus = initialCourses.map((c) => ({
  id: c.id,
  topics: Array.from({ length: 5 }, (_, i) => `Topic ${i + 1}: Core Concept ${i + 1}`),
  resources: ["Textbook", "Lecture Notes", "Video Tutorial"],
}));

const initialProgress = initialCourses.map((c) => ({
  id: c.id,
  completionRate: Math.floor(Math.random() * 100),
  lastUpdated: new Date(2025, Math.floor(Math.random() * 9), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
}));

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  const [progress, setProgress] = useState(initialProgress);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const rowsPerPage = 5;

  // JECRC Schools and Branches
  const jecrcSchools = ["School of Engineering & Technology", "School of Computer Applications", "School of Business", "School of Design", "School of Humanities & Social Sciences", "School of Allied Health Sciences", "School of Law", "School of Sciences"];
  const jecrcBranches = {
    "School of Engineering & Technology": ["Computer Science", "Mechanical", "Civil", "Electronics", "Electrical"],
    "School of Computer Applications": ["BCA", "MCA"],
    "School of Business": ["BBA", "MBA"],
    "School of Design": ["B.Des", "M.Des"],
    "School of Humanities & Social Sciences": ["BA", "MA"],
    "School of Allied Health Sciences": ["B.Sc Nursing", "BPT"],
    "School of Law": ["LLB", "LLM"],
    "School of Sciences": ["Physics", "Chemistry", "Mathematics"],
  };

  // Chart Data with Fallback
  const [progressTrendData, setProgressTrendData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Average Completion Rate (%)",
        data: [20, 35, 50, 65, 75, 85, 90, 95, 98],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  });

  const filterData = (data) => {
    return data.filter((item) => 
      (selectedSchool ? item.school === selectedSchool : true) &&
      (selectedBranch ? item.branch === selectedBranch : true) &&
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredCourses = filterData(courses);
  const filteredSyllabus = filterData(syllabus);
  const filteredProgress = filterData(progress);

  const pagedCourses = filteredCourses.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedSyllabus = filteredSyllabus.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedProgress = filteredProgress.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredCourses.length / rowsPerPage);

  const handleAddCourse = () => {
    setCourses((prev) => [...prev, { id: Date.now().toString(), code: `CS${Date.now().toString().slice(-3)}`, title: "New Course", credits: 3, school: selectedSchool, branch: selectedBranch, semester: 1 }]);
  };

  const handleUpdateSyllabus = (courseId, topic) => {
    console.log("Updating syllabus for course:", courseId, topic);
  };

  const handleViewCourseDetails = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleExport = () => {
    console.log("Exporting curriculum data to PDF with JECRC branding...");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark-root", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className={`p-6 min-h-screen ${isDarkTheme ? "dark" : ""}`} style={{ backgroundColor: `var(--bg)`, color: `var(--text)` }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
          <h2 className="text-2xl font-semibold" style={{ color: `var(--text)` }}>Curriculum Management</h2>
        </div>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {isDarkTheme ? <Sun size={20} color="var(--text)" /> : <Moon size={20} color="var(--text)" />}
        </button>
      </div>

      {/* School and Branch Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-64 text-black dark:text-white"
          value={selectedSchool}
          onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSelectedBranch("");
          }}
          style={{ color: `var(--text)`, backgroundColor: `var(--card)` }}
        >
          <option value="">All Schools</option>
          {jecrcSchools.map((school) => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
        <select
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-64 text-black dark:text-white"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          disabled={!selectedSchool}
          style={{ color: `var(--text)`, backgroundColor: `var(--card)` }}
        >
          <option value="">All Branches</option>
          {(jecrcBranches[selectedSchool] || []).map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["courses", "syllabus", "progress", "analytics", "videolessons", "voicenotes", "arvisuals", "aicurriculum", "smartrecommend", "interactivesessions", "livefeedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "videolessons" && <Video size={16} />}
            {tab === "voicenotes" && <Mic size={16} />}
            {tab === "arvisuals" && <Scan size={16} />}
            {tab === "aicurriculum" && <Brain size={16} />}
            {tab === "smartrecommend" && <Lightbulb size={16} />}
            {tab === "interactivesessions" && <PlayCircle size={16} />}
            {tab === "livefeedback" && <BookOpen size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Course Details */}
      {modalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative" style={{ backgroundColor: `var(--card)` }}>
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-300">&times;</button>
            <h2 className="text-xl font-bold mb-4" style={{ color: `var(--text)` }}>{selectedCourse.title} - Course Details</h2>
            <p><strong>Code:</strong> {selectedCourse.code}</p>
            <p><strong>Credits:</strong> {selectedCourse.credits}</p>
            <p><strong>School:</strong> {selectedCourse.school}</p>
            <p><strong>Branch:</strong> {selectedCourse.branch}</p>
            <p><strong>Semester:</strong> {selectedCourse.semester}</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2" style={{ color: `var(--text)` }}>Syllabus Topics</h3>
              <ul className="list-disc pl-5">
                {syllabus.find(s => s.id === selectedCourse.id)?.topics.map((topic, i) => (
                  <li key={i} style={{ color: `var(--text)` }}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Courses Section */}
      {activeTab === "courses" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleAddCourse}
            >
              <Plus size={16} className="mr-2" /> Add Course
            </button>
            <input
              type="text"
              placeholder="Search by code or title..."
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-64 text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: `var(--text)`, backgroundColor: `var(--card)` }}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Courses
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 overflow-x-auto" style={{ backgroundColor: `var(--card)` }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Credits</th>
                  <th className="p-2">Semester</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedCourses.length > 0 ? (
                  pagedCourses.map((item) => (
                    <tr key={item.id} className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.school}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.branch}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.code}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.title}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.credits}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.semester}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleUpdateSyllabus(item.id, "topic")}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handleViewCourseDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600 dark:text-gray-300">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredCourses.length)} of {filteredCourses.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Syllabus Section */}
      {activeTab === "syllabus" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by course code or title..."
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-64 text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: `var(--text)`, backgroundColor: `var(--card)` }}
            />
            <button
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Syllabus
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 overflow-x-auto" style={{ backgroundColor: `var(--card)` }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Topics</th>
                  <th className="p-2">Resources</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedSyllabus.length > 0 ? (
                  pagedSyllabus.map((item) => {
                    const course = courses.find(c => c.id === item.id);
                    return (
                      <tr key={item.id} className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.school}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.branch}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.code}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.title}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{item.topics.join(", ")}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{item.resources.join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleUpdateSyllabus(item.id, "topic")}
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No syllabus found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600 dark:text-gray-300">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredSyllabus.length)} of {filteredSyllabus.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Section */}
      {activeTab === "progress" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by course code or title..."
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 w-full md:w-64 text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: `var(--text)`, backgroundColor: `var(--card)` }}
            />
            <button
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Progress
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 overflow-x-auto" style={{ backgroundColor: `var(--card)` }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">School</th>
                  <th className="p-2">Branch</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Completion Rate (%)</th>
                  <th className="p-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {pagedProgress.length > 0 ? (
                  pagedProgress.map((item) => {
                    const course = courses.find(c => c.id === item.id);
                    return (
                      <tr key={item.id} className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.school}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.branch}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.code}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{course?.title}</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{item.completionRate}%</td>
                        <td className="p-2" style={{ color: `var(--text)` }}>{item.lastUpdated}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No progress data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600 dark:text-gray-300">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredProgress.length)} of {filteredProgress.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
            <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
              <Line size={20} className="mr-2" /> Progress Trend (Unique Feature: Predictive Analytics)
            </h3>
            {progressTrendData && progressTrendData.labels && progressTrendData.datasets && progressTrendData.datasets.length > 0 ? (
              <Line data={progressTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            ) : (
              <p style={{ color: `var(--muted)` }}>No data available for chart.</p>
            )}
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progressTrendData && progressTrendData.labels && progressTrendData.datasets && progressTrendData.datasets.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
              <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
                <BarChart size={20} className="mr-2" /> Course Completion Analytics
              </h3>
              <Line data={progressTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
              <p style={{ color: `var(--muted)` }}>No data available for analytics.</p>
            </div>
          )}
        </div>
      )}

      {/* Video Lessons Tab */}
      {activeTab === "videolessons" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Video size={20} className="mr-2" /> Video Lessons (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Access recorded video lessons for each course.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
            onClick={() => console.log("Launching video lesson player")}
          >
            <PlayCircle size={16} className="mr-2" /> Watch Video
          </button>
        </div>
      )}

      {/* Voice Notes Tab */}
      {activeTab === "voicenotes" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Mic size={20} className="mr-2" /> Voice Notes (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Record and listen to audio notes for courses.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Starting voice note recording")}
          >
            <Mic size={16} className="mr-2" /> Record Note
          </button>
        </div>
      )}

      {/* AR Visuals Tab */}
      {activeTab === "arvisuals" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Scan size={20} className="mr-2" /> AR Visuals (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Explore 3D visualizations of course concepts.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Launching AR visualization")}
          >
            <Scan size={16} className="mr-2" /> View AR
          </button>
        </div>
      )}

      {/* AI Curriculum Tab */}
      {activeTab === "aicurriculum" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Brain size={20} className="mr-2" /> AI Curriculum Design (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">AI-generated curriculum adjustments based on student performance.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Running AI curriculum optimization")}
          >
            <Brain size={16} className="mr-2" /> Optimize Curriculum
          </button>
        </div>
      )}

      {/* Smart Recommendations Tab */}
      {activeTab === "smartrecommend" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Lightbulb size={20} className="mr-2" /> Smart Recommendations (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">AI-driven resource recommendations for students.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Generating smart recommendations")}
          >
            <Lightbulb size={16} className="mr-2" /> Get Recommendations
          </button>
        </div>
      )}

      {/* Interactive Sessions Tab */}
      {activeTab === "interactivesessions" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <PlayCircle size={20} className="mr-2" /> Interactive Sessions (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Live interactive sessions with real-time Q&A.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Joining interactive session")}
          >
            <PlayCircle size={16} className="mr-2" /> Join Session
          </button>
        </div>
      )}

      {/* Live Feedback Tab */}
      {activeTab === "livefeedback" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ backgroundColor: `var(--card)` }}>
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <BookOpen size={20} className="mr-2" /> Live Feedback (Unique Feature)
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Real-time feedback collection from students.</p>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center
"
            onClick={() => console.log("Collecting live feedback")}
          >
            <BookOpen size={16} className="mr-2" /> Collect Feedback
          </button>
        </div>
      )}
    </div>
  );
}