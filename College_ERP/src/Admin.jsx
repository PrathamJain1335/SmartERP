import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './AdminPortal/Header';
import Shell from './AdminPortal/Shell';
import Sidebar from './AdminPortal/Sidebar';
import Dashboard from './AdminPortal/Dashboard';
import FacultyList from './AdminPortal/FacultyList';
import FacultyAttendance from './AdminPortal/FacultyAttendance';
import CommunicationHub from './AdminPortal/CommunicationHub';
import Reports from './AdminPortal/Reports';
import ManageNotifications from './AdminPortal/ManageNotifications';
import FacultyProfile from './AdminPortal/FacultyProfile';
import StudentDetails from './AdminPortal/StudentDetails';
import Examination from './AdminPortal/Examination';
import Library from './AdminPortal/Library';
import FeeManagement from './AdminPortal/FeeManagement';
import Curriculum from './AdminPortal/Curriculum';

const initialData = { /* ...as before... */ };

// Simulated auth check
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const SectionRoutes = ({ activePage, data, handlers }) => (
  <Routes>
    <Route path="dashboard" element={<Dashboard data={data} handlers={handlers} />} />
    <Route path="faculty-list" element={<FacultyList data={data} handlers={handlers} />} />
    <Route path="faculty-attendance" element={<FacultyAttendance data={data} handlers={handlers} />} />
    <Route path="communication-hub" element={<CommunicationHub data={data} handlers={handlers} />} />
    <Route path="reports" element={<Reports data={data} handlers={handlers} />} />
    <Route path="manage-notifications" element={<ManageNotifications data={data} handlers={handlers} />} />
    <Route path="faculty-profile" element={<FacultyProfile data={data} handlers={handlers} />} />
    <Route path="student-details" element={<StudentDetails data={data} handlers={handlers} />} />
    <Route path="examination" element={<Examination data={data} handlers={handlers} />} />
    <Route path="library" element={<Library data={data} handlers={handlers} />} />
    <Route path="fee-management" element={<FeeManagement data={data} handlers={handlers} />} />
    <Route path="curriculum" element={<Curriculum data={data} handlers={handlers} />} />
    {/* Default fallback to dashboard */}
    <Route path="*" element={<Dashboard data={data} handlers={handlers} />} />
  </Routes>
);

const AdminContent = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [pinned, setPinned] = useState(() => JSON.parse(localStorage.getItem("sidebarPinned") || "true"));
  const [sidebarExpanded, setSidebarExpanded] = useState(pinned);
  const [activePage, setActivePage] = useState(() => localStorage.getItem("activePage") || "Dashboard");
  const [data, setData] = useState(initialData);
  const location = useLocation();

  useEffect(() => {
    const pathToPage = {
      '/admin/dashboard': 'Dashboard',
      '/admin/faculty-list': 'FacultyList',
      '/admin/faculty-attendance': 'FacultyAttendance',
      '/admin/communication-hub': 'CommunicationHub',
      '/admin/reports': 'Reports',
      '/admin/manage-notifications': 'ManageNotifications',
      '/admin/faculty-profile': 'FacultyProfile',
      '/admin/student-details': 'StudentDetails',
      '/admin/examination': 'Examination',
      '/admin/library': 'Library',
      '/admin/fee-management': 'FeeManagement',
      '/admin/curriculum': 'Curriculum',
    };
    const page = pathToPage[location.pathname] || 'Dashboard';
    setActivePage(page);
    localStorage.setItem("activePage", page);
  }, [location]);

  const handlers = {
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    theme,
    updateProfile: (prof) => setData((d) => ({ ...d, profile: prof })),
    saveReport: (report) => setData((d) => ({ ...d, reports: [...d.reports, report] })),
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sidebarPinned", JSON.stringify(pinned));
  }, [pinned]);

  return (
    <Shell
      sidebar={
        <Sidebar
          activeSection={activePage}
          setActiveSection={setActivePage}
          pinned={pinned}
          setPinned={setPinned}
          onExpandChange={setSidebarExpanded}
          basePath="/admin"
          sidebarExpanded={sidebarExpanded}
        />
      }
      header={
        <Header
          activePage={activePage}
          theme={theme}
          toggleTheme={handlers.toggleTheme}
          notifications={data?.notifications ?? []}
          user={{
            name: data?.profile?.name ?? "",
            photo: data?.profile?.photo ?? "",
          }}
          onLogout={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          onProfile={() => setActivePage("FacultyProfile")}
        />
      }
      main={<SectionRoutes activePage={activePage} data={data} handlers={handlers} />}
      sidebarExpanded={sidebarExpanded}
    />
  );
};

const Admin = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<ProtectedRoute><AdminContent /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Admin;
