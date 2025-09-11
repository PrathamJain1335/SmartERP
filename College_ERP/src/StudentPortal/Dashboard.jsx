import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  AccessTime as AccessTimeIcon,
  Announcement as AnnouncementIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  LibraryBooks as LibraryBooksIcon,
  Work as WorkIcon,
  Grade as GradeIcon,
  Link as LinkIcon,
  Cloud as CloudIcon,
  Upload as UploadIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from "@mui/icons-material";
import { BarChart as BarChartIcon } from '@mui/icons-material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ data, handlers }) {
  const { profile, courses, attendance, assignments, exams, results, notifications } = data;

  // Sample subjects from JECRC University (based on research: B.Tech CSE courses)
  const subjects = [
    { name: "Introduction to Programming", attendance: 85 },
    { id: "sub2", name: "Data Structures", attendance: 92 },
    { id: "sub3", name: "Algorithms", attendance: 78 },
    { id: "sub4", name: "Database Management", attendance: 88 },
    { id: "sub5", name: "Computer Networks", attendance: 95 },
  ];

  // Calculate overall attendance
  const totalClasses = attendance.length;
  const attendedClasses = attendance.filter((a) => a.present).length;
  const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

  // Chart data for overall attendance
  const attendanceChartData = {
    labels: ["Attended", "Missed"],
    datasets: [
      {
        data: [attendancePercentage, 100 - attendancePercentage],
        backgroundColor: ["#dc2626", "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // State for modals
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // State for upload files
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];
    if (file && file.size <= 4 * 1024 * 1024) { // 4 MB limit
      setSelectedFiles((prev) => ({ ...prev, [assignmentId]: file }));
      console.log(`Uploaded file for assignment ${assignmentId}: ${file.name}`);
      // Integrate with handlers if needed, e.g., handlers.submitAssignment(assignmentId);
    } else {
      alert("File size exceeds 4 MB limit.");
    }
  };

  const handleAnnouncementClick = (notif) => {
    setSelectedAnnouncement(notif);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  // Sample schedule with statuses
  const schedule = [
    { id: "class1", subject: "Lecture 01: Advanced Mathematics", time: "8:00 AM - 8:50 AM | Room 201", status: "Ongoing" },
    { id: "class2", subject: "Lecture 02: Physics II", time: "8:50 AM - 9:40 AM | Room 305", status: "Upcoming" },
    { id: "class3", subject: "Lecture 03: Chemistry Fundamentals", time: "9:40 AM - 10:30 AM | Lab A", status: "Upcoming" },
    { id: "class4", subject: "Lecture 04: Data Structures", time: "10:30 AM - 11:20 AM | Room 402", status: "No Class" },
    { id: "class5", subject: "Lecture 05: Algorithms", time: "11:20 AM - 12:05 PM | Room 201", status: "Cancelled" },
    { id: "class6", subject: "Lecture 06: Computer Networks", time: "12:05 PM - 12:50 PM | Room 305", status: "Upcoming" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <CheckCircleIcon className="text-green-600" />;
      case "Upcoming":
        return <HourglassEmptyIcon className="text-blue-600" />;
      case "Cancelled":
        return <CancelIcon className="text-red-600" />;
      case "No Class":
        return <CancelIcon className="text-gray-600" />;
      default:
        return null;
    }
  };

  // Sample assignments with subjects and numbers
  const sampleAssignments = [
    { id: "as1", subject: "Computer Organization Design ", number: 3, title: "Mathematics Assignment 3", dueDate: "2025-09-11", submitted: false },
    { id: "as2", subject: "Data Structure and Algorithm", number: 1, title: "Physics Lab Report", dueDate: "2025-09-14", submitted: false },
    { id: "as3", subject: "Computer Networks", number: 2, title: "Chemistry Problem Set", dueDate: "2025-09-16", submitted: false },
    { id: "as4", subject: "Operating System", number: 4, title: "DS Coding Challenge", dueDate: "2025-09-18", submitted: false },
    { id: "as5", subject: "Software Engineering and Project Management", number: 5, title: "Algorithm Analysis", dueDate: "2025-09-20", submitted: false },
  ];

  return (
    <div className="p-6 bg-[var(--bg)] dark:bg-[var(--bg)] text-[var(--text)] dark:text-[var(--text)] min-h-[calc(100vh-64px)]">
      {/* Modern Welcome Back Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[var(--brand)] to-[var(--active)] dark:from-[var(--brand)] dark:to-[var(--active)] rounded-lg shadow-lg text-white text-center hover:scale-101 transition-transform duration-300 cursor-pointer">
        <h1 className="text-3xl font-bold mb-2">Your Day at a Glance</h1>
        <p className="text-lg">Stay on top of your classes, assignments, and announcements.</p>
        {/* Modern Weather Section */}
        <div className="mt-4 inline-block bg-white/20 dark:bg-white/10 rounded-full px-4 py-2 text-lg font-semibold flex items-center justify-center gap-2">
          <CloudIcon className="text-white" />
          24°C Sunny Day
        </div>
      </div>

      {/* Dashboard Section with 3D Cards */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-6 text-[var(--brand)] dark:text-[var(--brand)]">Dashboard Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Attendance Card */}
          <div
            className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col items-center text-center">
              <BarChartIcon className="text-[var(--brand)] dark:text-[var(--brand)] mb-4" style={{ fontSize: 40 }} />
              <h4 className="text-lg font-semibold text-gray-800">Attendance</h4>
              <div className="relative w-24 h-24 mt-4">
                <Doughnut
                  data={attendanceChartData}
                  options={{
                    responsive: true,
                    cutout: "70%",
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[var(--accent)] dark:text-[var(--accent)]">
                  {attendancePercentage}%
                </div>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]">Overall Attendance</p>
            </div>
          </div>

          {/* Assignments Card */}
          <div
            className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col items-center text-center">
              <AssignmentIcon className="text-[var(--brand)] dark:text-[var(--brand)] mb-4" style={{ fontSize: 40 }} />
              <h4 className="text-lg font-semibold text-gray-800">Assignments</h4>
              <p className="mt-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                {sampleAssignments.filter((a) => !a.submitted).length} Pending
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                {sampleAssignments.length} Total
              </p>
            </div>
          </div>

          {/* Exams Card */}
          <div
            className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col items-center text-center">
              <EventIcon className="text-[var(--brand)] dark:text-[var(--brand)] mb-4" style={{ fontSize: 40 }} />
              <h4 className="text-lg font-semibold text-gray-800">Exams</h4>
              <p className="mt-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                {exams.length} Upcoming
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                Next: {exams[0]?.date || "N/A"}
              </p>
            </div>
          </div>

          {/* Results Card */}
          <div
            className="bg-[var(--card)] dark:bg-[var(--card)] p-6 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:rotate-2 perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col items-center text-center">
              <GradeIcon className="text-[var(--brand)] dark:text-[var(--brand)] mb-4" style={{ fontSize: 40 }} />
              <h4 className="text-lg font-semibold text-gray-800">Results</h4>
              <p className="mt-2 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                {results.length} Available
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
                Latest: {results[0]?.semester || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements with Clickable Modals */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AnnouncementIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" /> Announcements
        </h3>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="mb-3 p-3 bg-[var(--soft)] dark:bg-[var(--soft)] rounded-md hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] cursor-pointer transition-colors"
            onClick={() => handleAnnouncementClick(notif)}
          >
            <p className="font-medium">{notif.title}</p>
            <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">Posted {notif.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Modal for Full Announcement */}
      {modalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-xl shadow-xl w-3/4 max-w-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-[var(--muted)] dark:text-[var(--muted)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]">&times;</button>
            <h2 className="text-xl font-bold mb-4">{selectedAnnouncement.title}</h2>
            <p><strong>Posted:</strong> {selectedAnnouncement.timestamp}</p>
            <p className="mt-2">{selectedAnnouncement.content}</p>
          </div>
        </div>
      )}

      {/* Schedule Section */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Today's Schedule</h3>
        {schedule.map((classItem) => (
          <div
            key={classItem.id}
            className="mb-2 p-2 border-b border-[var(--border)] dark:border-[var(--border)] flex justify-between items-start last:border-0"
          >
            <div className="flex items-start gap-2">
              <AccessTimeIcon className="text-gray-500 dark:text-gray-400 mt-1" />
              <div>
                <p className="font-medium">{classItem.subject}</p>
                <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">{classItem.time}</p>
              </div>
            </div>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${classItem.status === "Ongoing" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" :
                classItem.status === "Upcoming" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" :
                classItem.status === "Cancelled" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" :
                "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300"}
            `}>
              {classItem.status}
            </span>
          </div>
        ))}
      </div>

      {/* Overall Attendance with Circular Chart */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">

        <h4 className="text-md font-medium mb-2">Individual Subject Attendance</h4>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id} className="mb-2 p-2 bg-[var(--soft)] dark:bg-[var(--soft)] rounded-md flex justify-between">
              <span>{subject.name}</span>
              <span className="font-medium">{subject.attendance}%</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pending Assignments */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <div className="flex items-center mb-3">
          <AssignmentIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Pending Assignments</h2>
        </div>
        {sampleAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="mb-3 p-3 bg-[var(--soft)] dark:bg-[var(--soft)] rounded-md hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)]"
          >
            <p className="font-medium">{assignment.subject} Assignment {assignment.number}</p>
            <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
              {assignment.title} - Due in {Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days
            </p>
            <label className="mt-2 px-3 py-1 bg-[var(--brand)] text-white rounded hover:bg-[var(--active)] cursor-pointer flex items-center gap-1 transition-colors">
              <UploadIcon fontSize="small" /> Upload PDF (max 4MB)
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, assignment.id)}
              />
            </label>
            {selectedFiles[assignment.id] && (
              <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)] mt-1">
                Selected: {selectedFiles[assignment.id].name}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Upcoming Exams */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <div className="flex items-center mb-3">
          <EventIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Upcoming Exams</h2>
        </div>
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="mb-3 p-3 bg-[var(--soft)] dark:bg-[var(--soft)] rounded-md hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] cursor-pointer"
          >
            <p className="font-medium">{exam.title} - {exam.course}</p>
            <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Date: {exam.date}</p>
          </div>
        ))}
      </div>

      {/* Library Due Items */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <div className="flex items-center mb-3">
          <LibraryBooksIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Library Due Items</h2>
        </div>
        <p className="text-[var(--muted)] dark:text-[var(--muted)]">No due items currently.</p>
      </div>

      {/* Career Opportunities */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <div className="flex items-center mb-3">
          <WorkIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Career Opportunities</h2>
        </div>
        <p className="text-[var(--muted)] dark:text-[var(--muted)]">No new opportunities at the moment.</p>
      </div>

      {/* Recent Grades */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg">
        <div className="flex items-center mb-3">
          <GradeIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Recent Grades</h2>
        </div>
        {results.map((result) => (
          <div
            key={result.id}
            className="mb-3 p-3 bg-[var(--soft)] dark:bg-[var(--soft)] rounded-md hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] cursor-pointer"
          >
            <p className="font-medium">{result.course}: {result.grade}</p>
            <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">Semester: {result.semester}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-6 p-4 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex items-center mb-3">
          <LinkIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
          <h2 className="text-lg font-semibold">Quick Links</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="text-[var(--accent)] dark:text-[var(--accent)] hover:underline">University Portal</a>
          <a href="#" className="text-[var(--accent)] dark:text-[var(--accent)] hover:underline">Course Registration</a>
          <a href="#" className="text-[var(--accent)] dark:text-[var(--accent)] hover:underline">Fee Payment</a>
          <a href="#" className="text-[var(--accent)] dark:text-[var(--accent)] hover:underline">Library Catalog</a>
        </div>
      </div>
    </div>
  );
}