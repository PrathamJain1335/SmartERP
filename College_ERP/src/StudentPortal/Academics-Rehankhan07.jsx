import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, Calendar, AlertTriangle, BarChart2, PieChart, FileText, Bot, TrendingUp, BookOpen, File, FileType, TimerIcon , Group, LineSquiggleIcon , Microscope, CheckCircle2, School } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
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

// Dummy data based on JECRC University B.Tech CSE Core curriculum research
const jecrcSemesters = [1, 2, 3, 4, 5, 6, 7, 8];

const initialCourses = [
  { id: "c1", semester: 1, code: "CSE101", title: "Introduction to Programming", credits: 4, instructor: "Dr. Priya Sharma", syllabus: "Basics of C/C++, data types, control structures", resources: "Textbook, Lecture Notes, Video Tutorials", grade: "A", attendance: 95 },
  { id: "c2", semester: 1, code: "MAT101", title: "Engineering Mathematics I", credits: 3, instructor: "Prof. Vikram Singh", syllabus: "Calculus, Differential Equations", resources: "Khan Academy Videos, Practice Problems", grade: "B+", attendance: 88 },
  { id: "c3", semester: 2, code: "CSE201", title: "Data Structures", credits: 4, instructor: "Dr. Rajesh Kumar", syllabus: "Arrays, Linked Lists, Stacks, Queues", resources: "GeeksforGeeks Articles, Coding Practice", grade: "A-", attendance: 92 },
  { id: "c4", semester: 2, code: "PHY201", title: "Engineering Physics", credits: 3, instructor: "Dr. Anita Verma", syllabus: "Mechanics, Optics", resources: "Lab Manuals, Simulations", grade: "B", attendance: 85 },
  { id: "c5", semester: 3, code: "CSE301", title: "Algorithms", credits: 4, instructor: "Prof. Suresh Jain", syllabus: "Sorting, Searching, Graph Algorithms", resources: "CLRS Textbook, LeetCode Problems", grade: "A", attendance: 96 },
  // Add more courses up to 30 for all semesters
  { id: "c6", semester: 3, code: "CSE302", title: "Database Management Systems", credits: 4, instructor: "Dr. Neha Gupta", syllabus: "SQL, Normalization", resources: "MySQL Tutorials", grade: "B+", attendance: 90 },
  { id: "c7", semester: 4, code: "CSE401", title: "Operating Systems", credits: 4, instructor: "Prof. Arun Sharma", syllabus: "Processes, Memory Management", resources: "OS Book by Galvin", grade: "A-", attendance: 93 },
  { id: "c8", semester: 4, code: "CSE402", title: "Computer Networks", credits: 4, instructor: "Dr. Priya Singh", syllabus: "TCP/IP, OSI Model", resources: "Cisco Networking Academy", grade: "B", attendance: 87 },
  { id: "c9", semester: 5, code: "CSE501", title: "Software Engineering", credits: 3, instructor: "Prof. Rajesh Kumar", syllabus: "Agile, Waterfall", resources: "UML Diagrams Tools", grade: "A", attendance: 94 },
  { id: "c10", semester: 5, code: "CSE502", title: "Web Technologies", credits: 4, instructor: "Dr. Anita Verma", syllabus: "HTML, CSS, JS", resources: "MDN Web Docs", grade: "B+", attendance: 89 },
  { id: "c11", semester: 6, code: "CSE601", title: "Machine Learning", credits: 4, instructor: "Prof. Suresh Jain", syllabus: "Supervised Learning", resources: "Coursera ML Course", grade: "A-", attendance: 91 },
  { id: "c12", semester: 6, code: "CSE602", title: "Cloud Computing", credits: 3, instructor: "Dr. Neha Gupta", syllabus: "AWS, Azure", resources: "Cloud Provider Docs", grade: "B", attendance: 86 },
  { id: "c13", semester: 7, code: "CSE701", title: "Big Data Analytics", credits: 4, instructor: "Prof. Arun Sharma", syllabus: "Hadoop, Spark", resources: "Apache Docs", grade: "A", attendance: 95 },
  { id: "c14", semester: 7, code: "CSE702", title: "Cyber Security", credits: 3, instructor: "Dr. Priya Singh", syllabus: "Encryption, Firewalls", resources: "OWASP Guide", grade: "B+", attendance: 88 },
  { id: "c15", semester: 8, code: "CSE801", title: "Project Work", credits: 6, instructor: "Prof. Rajesh Kumar", syllabus: "Capstone Project", resources: "GitHub Repos", grade: "A-", attendance: 92 },
  // Continue adding up to 30 courses
  { id: "c16", semester: 1, code: "CHE101", title: "Engineering Chemistry", credits: 3, instructor: "Dr. Anita Verma", syllabus: "Organic Chemistry", resources: "Lab Manuals", grade: "B", attendance: 85 },
  { id: "c17", semester: 1, code: "PHY101", title: "Engineering Physics", credits: 3, instructor: "Prof. Suresh Jain", syllabus: "Mechanics", resources: "Physics Simulations", grade: "A", attendance: 94 },
  { id: "c18", semester: 2, code: "MAT201", title: "Engineering Mathematics II", credits: 3, instructor: "Dr. Neha Gupta", syllabus: "Linear Algebra", resources: "Math Worksheets", grade: "B+", attendance: 89 },
  { id: "c19", semester: 2, code: "CSE202", title: "Object Oriented Programming", credits: 4, instructor: "Prof. Arun Sharma", syllabus: "Java OOP", resources: "Oracle Docs", grade: "A-", attendance: 91 },
  { id: "c20", semester: 3, code: "CSE303", title: "Discrete Mathematics", credits: 3, instructor: "Dr. Priya Singh", syllabus: "Set Theory", resources: "Math Proofs", grade: "B", attendance: 86 },
  { id: "c21", semester: 3, code: "CSE304", title: "Computer Organization", credits: 4, instructor: "Prof. Rajesh Kumar", syllabus: "CPU Architecture", resources: "Patterson Book", grade: "A", attendance: 95 },
  { id: "c22", semester: 4, code: "CSE403", title: "Theory of Computation", credits: 3, instructor: "Dr. Anita Verma", syllabus: "Automata Theory", resources: "Sipser Book", grade: "B+", attendance: 88 },
  { id: "c23", semester: 4, code: "CSE404", title: "Compiler Design", credits: 4, instructor: "Prof. Suresh Jain", syllabus: "Lexical Analysis", resources: "Dragon Book", grade: "A-", attendance: 92 },
  { id: "c24", semester: 5, code: "CSE503", title: "Artificial Intelligence", credits: 4, instructor: "Dr. Neha Gupta", syllabus: "Search Algorithms", resources: "AI Tutorials", grade: "A", attendance: 94 },
  { id: "c25", semester: 5, code: "CSE504", title: "Internet of Things", credits: 3, instructor: "Prof. Arun Sharma", syllabus: "IoT Protocols", resources: "Arduino Projects", grade: "B", attendance: 85 },
  { id: "c26", semester: 6, code: "CSE603", title: "Blockchain Technology", credits: 3, instructor: "Dr. Priya Singh", syllabus: "Cryptocurrency", resources: "Ethereum Docs", grade: "A-", attendance: 91 },
  { id: "c27", semester: 6, code: "CSE604", title: "Cyber Security", credits: 4, instructor: "Prof. Rajesh Kumar", syllabus: "Ethical Hacking", resources: "Kali Linux Tools", grade: "B+", attendance: 89 },
  { id: "c28", semester: 7, code: "CSE703", title: "Deep Learning", credits: 4, instructor: "Dr. Anita Verma", syllabus: "Neural Networks", resources: "TensorFlow Tutorials", grade: "A", attendance: 95 },
  { id: "c29", semester: 7, code: "CSE704", title: "Cloud Computing", credits: 3, instructor: "Prof. Suresh Jain", syllabus: "AWS Services", resources: "AWS Console", grade: "B", attendance: 86 },
  { id: "c30", semester: 8, code: "CSE804", title: "Internship/Project", credits: 6, instructor: "Dr. Neha Gupta", syllabus: "Real-world Application", resources: "Industry Projects", grade: "A-", attendance: 92 },
];

const initialSyllabus = initialCourses.map((c) => ({
  id: c.id,
  topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"], // Sample topics
  resources: ["Textbook", "Lecture Notes", "Video Tutorial", "Online Resource", "Practice Problems"],
}));

const initialGrades = initialCourses.map((c) => ({
  id: c.id,
  grade: c.grade,
  marks: Math.floor(Math.random() * 100) + 1, // Random marks
}));

const initialAttendance = initialCourses.map((c) => ({
  id: c.id,
  attendance: c.attendance,
}));

const initialAssignments = initialCourses.map((c) => ({
  id: c.id,
  assignments: [
    { id: "as1", title: "Assignment 1", dueDate: "2025-09-15", submitted: false },
    { id: "as2", title: "Assignment 2", dueDate: "2025-09-20", submitted: false },
  ],
}));

const initialExams = initialCourses.map((c) => ({
  id: c.id,
  exams: [
    { id: "ex1", title: "Midterm", date: "2025-10-15", time: "10:00 AM" },
    { id: "ex2", title: "Final", date: "2025-12-20", time: "09:00 AM" },
  ],
}));

const initialCertificates = [
  { id: "cert1", title: "Certification in Python", issuedDate: "2025-08-01", issuer: "Coursera" },
  { id: "cert2", title: "Certification in Data Science", issuedDate: "2025-08-15", issuer: "IBM" },
];

const initialCareerResources = [
  { id: "career1", title: "Resume Building Workshop", date: "2025-09-25" },
  { id: "career2", title: "Mock Interview Session", date: "2025-10-05" },
];

const initialProgress = initialCourses.map((c) => ({
  id: c.id,
  completion: Math.floor(Math.random() * 100),
}));

const initialFeedback = initialCourses.map((c) => ({
  id: c.id,
  feedback: "Excellent teaching, clear explanations.",
}));

const initialVirtualLabs = initialCourses.map((c) => ({
  id: c.id,
  labs: ["Lab 1: Programming Basics", "Lab 2: Data Structures"],
}));

const initialRecommendations = initialCourses.map((c) => ({
  id: c.id,
  recommendations: ["Recommended Book: CLRS", "Online Course: Coursera Algorithms"],
}));

export default function Academics() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  const [grades, setGrades] = useState(initialGrades);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [exams, setExams] = useState(initialExams);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [careerResources, setCareerResources] = useState(initialCareerResources);
  const [progress, setProgress] = useState(initialProgress);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [virtualLabs, setVirtualLabs] = useState(initialVirtualLabs);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Advanced Charts Data
  const gradeDistributionData = {
    labels: ["A+", "A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Grades",
        data: [25, 30, 20, 15, 5, 5],
        backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.neutral, jecrcColors.danger, jecrcColors.danger],
      },
    ],
  };

  const performanceTrendData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
    datasets: [
      {
        label: "Average Marks",
        data: [80, 82, 85, 88, 90],
        borderColor: jecrcColors.primary,
        fill: true,
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const aiPredictionData = {
    labels: ["Actual", "Predicted"],
    datasets: [
      {
        label: "Marks",
        data: [85, 92],
        backgroundColor: [jecrcColors.secondary, jecrcColors.accent],
      },
    ],
  };

  // Filters based on semester
  const filterData = (data) => {
    return data.filter((item) => 
      (selectedSemester ? item.semester === Number(selectedSemester) : true) &&
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredCourses = filterData(courses);
  const filteredSyllabus = filterData(syllabus);
  const filteredGrades = filterData(grades);
  const filteredAttendance = filterData(attendance);
  const filteredAssignments = filterData(assignments);
  const filteredExams = filterData(exams);
  const filteredCertificates = filterData(certificates);
  const filteredCareerResources = filterData(careerResources);
  const filteredProgress = filterData(progress);
  const filteredFeedback = filterData(feedback);
  const filteredVirtualLabs = filterData(virtualLabs);
  const filteredRecommendations = filterData(recommendations);

  const pagedCourses = filteredCourses.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedSyllabus = filteredSyllabus.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedGrades = filteredGrades.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedAttendance = filteredAttendance.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedAssignments = filteredAssignments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedExams = filteredExams.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedCertificates = filteredCertificates.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedCareerResources = filteredCareerResources.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedProgress = filteredProgress.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedFeedback = filteredFeedback.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedVirtualLabs = filteredVirtualLabs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedRecommendations = filteredRecommendations.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredCourses.length / rowsPerPage);

  const handleEnrollCourse = (courseId) => {
    console.log("Enrolling in course:", courseId);
  };

  const handleViewSyllabus = (courseId) => {
    console.log("Viewing syllabus for course:", courseId);
  };

  const handleViewCourseDetails = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleSubmitFeedback = (courseId, feedbackText) => {
    console.log("Submitting feedback for course:", courseId, feedbackText);
  };

  const handleAccessLab = (lab) => {
    console.log("Accessing virtual lab:", lab);
  };

  // Stub for export functionality
  const handleExport = () => {
    alert("Export functionality is not implemented yet.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
        <h2 className="text-2xl font-semibold text-blue-900">Academics Management</h2>
      </div>

      {/* Semester Filter */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="bg-white border border-gray-300 rounded p-2 w-full md:w-64"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {jecrcSemesters.map((sem) => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["courses", "syllabus", "grades", "attendance", "assignments", "exams", "certificates", "career", "progress", "feedback", "virtuallabs", "recommendations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "aicurriculum" && <Bot size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Course Details */}
      {modalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-400">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-900">{selectedCourse.title} - Course Details</h2>
            <p><strong>Code:</strong> {selectedCourse.code}</p>
            <p><strong>Credits:</strong> {selectedCourse.credits}</p>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Syllabus:</strong> {selectedCourse.syllabus}</p>
            <p><strong>Resources:</strong> {selectedCourse.resources}</p>
            <p><strong>Grade:</strong> {selectedCourse.grade}</p>
            <p><strong>Attendance:</strong> {selectedCourse.attendance}%</p>
          </div>
        </div>
      )}

      {/* Courses Section */}
      {activeTab === "courses" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Courses
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Credits</th>
                  <th className="p-2">Instructor</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedCourses.length > 0 ? (
                  pagedCourses.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.semester}</td>
                      <td className="p-2">{item.code}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.credits}</td>
                      <td className="p-2">{item.instructor}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleViewCourseDetails(item)}
                        >
                          View Details
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handleEnrollCourse(item.id)}
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredCourses.length)} of {filteredCourses.length} entries
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

      {/* Syllabus Section */}
      {activeTab === "syllabus" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search syllabus..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Syllabus
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
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
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.topics.join(", ")}</td>
                        <td className="p-2">{item.resources.join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewSyllabus(item.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No syllabus found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredSyllabus.length)} of {filteredSyllabus.length} entries
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

      {/* Grades Section */}
      {activeTab === "grades" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search grades..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Grades
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Grade</th>
                  <th className="p-2">Marks</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedGrades.length > 0 ? (
                  pagedGrades.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.grade}</td>
                        <td className="p-2">{item.marks}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No grades found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredGrades.length)} of {filteredGrades.length} entries
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

      {/* Attendance Section */}
      {activeTab === "attendance" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search attendance..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Attendance
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Attendance (%)</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAttendance.length > 0 ? (
                  pagedAttendance.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.attendance}%</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredAttendance.length)} of {filteredAttendance.length} entries
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

      {/* Assignments Section */}
      {activeTab === "assignments" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search assignments..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Assignments
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Assignments</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAssignments.length > 0 ? (
                  pagedAssignments.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.assignments.map((a) => a.title).join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredAssignments.length)} of {filteredAssignments.length} entries
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

      {/* Exams Section */}
      {activeTab === "exams" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search exams..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Exams
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Exams</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedExams.length > 0 ? (
                  pagedExams.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.exams.map((e) => e.title).join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No exams found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredExams.length)} of {filteredExams.length} entries
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

      {/* Certificates Section */}
      {activeTab === "certificates" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search certificates..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Certificates
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Issued Date</th>
                  <th className="p-2">Issuer</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedCertificates.length > 0 ? (
                  pagedCertificates.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.issuedDate}</td>
                      <td className="p-2">{item.issuer}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => console.log("Downloading certificate:", item.id)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredCertificates.length)} of {filteredCertificates.length} entries
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

      {/* Career Section */}
      {activeTab === "career" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search career resources..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Career Resources
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedCareerResources.length > 0 ? (
                  pagedCareerResources.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => console.log("Viewing career resource:", item.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No career resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredCareerResources.length)} of {filteredCareerResources.length} entries
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

      {/* Progress Section */}
      {activeTab === "progress" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search progress..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Progress
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Completion (%)</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedProgress.length > 0 ? (
                  pagedProgress.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.completion}%</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No progress data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredProgress.length)} of {filteredProgress.length} entries
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

      {/* Feedback Section */}
      {activeTab === "feedback" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search feedback..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Feedback
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Feedback</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedFeedback.length > 0 ? (
                  pagedFeedback.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.feedback}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => console.log("Editing feedback for course:", item.id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No feedback found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredFeedback.length)} of {filteredFeedback.length} entries
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

      {/* Virtual Labs Section */}
      {activeTab === "virtuallabs" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search virtual labs..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Labs
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Labs</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedVirtualLabs.length > 0 ? (
                  pagedVirtualLabs.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.labs.join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleAccessLab(item.labs[0])}
                          >
                            Access
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No virtual labs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredVirtualLabs.length)} of {filteredVirtualLabs.length} entries
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

      {/* Recommendations Section */}
      {activeTab === "recommendations" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search recommendations..."
              className="bg-white border rounded p-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Recommendations
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-2">Semester</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Recommendations</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedRecommendations.length > 0 ? (
                  pagedRecommendations.map((item) => {
                    const course = courses.find((c) => c.id === item.id);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{course?.semester}</td>
                        <td className="p-2">{course?.code}</td>
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2">{item.recommendations.join(", ")}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleViewCourseDetails(course)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No recommendations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredRecommendations.length)} of {filteredRecommendations.length} entries
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <PieChart size={20} className="mr-2 text-blue-900" /> Grade Distribution
            </h3>
            <Pie data={gradeDistributionData} options={{ plugins: { zoom: { zoom: { mode: 'xy' } } } }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Line size={20} className="mr-2 text-blue-900" /> Performance Trend
            </h3>
            <Line data={performanceTrendData} options={{ plugins: { zoom: { zoom: { mode: 'x' } }, filler: { propagate: true } } }} />
          </div>
        </div>
      )}

      {/* AI Predictions Tab */}
      {activeTab === "aipredictions" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Bot size={20} className="mr-2 text-blue-900" /> AI Performance Predictions
          </h3>
          <p className="text-gray-600 mb-4">AI-driven predictions for your academic performance.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-2">Predicted vs Actual Marks</h4>
              <Bar data={aiPredictionData} options={{ plugins: { zoom: { zoom: { mode: 'y' } } } }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}