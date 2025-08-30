import React, { useState } from 'react';
import './Student.css';

const subjects = ["Subject 01", "Subject 02", "Subject 03", "Subject 04"];
const schedule = [
  { lecture: "Lecture 01", subject: "Subject 01", time: "8:00 AM - 8:50 AM" },
  { lecture: "Lecture 02", subject: "Subject 02", time: "8:50 AM - 9:40 AM" },
  { lecture: "Lecture 03", subject: "Subject 02", time: "9:40 AM - 10:30 AM" },
  { lecture: "Lecture 04", subject: "Subject 02", time: "10:30 AM - 11:20 PM" },
  { lecture: "Lecture 05", subject: "Subject 02", time: "11:20 AM - 12:05 PM" },
  { lecture: "Lecture 06", subject: "Subject 02", time: "12:05 PM - 12:50 PM" }
];
const announcements = [
  "Announcement 01-", "Announcement 01-", "Announcement 01-", "Announcement 01-"
];
const initialAssignments = [
  { subject: "Subject 01", total: 5, completed: 0 },
  { subject: "Subject 02", total: 5, completed: 0 },
  { subject: "Subject 03", total: 5, completed: 0 },
  { subject: "Subject 04", total: 5, completed: 0 }
];
const initialAttendance = {
  "Subject 01": 75, "Subject 02": 75, "Subject 03": 75, "Subject 04": 75
};

function Sidebar({ activeSection, setActiveSection }) {
  const items = [
    { label: 'Dashboard', icon: '🏠', section: 'dashboard' },
    { label: 'Student Details', icon: '🎓', section: 'profile' },
    { label: 'Academics', icon: '📚', section: 'academics' },
    { label: 'Examination', icon: '📝', section: 'examination' },
    { label: 'Fees', icon: '💵', section: 'fees' },
    { label: 'Library', icon: '📖', section: 'library' },
    { label: 'Career', icon: '💼', section: 'career' },
    { label: 'Records', icon: '🗂️', section: 'records' },
    { label: 'Support', icon: '👨‍💻', section: 'support' }
  ];

  return (
    <nav className="sidebar">
      {items.map(item => (
        <div
          key={item.label}
          className={`sidebar-item${activeSection === item.section ? ' active' : ''}`}
          onClick={() => setActiveSection(item.section)}
        >
          <span className="icon">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
}

function PieChart({ percent }) {
  const radius = 36;
  const stroke = 8;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (dashArray * percent / 100);

  return (
    <svg width="80" height="80" className="piechart">
      <circle
        cx="40" cy="40" r={radius}
        stroke="#FBE0D8" strokeWidth={stroke} fill="none"
      />
      <circle
        cx="40" cy="40" r={radius}
        stroke="#FC6C58" strokeWidth={stroke} fill="none"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      <text
        x="50%" y="49%" textAnchor="middle" fontSize="27" fontWeight="bold" fill="#222" dy="0.3em"
      >{percent}%</text>
    </svg>
  );
}

function AttendanceSummary() {
  return (
    <div className="widget attendance-widget">
      <h3 style={{ fontWeight: 600, fontSize: "22px" }}>Attendance Summary</h3>
      <div className="attendance-row">
        <PieChart percent={75} />
        <div className="attendance-list">
          {Object.entries(initialAttendance).map(([subject, percent]) => (
            <div key={subject} className="attendance-item">
              <span className="attendance-subject">{subject}</span>
              <span className="attendance-percent">{percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [clickedSubject, setClickedSubject] = useState(null);

  return (
    <div className="dashboard-root">
      {/* Top Navigation Bar */}
      <header className="top-header">
        <h1><span className="caps-icon">🎓</span> Student Dashboard</h1>
        <div className="top-icons">
          <span>🔔</span>
          <span>💬</span>
          <span
            className="profile-icon"
            onClick={() => setActiveSection('profile')}
            title="Profile"
          >👤</span>
        </div>
      </header>

      {/* Main Content Area: Sidebar + Main Widgets */}
      <div className="main-area">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="main-content">
          {activeSection === 'profile' ? (
            <section className="profile-section">
              <h2>Student Profile</h2>
              <p>Name: John Doe</p>
              <p>Enrollment: 123456</p>
              <p>Department: Computer Science</p>
            </section>
          ) : (
            <section className="dashboard-widgets">
              <div className="widget schedule-widget scrollable">
                <h3 style={{ fontWeight: 600, fontSize: "22px" }}>Today’s Schedule</h3>
                {schedule.map((item, idx) => (
                  <div key={idx} className="schedule-item">
                    <strong>{item.lecture} :</strong> {item.subject} | {item.time}
                  </div>
                ))}
              </div>

              {/* Use AttendanceSummary component here */}
              <AttendanceSummary />

              <div className="widget announcements-widget scrollable">
                <h3 style={{ fontWeight: 600, fontSize: "22px" }}>Announcements</h3>
                {announcements.map((msg, idx) => (
                  <div key={idx}>{msg}</div>
                ))}
              </div>

              <div className="widget assignments-widget scrollable">
                <h3 style={{ fontWeight: 600, fontSize: "22px" }}>Assignments</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Total</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialAssignments.map(assign => (
                      <tr
                        key={assign.subject}
                        className="assignment-row"
                        onClick={() => setClickedSubject(assign.subject)}
                      >
                        <td className="clickable">{assign.subject}</td>
                        <td>{assign.total.toString().padStart(2, '0')}</td>
                        <td>{assign.completed.toString().padStart(2, '0')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {clickedSubject &&
                  <div className="assignment-details">
                    <p>Assignments for <strong>{clickedSubject}</strong></p>
                    <ul>
                      <li>Assignment 1: Pending</li>
                      <li>Assignment 2: Pending</li>
                    </ul>
                    <button onClick={() => setClickedSubject(null)}>Close</button>
                  </div>
                }
              </div>
            </section>
          )}

          <footer className="dashboard-footer">
            <span>ERP support Helpdesk</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
