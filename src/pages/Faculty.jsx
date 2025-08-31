import React, { useState } from "react";
import "./faculty.css";

const testApprovals = [
  { id: 1, type: "Certificate of Merit", student: "Tokir Khan", status: "pending" },
  { id: 2, type: "Internship Approval", student: "Pratham", status: "pending" },
  { id: 3, type: "Certificate of Merit", student: "Tokir Khan", status: "pending" },
  { id: 4, type: "Certificate of Merit", student: "Tokir Khan", status: "pending" },
  { id: 5, type: "Certificate of Merit", student: "Tokir Khan", status: "pending" }
];

const testAssignedCourses = [
  "Mathematics I",
  "Physics",
  "Programming",
  "Chemistry",
  "Electronics",
  "Engineering Graphics"
];

const testNotifications = [
  "Upcoming Invigilation Duty",
  "Exam Schedule Changes",
  "Upcoming Faculties Meetings"
];

const testTimeTable = [
  // Each entry: [row, col, label, color]
  { row: 1, col: 2, label: "Maths I", color: "#cbe4ff" },
  { row: 2, col: 3, label: "Physics", color: "#ffecd0" },
  { row: 3, col: 4, label: "Programming", color: "#ffd2e8" },
  { row: 4, col: 5, label: "Electronics", color: "#d2ffd7" }
  // Add more for demo
];

const timeSlots = [
  "8:00 AM - 8:50 AM",
  "8:50 AM - 9:40 AM",
  "9:40 AM - 10:30 AM",
  "10:30 AM - 11:20 AM",
  "11:20 AM - 12:10 PM",
  "12:10 PM - 1:00 PM",
  "1:00 PM - 1:50 PM"
];

const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const testStudents = [
  { name: "Amit Sharma", assignment: "Maths Assignment 1.pdf", marks: null },
  { name: "Rekha Singh", assignment: "Maths Assignment 1.pdf", marks: null },
  { name: "Rahul Verma", assignment: "Maths Assignment 1.pdf", marks: null }
];

export default function FacultyDashboard() {
  const [approvals, setApprovals] = useState(testApprovals);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [enteredMarks, setEnteredMarks] = useState("");
  const [marksList, setMarksList] = useState(testStudents);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser === "faculty" && loginPass === "faculty123") setLoggedIn(true);
    else alert("Invalid credentials. Try username: faculty, password: faculty123");
  };

  // Approval handlers
  const handleApproval = (id, action) => {
    setApprovals(prev =>
      prev.map(appr =>
        appr.id === id ? { ...appr, status: action } : appr
      )
    );
  };

  // Assignment modal handler
  const handleViewAssignment = (student) => {
    setSelectedStudent(student);
    setShowAssignmentModal(true);
    setEnteredMarks("");
  };

  const handleModalClose = () => {
    setShowAssignmentModal(false);
    setSelectedStudent(null);
  };

  const handleMarksSubmit = () => {
    setMarksList(list =>
      list.map(s =>
        s.name === selectedStudent.name ? { ...s, marks: enteredMarks } : s
      )
    );
    handleModalClose();
  };

  // Table cell builder
  const renderTimeTable = () => {
    let rows = [];
    for (let i = 0; i < timeSlots.length; ++i) {
      let cells = [<td className="time-cell" key={0}>{timeSlots[i]}</td>];
      for (let j = 1; j < days.length; ++j) {
        // Find assignment for cell
        let cellClass = "tt-cell";
        let cellStyle = {};
        let entry = testTimeTable.find(tt => tt.row === i && tt.col === j);
        let label = entry ? entry.label : "";
        if (entry) {
          cellClass += " tt-cell-highlight";
          cellStyle.background = entry.color;
        }
        cells.push(
          <td key={j} className={cellClass} style={cellStyle}>
            {label}
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };

  if (!loggedIn) {
    // Login page, to be merged with main app login flow
    return (
      <div className="faculty-login-container">
        <form className="faculty-login-box" onSubmit={handleLogin}>
          <h2>Faculty Portal Login</h2>
          <div>
            <label>Username</label>
            <input type="text" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
          <p>Test credentials: username = <b>faculty</b>, password = <b>faculty123</b></p>
        </form>
      </div>
    );
  }

  return (
    <div className="faculty-dashboard-main">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-icon">{/* SVG icon like in UI */}</span>
          <span className="sidebar-title">Faculty Dashboard</span>
        </div>
        <nav>
          <ul>
            <li className="active">
              <span className="nav-icon home"></span> Dashboard
            </li>
            <li tabIndex={0}>
              <span className="nav-icon courses"></span> Courses & Teaching
            </li>
            <li tabIndex={0}>
              <span className="nav-icon timetable"></span> Time Table
            </li>
            <li tabIndex={0}>
              <span className="nav-icon evaluation"></span> Evaluation & Result
            </li>
            <li tabIndex={0}>
              <span className="nav-icon documents"></span> Student Documents
            </li>
            <li tabIndex={0}>
              <span className="nav-icon assignments"></span> Assignments
            </li>
            <li tabIndex={0}>
              <span className="nav-icon examination"></span> Examination
            </li>
            <li tabIndex={0}>
              <span className="nav-icon settings"></span> Profile & Settings
            </li>
          </ul>
        </nav>
        <div className="sidebar-support">Support</div>
      </aside>
      <main className="dashboard-content">
        {/* Top alerts */}
        <div className="dashboard-top-alerts">
          <div className="top-box highlight">
            <span>Pending Approvals</span>
            <span>{approvals.filter(a => a.status === "pending").length}</span>
          </div>
          <div className="top-box highlight">
            <span>Assigned Courses</span>
            <span>{testAssignedCourses.length}</span>
          </div>
          <div className="top-box highlight">
            <span>Notifications</span>
            <span>{testNotifications.length}</span>
          </div>
        </div>
        {/* Timetable Section */}
        <section className="class-schedule-section">
          <h2>Class Schedule</h2>
          <div className="class-schedule-table-container">
            <table className="class-schedule-table">
              <thead>
                <tr>
                  {days.map(day =>
                    <th key={day}>{day}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {renderTimeTable()}
              </tbody>
            </table>
          </div>
        </section>
        {/* Approval & Marks Upload */}
        <div className="dashboard-flex-row">
          {/* Pending Approvals */}
          <section className="pending-approvals-section">
            <h3>Pending Approvals</h3>
            <div className="approvals-list scrollable">
              {approvals.map(appr => (
                <div key={appr.id} className={`approval-item ${appr.status}`}>
                  <span>{appr.type} - {appr.student}</span>
                  {appr.status === "pending" ? (
                    <>
                      <button className="approve-btn" onClick={() => handleApproval(appr.id, "approved")}>Approve</button>
                      <button className="reject-btn" onClick={() => handleApproval(appr.id, "rejected")}>Reject</button>
                    </>
                  ) : (
                    <span className="approval-status">{appr.status.toUpperCase()}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
          {/* Marks Upload */}
          <section className="marks-upload-section">
            <h3>Marks Upload</h3>
            <div className="marks-upload-types">
              <div>
                <span>Upload Internal Marks</span>
                <button className="upload-btn">Upload</button>
              </div>
              <div>
                <span>Upload Assignment Marks</span>
                <button className="upload-btn">Upload</button>
              </div>
            </div>
            <div className="pending-classes-for-marks">Pending Classes for Marks: 3</div>
            {/* List students for Assignment marks */}
            <div className="student-assignments-list">
              <h4>Assignment Marks Pending</h4>
              <div className="scrollable">
                {marksList.map(stu =>
                  <div key={stu.name} className="student-row">
                    <span>{stu.name}</span>
                    <button className="view-assignment-btn" onClick={() => handleViewAssignment(stu)}>
                      View Assignment
                    </button>
                    <span className="marks-display">{stu.marks !== null ? `Marked: ${stu.marks}/64` : "Pending"}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Modal for Assignment Viewing */}
            {showAssignmentModal && selectedStudent && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Assignment: {selectedStudent.assignment}</h3>
                  <div className="assignment-view-section">
                    <embed src="/test-files/sample-assignment.pdf" type="application/pdf" className="pdf-viewer" width="100%" height="350px" />
                  </div>
                  <div>
                    <label>Marks (out of 64)</label>
                    <input type="number" min="0" max="64" value={enteredMarks}
                      onChange={e => setEnteredMarks(e.target.value)} />
                  </div>
                  <button className="modal-submit-btn" onClick={handleMarksSubmit}>Submit Marks</button>
                  <button className="modal-close-btn" onClick={handleModalClose}>Close</button>
                </div>
              </div>
            )}
          </section>
        </div>
        {/* Notification & Duties */}
        <section className="notifications-duties-section">
          <h3>Notification & Duties</h3>
          <ul>
            <li>Upcoming Invigilation Duty</li>
            <li>Exam Schedule Changes</li>
            <li>Upcoming Faculties Meetings</li>
            <li>College Notices</li>
          </ul>
        </section>
        {/* Footer */}
        <footer className="faculty-footer">
          <span>ERP support Helpdesk</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </footer>
      </main>
      {/* Top-right icons (bell, chat, user) */}
      <div className="dashboard-top-icons">
        <span className="icon-bell"></span>
        <span className="icon-chat"></span>
        <span className="icon-user"></span>
      </div>
    </div>
  );
}
