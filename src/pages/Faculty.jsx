import React, { useState } from "react";
import "./Faculty.css";


function Navbar({ onProfileClick }) {
  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <span className="navbar-logo">
          <span className="sidebar-icon"></span>
          <span className="navbar-title">Faculty Dashboard</span>
        </span>
      </div>
      <div className="navbar-right">
        <span className="icon icon-bell" title="Notifications" ></span>
        <span className="icon icon-chat" title="Messages" ></span>
        <span
          className="icon icon-user"
          
          title="Profile"
          onClick={onProfileClick}
          tabIndex={0}
          role="button"
          aria-label="Profile"
        />
      </div>
    </nav>
  );
}

const testApprovals = [
  { id: 1, type: "Certificate of Merit", student: "Tokir Khan", status: "pending", file: "sample-assignment.pdf" },
  { id: 2, type: "Internship Approval", student: "Pratham", status: "pending", file: "sample-assignment.pdf" }
];
const testCourses = ["Mathematics I", "Physics", "Programming", "Chemistry", "Electronics", "Engineering Graphics"];
const testNotifications = [
  "Upcoming Invigilation Duty",
  "Exam Schedule Changes",
  "Upcoming Faculties Meetings",
  "College Notices"
];
const timeSlots = [
  "8:00 AM - 8:50 AM", "8:50 AM - 9:40 AM", "9:40 AM - 10:30 AM", "10:30 AM - 11:20 AM",
  "11:20 AM - 12:10 PM", "12:10 PM - 1:00 PM", "1:00 PM - 1:50 PM"
];
const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const assignedCells = [
  { row: 0, col: 1, label: "Mathematics I", color: "#cbe4ff" },
  { row: 1, col: 2, label: "Physics", color: "#ffecd0" },
  { row: 2, col: 3, label: "Programming", color: "#ffd2e8" },
  { row: 3, col: 4, label: "Electronics", color: "#d2ffd7" },
  { row: 4, col: 5, label: "Engg Graphics", color: "#f1fdd6" }
];
const sections = ["CS101", "CS102", "CS103", "EE201", "ME202"];
const studentsPerSection = {
  CS101: [{ name: "Amit Sharma", assignment: "Maths Assignment 1.pdf" }],
  CS102: [{ name: "Rahul Verma", assignment: "Physics Assignment.pdf" }],
  CS103: [{ name: "Anuj Choudhary", assignment: "EG Assignment.pdf" }],
  EE201: [{ name: "Maya Agarwal", assignment: "Electronics Assignment.pdf" }],
  ME202: [{ name: "Neha Saini", assignment: "Graphics Assignment.pdf" }]
};

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [approvals, setApprovals] = useState(testApprovals);
  const [approvalModal, setApprovalModal] = useState(false);
  const [currentApproval, setCurrentApproval] = useState(null);
  const [marksModal, setMarksModal] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [marksType, setMarksType] = useState("");
  const [currentStudent, setCurrentStudent] = useState(null);
  const [enteredMarks, setEnteredMarks] = useState("");
  const [markedStudents, setMarkedStudents] = useState({});

  const openApproval = (approval) => { setCurrentApproval(approval); setApprovalModal(true); };
  const closeApproval = () => { setApprovalModal(false); setCurrentApproval(null); };
  const handleApprovalAction = (id, status) => {
    setApprovals(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    closeApproval();
  };

  const openMarksForSection = (section, type) => { setCurrentSection(section); setMarksType(type); setMarksModal(true); setCurrentStudent(null); setEnteredMarks(""); };
  const closeMarksModal = () => { setMarksModal(false); setCurrentSection(""); setCurrentStudent(null); setEnteredMarks(""); };
  const openStudentMarks = (student) => { setCurrentStudent(student); setEnteredMarks(""); };
  const assignMarks = () => {
    setMarkedStudents(s => ({ ...s, [currentSection + "-" + currentStudent.name]: enteredMarks }));
    setCurrentStudent(null); setEnteredMarks("");
  };

  const handleDownloadTimetable = () => {
    let csv = days.join(",") + "\n";
    for (let i = 0; i < timeSlots.length; ++i) {
      let row = [timeSlots[i]];
      for (let j = 1; j < days.length; ++j) {
        let cell = assignedCells.find(c => c.row === i && c.col === j);
        row.push(cell ? cell.label : "");
      }
      csv += row.join(",") + "\n";
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ClassSchedule.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const renderTimetable = () => (
    timeSlots.map((slot, rowIdx) => (
      <tr key={rowIdx}>
        <td className="time-cell">{slot}</td>
        {days.slice(1).map((d, colIdx) => {
          let cellMatch = assignedCells.find(cell => cell.row === rowIdx && cell.col === colIdx + 1);
          let content = cellMatch ? cellMatch.label : "";
          let style = cellMatch ? { background: cellMatch.color } : {};
          return <td key={colIdx} className={cellMatch ? "tt-cell tt-cell-highlight" : "tt-cell"} style={style}>{content}</td>;
        })}
      </tr>
    ))
  );

  const navItems = [
    { key: "dashboard", label: "Dashboard" }, { key: "courses", label: "Courses & Teaching" },
    { key: "timetable", label: "Time Table" }, { key: "evaluation", label: "Evaluation & Result" },
    { key: "documents", label: "Student Documents" }, { key: "assignments", label: "Assignments" },
    { key: "examination", label: "Examination" }, { key: "settings", label: "Profile & Settings" }
  ];

  const renderApprovalModal = () =>
    approvalModal && currentApproval && (
      <div className="modal-overlay" onClick={closeApproval}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3>{currentApproval.type} - {currentApproval.student}</h3>
          <div className="assignment-view-section">
            <embed src={process.env.PUBLIC_URL + "/" + (currentApproval.file || "sample-assignment.pdf")} type="application/pdf" width="100%" height="350px" className="pdf-viewer" />
          </div>
          <button className="approve-btn" onClick={() => handleApprovalAction(currentApproval.id, "approved")}>Approve</button>
          <button className="reject-btn" onClick={() => handleApprovalAction(currentApproval.id, "rejected")}>Reject</button>
          <button className="modal-close-btn" onClick={closeApproval}>Close</button>
        </div>
      </div>
    );

  const renderMarksModal = () =>
    marksModal && currentSection && (
      <div className="modal-overlay" onClick={closeMarksModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3>
            {marksType === "assignment" ? "Assignment" : "In-Sem"} Marks for {currentSection}
          </h3>
          {!currentStudent ? (
            <>
              <div className="student-assignments-list">
                <h4>Select Student</h4>
                <div className="scrollable">
                  {(studentsPerSection[currentSection] || []).map((student) => (
                    <div key={student.name} className="student-row">
                      <span>{student.name}</span>
                      <button className="view-assignment-btn" onClick={() => openStudentMarks(student)}>
                        {marksType === "assignment" ? "View Assignment" : "Enter Marks"}
                      </button>
                      <span className="marks-display">{markedStudents[currentSection + "-" + student.name] ? `Marked: ${markedStudents[currentSection + "-" + student.name]}/64` : "Pending"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {marksType === "assignment" && (
                <div className="assignment-view-section">
                  <embed src={process.env.PUBLIC_URL + "/sample-assignment.pdf"} type="application/pdf" width="100%" height="280px" className="pdf-viewer" />
                </div>
              )}
              <div>
                <label>Marks (out of 64)</label>
                <input type="number" min="0" max="64" value={enteredMarks} onChange={e => setEnteredMarks(e.target.value)} />
              </div>
              <button className="modal-submit-btn" onClick={assignMarks}>Submit Marks</button>
              <button className="modal-close-btn" onClick={() => setCurrentStudent(null)}>Back</button>
            </>
          )}
          <button className="modal-close-btn" onClick={closeMarksModal} style={{ marginTop: "10px" }}>Close</button>
        </div>
      </div>
    );

  const renderSectionContent = () => (
    <>
      <div className="dashboard-top-alerts">
        <div className="top-box highlight"><span>Pending Approvals</span><span>{approvals.filter(a => a.status === "pending").length}</span></div>
        <div className="top-box highlight"><span>Assigned Courses</span><span>{testCourses.length}</span></div>
        <div className="top-box highlight"><span>Notifications</span><span>{testNotifications.length}</span></div>
      </div>
      <section className="class-schedule-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Class Schedule</h2>
          <button className="download-btn" onClick={handleDownloadTimetable}>
            <span className="icon-download"></span> Download
          </button>
        </div>
        <div className="class-schedule-table-container scrollable-x">
          <table className="class-schedule-table">
            <thead>
              <tr>{days.map(day => <th key={day}>{day}</th>)}</tr>
            </thead>
            <tbody>{renderTimetable()}</tbody>
          </table>
        </div>
      </section>
      <div className="dashboard-flex-row">
        <section className="pending-approvals-section">
          <h3>Pending Approvals</h3>
          <div className="approvals-list scrollable">
            {approvals.map(app => (
              <div key={app.id} className={`approval-item ${app.status}`}>
                <span>{app.type} - {app.student}</span>
                {app.status === "pending" ? (
                  <>
                    <button className="approve-btn" onClick={() => openApproval(app)}>Approve</button>
                    <button className="reject-btn" onClick={() => handleApprovalAction(app.id, "rejected")}>Reject</button>
                  </>
                ) : (
                  <span className="approval-status">{app.status.toUpperCase()}</span>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="marks-upload-section">
          <h3>Marks Upload</h3>
          <div className="marks-upload-types">
            <div>
              <span>Upload Internal Marks</span>
              <button className="upload-btn" onClick={() => openMarksForSection(sections[0], "insem")}>Upload</button>
            </div>
            <div>
              <span>Upload Assignment Marks</span>
              <button className="upload-btn" onClick={() => openMarksForSection(sections[0], "assignment")}>Upload</button>
            </div>
          </div>
          <div className="pending-classes-for-marks">Pending Classes for Marks: {sections.length}</div>
          <div className="student-assignments-list">
            <h4>Sections Pending Marks</h4>
            <div className="scrollable">
              {sections.map(section => (
                <div key={section} className="student-row">
                  <span>{section}</span>
                  <button className="view-assignment-btn" onClick={() => openMarksForSection(section, "assignment")}>Assignment</button>
                  <button className="view-assignment-btn" onClick={() => openMarksForSection(section, "insem")}>In-Sem</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="notifications-duties-section">
        <h3>Notification & Duties</h3>
        <ul>{testNotifications.map((n, idx) => <li key={idx}>{n}</li>)}</ul>
      </section>
      <footer className="faculty-footer">
        <span>ERP support Helpdesk</span>
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
      </footer>
    </>
  );

  return (
    <div className="faculty-dashboard-main">
      <Navbar onProfileClick={() => setActiveTab("settings")} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Faculty Dashboard</span>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li
                key={item.key}
                className={activeTab === item.key ? "active" : ""}
                onClick={() => setActiveTab(item.key)}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-support">Support</div>
      </aside>
      <main className="dashboard-content">
        {activeTab === "dashboard" ? renderSectionContent() : <div>Section: {navItems.find(n => n.key === activeTab)?.label} (Coming soon...)</div>}
      </main>
      {renderApprovalModal()}
      {renderMarksModal()}
    </div>
  );
}