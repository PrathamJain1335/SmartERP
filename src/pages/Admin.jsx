import React, { useState } from "react";
import "./admin.css";

// Sample icons (place in public/icons)
const icons = {
  dashboard: "/icons/dashboard.svg",
  faculty: "/icons/faculty.svg",
  students: "/icons/student.svg",
  achievements: "/icons/achievements.svg",
  reports: "/icons/reports.svg",
  examination: "/icons/examination.svg",
  library: "/icons/library.svg",
  fee: "/icons/fee.svg",
  curriculum: "/icons/curriculum.svg",
  communication: "/icons/communication.svg",
  moon: "/icons/moon.svg",
  bell: "/icons/bell.svg",
  chat: "/icons/chat.svg",
  profile: "/icons/profile.svg",
  logout: "/icons/logout.svg",
  arrowLeft: "/icons/angle-left.png",
  arrowRight: "/icons/angle-right.png",
  download: "/icons/download.svg" ,
  user: "/icons/user.png",
  button: "/icons/button.svg"
};

const departments = [
  "Computer Science", "Mathematics", "Physics",
  "Chemistry", "Biology", "Economics",
  "History", "English", "Mechanical", "Electrical"
];

const generateFacultySample = () => {
  let all = [];
  departments.forEach(dep => {
    for (let i = 1; i <= 10; i++) {
      all.push({
        name: `${dep.split(" ")[0]}Faculty${i}`,
        department: dep,
        course: "B.Sc",
        status: ["Active", "Inactive", "Present"][i % 3]
      });
    }
  });
  return all;
};

const allFaculty = generateFacultySample();

const randomPassword = () =>
  Math.random().toString(36).slice(-4) +
  Math.random().toString(36).toUpperCase().slice(-2) +
  Math.floor(Math.random() * 9000 + 1000);

const notificationList = [
  "Faculty member registered.",
  "New course added.",
  "System maintenance at midnight.",
];

export default function Admin() {
  // States
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("Dashboard");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationList);
  const [profileOpen, setProfileOpen] = useState(false);
  const [facultySearch, setFacultySearch] = useState("");
  const [facultyPage, setFacultyPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [attendanceDates, setAttendanceDates] = useState({start: "", end: ""});
  const [userTab, setUserTab] = useState("Student");
  const [userForm, setUserForm] = useState({name: "", reg: ""});
  const [createdUser, setCreatedUser] = useState(null);
  const [showAllFaculty, setShowAllFaculty] = useState(false);

  // For dynamic overview – simulate admin-edited stats; can be stateful, here static for demo
  const dashboardStats = { faculty: 150, students: 76, courses: 25 };

  // Faculty List Filter and Paginate
  const filteredFaculty = allFaculty
    .filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase()));
  const pageSize = 4;
  const paginatedFaculty = filteredFaculty.slice((facultyPage - 1) * pageSize, facultyPage * pageSize);

  // Attendance listing for selected department sample
  let attendanceFaculty = [];
  if (departmentFilter) {
    attendanceFaculty = allFaculty
      .filter(f => f.department === departmentFilter);
  }

  // Logic for user creation
  const handleCreateUser = () => {
    if (!userForm.name || !userForm.reg) return;
    setCreatedUser({
      username: `${userForm.name}.${userForm.reg}`.replace(/\s+/g, "").toLowerCase(),
      password: randomPassword()
    });
    setUserForm({name: "", reg: ""});
  };

  // Handlers
  const handleSidebarClick = (tab) => {
    setSidebarActive(tab);
    if (tab !== "Dashboard") setShowAllFaculty(false);
  };

  return (
    <div className={darkMode ? "admin dark" : "admin"}>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-icons">
          <button className="icon-btn">
            <img src={icons.moon} alt="DarkMode" onClick={() => setDarkMode(dm => !dm)} />
          </button>
          <button className="icon-btn badge-btn" onClick={() => setNotificationOpen(n => !n)}>
            <img src={icons.bell} alt="Notifications" />
            {notifications.length > 0 && (
              <span className="nav-badge">{notifications.length}</span>
            )}
          </button>
          <button className="icon-btn">
            <img src={icons.chat} alt="Chat" />
          </button>
          <button className="icon-btn" onClick={() => setProfileOpen(p => !p)}>
            <img src={icons.profile} alt="Profile" />
          </button>
        </div>
        {/* Profile flyout */}
        {profileOpen && (
          <div className="profile-menu">
            <button>
              <img src={icons.user} alt="Profile" /> Profile
            </button>
            <button onClick={() => window.location.assign("/login")}>
              <img src={icons.logout} alt="Logout" /> Logout
            </button>
          </div>
        )}
        {/* Notification flyout */}
        {notificationOpen && (
          <div className="notification-menu">
            <h4>Notifications</h4>
            {notifications.length === 0 ? (
              <div className="notif-empty">No new notifications</div>
            ) : (notifications.map((n, i) => (
              <div className="notif-item" key={i}>{n}</div>
            )))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="logo-icon" />
          <div className="sidebar-title">Admin<br />Dashboard</div>
        </div>
        {[
          { key: "Dashboard", icon: icons.dashboard },
          { key: "Faculty", icon: icons.faculty },
          { key: "Students", icon: icons.students },
          { key: "Achievements", icon: icons.achievements },
          { key: "Reports", icon: icons.reports },
          { key: "Examination", icon: icons.examination },
          { key: "Library", icon: icons.library },
          { key: "Fee", icon: icons.fee },
          { key: "Curriculum", icon: icons.curriculum },
          { key: "Communication Hub", icon: icons.communication }
        ].map((item, idx) => (
          <button
            key={item.key}
            className={`sidebar-btn${sidebarActive === item.key ? " active" : ""}`}
            onClick={() => handleSidebarClick(item.key)}
          >
            <img src={item.icon} alt="" className="sidebar-icon" />
            {item.key}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Only Dashboard has main content for now */}
        {sidebarActive !== "Dashboard" ? (
          <div className="coming-soon">Coming Soon</div>
        ) : (
          <div className="dashboard">
            {/* Dashboard Overview */}
            <div className="dashboard-overview card">
              <h3>Dashboard Overview</h3>
              <div className="overview-stats">
                <div>
                  <span className="stat-num" id="total-faculty">{dashboardStats.faculty}</span>
                  <div>Total Faculty</div>
                </div>
                <div>
                  <span className="stat-num">{dashboardStats.students}</span>
                  <div>Total Students</div>
                </div>
                <div>
                  <span className="stat-num">{dashboardStats.courses}</span>
                  <div>Total Courses</div>
                </div>
              </div>
            </div>

            {/* Create New User */}
            <div className="create-user card">
              <h3>Create New User</h3>
              <div className="user-tabs">
                <button
                  className={userTab === "Student" ? "active-tab" : ""}
                  onClick={() => setUserTab("Student")}
                >
                  Student
                </button>
                <button
                  className={userTab === "Faculty" ? "active-tab" : ""}
                  onClick={() => setUserTab("Faculty")}
                >
                  Faculty
                </button>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={e => setUserForm({ ...userForm, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Registration No."
                value={userForm.reg}
                onChange={e => setUserForm({ ...userForm, reg: e.target.value })}
              />
              <button className="create-btn" onClick={handleCreateUser}>
                Create User
              </button>
              {createdUser && (
                <div className="user-credentials">
                  <div>
                    <b>Username:</b> {createdUser.username}
                  </div>
                  <div>
                    <b>Password:</b> {createdUser.password}
                  </div>
                </div>
              )}
            </div>

            {/* Faculty List */}
            <div className="faculty-list card">
              <div className="faculty-header">
                <h3>Faculty List</h3>
                <button className="view-all" onClick={() => setShowAllFaculty(true)}>
                  View All
                </button>
              </div>
              <input
                placeholder="Search Faculty..."
                value={facultySearch}
                onChange={e => {
                  setFacultySearch(e.target.value);
                  setFacultyPage(1);
                }}
                className="faculty-search"
              />
              <table className="faculty-table">
                <thead>
                  <tr>
                    <th>Faculty</th>
                    <th>Course</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFaculty.map((f, i) => (
                    <tr key={i}>
                      <td>{f.name}</td>
                      <td>{f.course}</td>
                      <td className={f.status.toLowerCase()}>{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={facultyPage === 1}
                  onClick={() => setFacultyPage(p => p - 1)}
                > <img src={icons.arrowLeft} alt="Prev" /> </button>
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    className={`page-btn${facultyPage === p ? " active" : ""}`}
                    onClick={() => setFacultyPage(p)}
                  >{p}</button>
                ))}
                <button
                  className="page-btn"
                  disabled={facultyPage === 3}
                  onClick={() => setFacultyPage(p => p + 1)}
                > <img src={icons.arrowRight} alt="Next" /> </button>
              </div>
            </div>

            {/* Faculty View All Modal */}
            {showAllFaculty && (
              <div className="modal-overlay" onClick={() => setShowAllFaculty(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <h3>All Faculty Details</h3>
                  <table className="faculty-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFaculty.map((f, i) => (
                        <tr key={i}>
                          <td>{f.name}</td>
                          <td>{f.department}</td>
                          <td>{f.course}</td>
                          <td className={f.status.toLowerCase()}>{f.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => setShowAllFaculty(false)}>Close</button>
                </div>
              </div>
            )}

            {/* Faculty Attendance */}
            <div className="faculty-attendance card">
              <div className="fa-head">
                <h3>Faculty Attendance</h3>
                <span className="manage-link">Manage</span>
              </div>
              {/* Department Dropdown */}
              <select
                value={departmentFilter}
                onChange={e => setDepartmentFilter(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((dep, idx) => (
                  <option key={idx} value={dep}>{dep}</option>
                ))}
              </select>
              {/* Calendar Range */}
              <div className="calendar-range">
                <input
                  type="date"
                  value={attendanceDates.start}
                  onChange={e => setAttendanceDates({ ...attendanceDates, start: e.target.value })}
                />
                <input
                  type="date"
                  value={attendanceDates.end}
                  onChange={e => setAttendanceDates({ ...attendanceDates, end: e.target.value })}
                />
              </div>
              {/* Attendance Summary Table */}
              {departmentFilter && (
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Faculty</th>
                      <th>Status (Sample)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceFaculty.map((f, i) => (
                      <tr key={i}>
                        <td>{f.name}</td>
                        <td>{["Absent", "Present"][i % 2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button className="export-btn">
                <img src={icons.download} alt="Export" className="export-icon" />
                Export Report
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
