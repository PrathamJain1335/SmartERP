import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Upload, Edit, Download, Plus, Search, Bell, FileText, Users, Bot, Moon, Sun } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, zoomPlugin);

// JECRC University branding colors
const jecrcColors = {
  primary: "#1E3A8A",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
};

// JECRC University schools
const jecrcSchools = [
  "School of Engineering & Technology",
  "School of Computer Applications",
  "School of Business",
  "School of Design",
  "School of Humanities & Social Sciences",
  "School of Allied Health Sciences",
  "School of Law",
  "School of Sciences",
];

// JECRC University branches
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

// Dummy notifications data
const initialNotifications = [
  { id: "n1", title: "Dean Meeting", content: "Meeting for all Deans on Sept 15.", audience: "Dean", date: "2025-09-10", readRate: 80, pdf: null },
  { id: "n2", title: "HOD Update", content: "HODs to submit reports by end of month.", audience: "HOD", date: "2025-09-12", readRate: 65, pdf: null },
  { id: "n3", title: "Department Notice", content: "Computer Science department event.", audience: "Department", school: "School of Engineering & Technology", branch: "Computer Science", date: "2025-09-14", readRate: 90, pdf: null },
  { id: "n4", title: "Student Alert", content: "Exam schedule released.", audience: "Student", date: "2025-09-16", readRate: 95, pdf: null },
  { id: "n5", title: "Faculty Reminder", content: "Submit attendance records.", audience: "Faculty", date: "2025-09-18", readRate: 70, pdf: null },
  { id: "n6", title: "Common Message", content: "University holiday on Sept 20.", audience: "Common", date: "2025-09-19", readRate: 100, pdf: null },
  { id: "n7", title: "Dean Conference", content: "Conference call for Deans.", audience: "Dean", date: "2025-09-21", readRate: 85, pdf: null },
  { id: "n8", title: "HOD Training", content: "Training session for HODs.", audience: "HOD", date: "2025-09-22", readRate: 75, pdf: null },
  { id: "n9", title: "Department Seminar", content: "Seminar in Mechanical branch.", audience: "Department", school: "School of Engineering & Technology", branch: "Mechanical", date: "2025-09-23", readRate: 80, pdf: null },
  { id: "n10", title: "Student Workshop", content: "Workshop for BBA students.", audience: "Student", school: "School of Business", branch: "BBA", date: "2025-09-24", readRate: 90, pdf: null },
  { id: "n11", title: "Faculty Development", content: "Development program for faculty.", audience: "Faculty", date: "2025-09-25", readRate: 65, pdf: null },
  { id: "n12", title: "Common Holiday Notice", content: "Holiday on Sept 26.", audience: "Common", date: "2025-09-26", readRate: 100, pdf: null },
  { id: "n13", title: "Dean Review", content: "Annual review for Deans.", audience: "Dean", date: "2025-09-27", readRate: 80, pdf: null },
  { id: "n14", title: "HOD Meeting", content: "Monthly HOD meeting.", audience: "HOD", date: "2025-09-28", readRate: 70, pdf: null },
  { id: "n15", title: "Department Event", content: "Event in Civil branch.", audience: "Department", school: "School of Engineering & Technology", branch: "Civil", date: "2025-09-29", readRate: 85, pdf: null },
  { id: "n16", title: "Student Orientation", content: "Orientation for new students.", audience: "Student", date: "2025-09-30", readRate: 95, pdf: null },
  { id: "n17", title: "Faculty Seminar", content: "Seminar for Physics faculty.", audience: "Faculty", school: "School of Sciences", branch: "Physics", date: "2025-10-01", readRate: 75, pdf: null },
  { id: "n18", title: "Common Announcement", content: "University announcement.", audience: "Common", date: "2025-10-02", readRate: 100, pdf: null },
  { id: "n19", title: "Dean Workshop", content: "Workshop for Deans.", audience: "Dean", date: "2025-10-03", readRate: 80, pdf: null },
  { id: "n20", title: "HOD Conference", content: "Conference for HODs.", audience: "HOD", date: "2025-10-04", readRate: 70, pdf: null },
  { id: "n21", title: "Department Training", content: "Training in Electronics branch.", audience: "Department", school: "School of Engineering & Technology", branch: "Electronics", date: "2025-10-05", readRate: 85, pdf: null },
  { id: "n22", title: "Student Event", content: "Event for MCA students.", audience: "Student", school: "School of Computer Applications", branch: "MCA", date: "2025-10-06", readRate: 90, pdf: null },
  { id: "n23", title: "Faculty Meeting", content: "Meeting for Chemistry faculty.", audience: "Faculty", school: "School of Sciences", branch: "Chemistry", date: "2025-10-07", readRate: 75, pdf: null },
  { id: "n24", title: "Common Update", content: "University update.", audience: "Common", date: "2025-10-08", readRate: 100, pdf: null },
  { id: "n25", title: "Dean Seminar", content: "Seminar for Deans.", audience: "Dean", date: "2025-10-09", readRate: 80, pdf: null },
  { id: "n26", title: "HOD Workshop", content: "Workshop for HODs.", audience: "HOD", date: "2025-10-10", readRate: 70, pdf: null },
  { id: "n27", title: "Department Conference", content: "Conference in Electrical branch.", audience: "Department", school: "School of Engineering & Technology", branch: "Electrical", date: "2025-10-11", readRate: 85, pdf: null },
  { id: "n28", title: "Student Training", content: "Training for BPT students.", audience: "Student", school: "School of Allied Health Sciences", branch: "BPT", date: "2025-10-12", readRate: 90, pdf: null },
  { id: "n29", title: "Faculty Event", content: "Event for Mathematics faculty.", audience: "Faculty", school: "School of Sciences", branch: "Mathematics", date: "2025-10-13", readRate: 75, pdf: null },
  { id: "n30", title: "Common Notice", content: "University notice.", audience: "Common", date: "2025-10-14", readRate: 100, pdf: null },
];


// Initial scheduled notifications
const initialScheduledNotifications = initialNotifications.slice(0, 10).map((n) => ({ ...n, scheduledDate: n.date }));

export default function CommunicationHub() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [scheduledNotifications, setScheduledNotifications] = useState(initialScheduledNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const rowsPerPage = 5;

  const [readRateData, setReadRateData] = useState({
  labels: ["Dean", "HOD", "Department", "Student", "Faculty", "Common"],
  datasets: [{
    label: "Read Rate (%)",
    data: [80, 65, 90, 95, 70, 100],
    backgroundColor: jecrcColors.primary,
  }],
});

const [notificationTypeDistributionData, setNotificationTypeDistributionData] = useState({
  labels: ["Dean", "HOD", "Department", "Student", "Faculty", "Common"],
  datasets: [{
    label: "Notifications", 
    data: [5, 5, 5, 5, 5, 5],
    backgroundColor: [jecrcColors.primary, jecrcColors.secondary, jecrcColors.accent, jecrcColors.danger, jecrcColors.neutral || "#6B7280", jecrcColors.primary],
  }],
});

  const filterData = (data) => {
    return data.filter((item) => 
      (selectedSchool ? item.school === selectedSchool : true) &&
      (selectedBranch ? item.branch === selectedBranch : true) &&
      (searchTerm ? Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())) : true)
    );
  };

  const filteredNotifications = filterData(notifications);
  const filteredScheduledNotifications = filterData(scheduledNotifications);

  const pagedNotifications = filteredNotifications.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedScheduledNotifications = filteredScheduledNotifications.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const maxPage = Math.ceil(filteredNotifications.length / rowsPerPage);

  const handleCreateNotification = () => {
    setNotifications((prev) => [...prev, { id: Date.now().toString(), title: "New Notification", content: "Enter content here.", audience: "Common", date: new Date().toISOString().split("T")[0], readRate: 0, pdf: null }]);
  };

  const handleUploadPDF = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploading PDF:", file.name);
      setNotifications((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].pdf = file.name;
        return updated;
      });
    }
  };

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };

  const handleExport = () => {
    console.log("Exporting notifications to PDF with JECRC branding...");
  };

  const handleGenerateMessage = () => {
    console.log("AI generating notification content...");
  };

  const handleAnalyzeSentiment = () => {
    console.log("AI analyzing message sentiment...");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark-root", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className={`p-6 min-h-screen ${isDarkTheme ? "dark" : ""}`} style={{ backgroundColor: `var(--bg)`, color: `var(--text)` }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="/image.png" alt="JECRC University Logo" className="w-20 h-8 mr-4" />
          <h2 className="text-2xl font-semibold" style={{ color: `var(--text)` }}>Communication Hub</h2>
        </div>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="p-2 rounded-full bg-[var(--hover)] dark:bg-[var(--hover)] flex items-center justify-center"
        >
          {isDarkTheme ? <Sun size={20} color="var(--text)" /> : <Moon size={20} color="var(--text)" />}
        </button>
      </div>

      {/* School and Branch Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 w-full md:w-64 text-[var(--text)]"
          value={selectedSchool}
          onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSelectedBranch("");
          }}
        >
          <option value="">All Schools</option>
          {jecrcSchools.map((school) => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
        <select
          className="bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 w-full md:w-64 text-[var(--text)]"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          disabled={!selectedSchool}
        >
          <option value="">All Branches</option>
          {(jecrcBranches[selectedSchool] || []).map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["dashboard", "create", "scheduled", "analytics", "archive", "aigenerator", "sentimentalysis", "bulkimport", "realtimepush", "roleaccess"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-[var(--brand)] text-white" : "bg-[var(--card)] dark:bg-[var(--card)] text-[var(--text)] dark:text-[var(--muted)] hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)]"} whitespace-nowrap flex items-center gap-2`}
          >
            {tab === "aigenerator" && <Bot size={16} />}
            {tab === "sentimentalysis" && <Bot size={16} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Modal for Notification Details */}
      {modalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-xl shadow-xl w-3/4 max-w-4xl p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-[var(--muted)] dark:text-[var(--muted)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]">&times;</button>
            <h2 className="text-xl font-bold mb-4" style={{ color: `var(--text)` }}>{selectedNotification.title}</h2>
            <p><strong>Audience:</strong> {selectedNotification.audience}</p>
            <p><strong>Date:</strong> {selectedNotification.date}</p>
            <p><strong>Content:</strong> {selectedNotification.content}</p>
            {selectedNotification.pdf && <p><strong>PDF:</strong> {selectedNotification.pdf}</p>}
          </div>
        </div>
      )}

      {/* Dashboard Section */}
      {activeTab === "dashboard" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search notifications..."
              className="bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 w-full md:w-64 text-[var(--text)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Notifications
            </button>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--brand)] text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Audience</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Read Rate (%)</th>
                  <th className="p-2">PDF</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedNotifications.length > 0 ? (
                  pagedNotifications.map((item) => (
                    <tr key={item.id} className="border border-[var(--border)] dark:border-[var(--border)] hover:bg-[var(--soft)] dark:hover:bg-[var(--soft)]">
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.title}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.audience}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.date}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.readRate}%</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.pdf ? "Yes" : "No"}</td>
                      <td className="p-2">
                        <button
                          className="text-[var(--accent)] hover:underline mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => handleViewNotification(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-[var(--muted)] dark:text-[var(--muted)]">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredNotifications.length)} of {filteredNotifications.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Notification Section */}
      {activeTab === "create" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4" style={{ color: `var(--text)` }}>Create Notification</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 text-[var(--text)]"
            />
            <textarea
              placeholder="Content"
              className="w-full bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 text-[var(--text)]"
            />
            <select
              className="w-full bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 text-[var(--text)]"
            >
              <option>Audience: Dean</option>
              <option>HOD</option>
              <option>Department</option>
              <option>Student</option>
              <option>Faculty</option>
              <option>Common</option>
            </select>
            <label className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] cursor-pointer flex items-center">
              <Upload size={16} className="mr-2" />
              Upload PDF
              <input type="file" className="hidden" onChange={handleUploadPDF} accept=".pdf" />
            </label>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={handleCreateNotification}
            >
              <Plus size={16} className="mr-2" /> Send Notification
            </button>
          </form>
        </div>
      )}

      {/* Scheduled Notifications Section */}
      {activeTab === "scheduled" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search scheduled notifications..."
              className="bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 w-full md:w-64 text-[var(--text)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Scheduled Notifications
            </button>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--brand)] text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Audience</th>
                  <th className="p-2">Scheduled Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedScheduledNotifications.length > 0 ? (
                  pagedScheduledNotifications.map((item) => (
                    <tr key={item.id} className="border border-[var(--border)] dark:border-[var(--border)] hover:bg-[var(--soft)] dark:hover:bg-[var(--soft)]">
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.title}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.audience}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.scheduledDate}</td>
                      <td className="p-2">
                        <button
                          className="text-[var(--accent)] hover:underline mr-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No scheduled notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-[var(--muted)] dark:text-[var(--muted)]">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredScheduledNotifications.length)} of {filteredScheduledNotifications.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
              <Bar size={20} className="mr-2" /> Read Rate by Audience
            </h3>
            {readRateData && readRateData.labels && readRateData.datasets && (
              <Bar
                data={readRateData}
                options={{
                  plugins: {
                    zoom: {
                      zoom: {
                        mode: "x",
                      },
                    },
                  },
                }}
              />
            )}

            {notificationTypeDistributionData && notificationTypeDistributionData.labels && notificationTypeDistributionData.datasets && (
              <Pie
                data={notificationTypeDistributionData}
                options={{
                  plugins: {
                    zoom: {
                      zoom: {
                        mode: "xy",
                      },
                    },
                  },
                }}
              />
            )}


          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
              <Pie size={20} className="mr-2" /> Notification Type Distribution
            </h3>
            {notificationTypeDistributionData && notificationTypeDistributionData.labels && notificationTypeDistributionData.datasets && (
              <Pie
                data={notificationTypeDistributionData}
                options={{
                  plugins: {
                    zoom: {
                      zoom: {
                        mode: "xy",
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Archive Section */}
      {activeTab === "archive" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search archived notifications..."
              className="bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 w-full md:w-64 text-[var(--text)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
              onClick={handleExport}
            >
              <Download size={16} className="mr-2" /> Export Archive
            </button>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--brand)] text-white">
                  <th className="p-2">Title</th>
                  <th className="p-2">Audience</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedNotifications.length > 0 ? (
                  pagedNotifications.map((item) => (
                    <tr key={item.id} className="border border-[var(--border)] dark:border-[var(--border)] hover:bg-[var(--soft)] dark:hover:bg-[var(--soft)]">
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.title}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.audience}</td>
                      <td className="p-2" style={{ color: `var(--text)` }}>{item.date}</td>
                      <td className="p-2">
                        <button
                          className="text-[var(--accent)] hover:underline"
                          onClick={() => handleViewNotification(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center" style={{ color: `var(--muted)` }}>
                      No archived notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4 text-[var(--muted)] dark:text-[var(--muted)]">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredNotifications.length)} of {filteredNotifications.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} color="var(--text)" />
              </button>
              <span style={{ color: `var(--text)` }}>{page}</span>
              <button
                disabled={page === maxPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 bg-[var(--card)] dark:bg-[var(--card)] rounded disabled:opacity-50"
              >
                <ChevronRight size={16} color="var(--text)" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Generator Tab */}
      {activeTab === "aigenerator" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Bot size={20} className="mr-2" /> AI Notification Generator (Unique Feature)
          </h3>
          <p className="text-[var(--muted)] dark:text-[var(--muted)] mb-4">Generate professional notification content using AI.</p>
          <textarea
            placeholder="Describe the notification topic..."
            className="w-full bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 text-[var(--text)] mb-4"
          />
          <button
            className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
            onClick={handleGenerateMessage}
          >
            <Bot size={16} className="mr-2" /> Generate Content
          </button>
        </div>
      )}

      {/* Sentiment Analysis Tab */}
      {activeTab === "sentimentalysis" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: `var(--text)` }}>
            <Bot size={20} className="mr-2" /> AI Sentiment Analysis (Unique Feature)
          </h3>
          <p className="text-[var(--muted)] dark:text-[var(--muted)] mb-4">Analyze the tone of messages for better communication.</p>
          <textarea
            placeholder="Paste message content here..."
            className="w-full bg-[var(--card)] dark:bg-[var(--card)] border border-[var(--border)] dark:border-[var(--border)] rounded p-2 text-[var(--text)] mb-4"
          />
          <button
            className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
            onClick={handleAnalyzeSentiment}
          >
            <Bot size={16} className="mr-2" /> Analyze Sentiment
          </button>
        </div>
      )}

      {/* Bulk Import Section */}
      {activeTab === "bulkimport" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4" style={{ color: `var(--text)` }}>Bulk Notification Import</h3>
          <label className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] cursor-pointer flex items-center mb-4">
            <Upload size={16} className="mr-2" />
            Upload CSV for Bulk Import
            <input type="file" className="hidden" accept=".csv" />
          </label>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            onClick={() => console.log("Importing bulk notifications")}
          >
            <Plus size={16} className="mr-2" /> Import Notifications
          </button>
        </div>
      )}

      {/* Real-Time Push Section */}
      {activeTab === "realtimepush" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4" style={{ color: `var(--text)` }}>Real-Time Push Notifications</h3>
          <p className="text-[var(--muted)] dark:text-[var(--muted)] mb-4">Send instant push notifications to selected audiences.</p>
          <button
            className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
            onClick={() => console.log("Sending real-time push")}
          >
            <Bell size={16} className="mr-2" /> Send Push
          </button>
        </div>
      )}

      {/* Role Access Section */}
      {activeTab === "roleaccess" && (
        <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4" style={{ color: `var(--text)` }}>Role-Based Access Management</h3>
          <p className="text-[var(--muted)] dark:text-[var(--muted)] mb-4">Manage who can send notifications to specific audiences.</p>
          <button
            className="bg-[var(--brand)] text-white px-4 py-2 rounded hover:bg-[var(--active)] flex items-center"
            onClick={() => console.log("Updating role access")}
          >
            <Users size={16} className="mr-2" /> Update Roles
          </button>
        </div>
      )}
    </div>
  );
}