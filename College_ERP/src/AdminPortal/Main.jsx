import React from 'react';
import Dashboard from './Dashboard';
import FacultyList from './FacultyList';
import FacultyAttendance from './FacultyAttendance';
import CommunicationHub from './CommunicationHub';
import Reports from './Reports';
import ManageNotifications from './ManageNotifications';
import FacultyProfile from './FacultyProfile';
import StudentDetails from './StudentDetails';
import Examination from './Examination';
import Library from './Library';
import FeeManagement from './FeeManagement';
import Curriculum from './Curriculum';
import "./../theme.css"; // If theme.css is outside FacultyPortal, go up one level

const Main = ({ activePage, data, handlers }) => {
  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard data={data} />;
      case 'FacultyList':
        return <FacultyList data={data} />;
      case 'FacultyAttendance':
        return <FacultyAttendance data={data} />;
      case 'CommunicationHub':
        return <CommunicationHub data={data} />;
      case 'Reports':
        return <Reports data={data} />;
      case 'ManageNotifications':
        return <ManageNotifications data={data} />;
      case 'FacultyProfile':
        return <FacultyProfile data={data} handlers={handlers} />;
      case 'StudentDetails':
        return <StudentDetails data={data} />;
      case 'Examination':
        return <Examination data={data} />;
      case 'Library':
        return <Library data={data} />;
      case 'FeeManagement':
        return <FeeManagement data={data} />;
      case 'Curriculum':
        return <Curriculum data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <div className="p-6">
      {renderPage()}
    </div>
  );
};

export default Main;