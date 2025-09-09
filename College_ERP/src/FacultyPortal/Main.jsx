import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Students from "./Students";
import Courses from "./Courses";
import Timetable from "./Timetable";
import Evaluation from "./Evaluation";
import Approvals from "./Approvals";
import Assignments from "./Assignments";
import Examination from "./Examination";
import Reports from "./Reports";
import Profile from "./Profile";
import "./../theme.css"; // If theme.css is outside FacultyPortal, go up one level


export default function Main({ activePage, data, handlers }) {
  return (
    <main className="flex-1 overflow-auto min-h-screen bg-gray-50 dark:bg-[#071025]">
      <Header activePage={activePage} theme={handlers.theme} toggleTheme={handlers.toggleTheme} notifications={data.notifications}/>
      <div className="p-6">
        {activePage === "Dashboard" && <Dashboard data={data} />}
        {activePage === "Students" && <Students students={data.students} />}
        {activePage === "Courses" && <Courses courses={data.courses} />}
        {activePage === "Timetable" && <Timetable assignedCells={data.assignedCells} fullTimeSlots={data.fullTimeSlots} />}
        {activePage === "Evaluation" && <Evaluation evaluations={data.evaluations} onSaveMarks={handlers.saveMarks} />}
        {activePage === "Approvals" && <Approvals approvals={data.approvals} onApprove={handlers.approve} onReject={handlers.reject} />}
        {activePage === "Assignments" && <Assignments assignments={data.assignments} onCreate={handlers.createAssignment} />}
        {activePage === "Examination" && <Examination exams={data.exams} />}
        {activePage === "Reports" && <Reports reports={data.reports} />}
        {activePage === "Profile" && <Profile profile={data.profile} onUpdate={handlers.updateProfile} />}
      </div>
    </main>
  );
}
