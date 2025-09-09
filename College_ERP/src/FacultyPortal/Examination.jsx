import React, { useState } from "react";
import Modal from "../FacultyPortal/Modal";

// Sample sections/subjects/students for demonstration
const sections = ["CS101-A", "CS101-B", "CS102-A"];
const subjects = ["C++", "Math", "DSA"];
const studentsMock = {
  "CS101-A": ["Aarav Sharma", "Diya Patel", "Rohan Gupta"],
  "CS101-B": ["Ananya Das", "Rahul Mehta"],
  "CS102-A": ["Pratham", "Amit Kumar"]
};

// Initial Exams Data
const initialExams = [
  { id: "1", type: "1st Insem", section: "CS101-A", subject: "C++", date: "2025-09-07", paper: null, grades: {}, status: "Upcoming" },
  { id: "2", type: "2nd Insem", section: "CS102-A", subject: "Math", date: "2025-09-12", paper: null, grades: {}, status: "Upcoming" },
  { id: "3", type: "End Sem", section: "CS101-B", subject: "DSA", date: "2025-09-22", paper: null, grades: {}, status: "Upcoming" },
];

export default function Examination() {
  const [exams, setExams] = useState(initialExams);

  // For creating exam
  const [openCreate, setOpenCreate] = useState(false);
  const [type, setType] = useState("1st Insem");
  const [section, setSection] = useState(sections);
  const [subject, setSubject] = useState(subjects);
  const [date, setDate] = useState("");
  const [paper, setPaper] = useState(null);

  // Filters
  const [selectedSection, setSelectedSection] = useState(sections);
  const [selectedSubject, setSelectedSubject] = useState(subjects);

  // Grading
  const [openGrade, setOpenGrade] = useState(false);
  const [gradeIdx, setGradeIdx] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [inputGrade, setInputGrade] = useState("");

  // Analytics
  function getAnalytics(grades) {
    const all = Object.values(grades).map(x => Number(x)).filter(x => !isNaN(x));
    if (!all.length) return { avg: "-", max: "-", min: "-" };
    const sum = all.reduce((a, b) => a + b, 0);
    return {
      avg: (sum/all.length).toFixed(2),
      max: Math.max(...all),
      min: Math.min(...all),
    };
  }

  // Status tags
  function getStatus(date, grades) {
    const now = new Date();
    const examDate = new Date(date);
    if (Object.keys(grades).length) return "Graded";
    if (now < examDate) return "Upcoming";
    if (now > examDate) return "Overdue";
    if (now.toDateString() === examDate.toDateString()) return "Active";
    return "Upcoming";
  }

  // Filter exams by section & subject
  const filteredExams = exams.filter(
    e => e.section === selectedSection && e.subject === selectedSubject
  );

  // Exam creation logic
  function createExam() {
    if (!type || !section || !subject || !date) return;
    setExams([
      ...exams,
      {
        id: Date.now().toString(),
        type,
        section,
        subject,
        date,
        paper,
        grades: {},
        status: "Upcoming",
      },
    ]);
    setType("1st Insem");
    setSection(sections);
    setSubject(subjects);
    setDate("");
    setPaper(null);
    setOpenCreate(false);
  }

  // Upload question paper logic
  function uploadPaper(idx, file) {
    const updated = [...exams];
    updated[idx].paper = file;
    setExams(updated);
  }

  // Grade Modal logic
  function openGrading(idx) {
    setGradeIdx(idx);
    setOpenGrade(true);
    setSelectedStudent("");
    setInputGrade("");
  }
  function setStudentGrade() {
    if (!selectedStudent || !inputGrade.trim()) return;
    const updated = [...exams];
    updated[gradeIdx].grades[selectedStudent] = inputGrade;
    setExams(updated);
    setInputGrade("");
  }

  // Export grade sheet as CSV
  function exportCSV(idx) {
    const exam = exams[idx];
    const rows = [["Student", "Grade"]];
    for (const [student, grade] of Object.entries(exam.grades)) {
      rows.push([student, grade]);
    }
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exam.type}_${exam.section}_${exam.subject}_grades.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold">Examination</h3>
        <button onClick={() => setOpenCreate(true)} className="px-4 py-2 bg-red-600 text-white rounded">
          Create Exam
        </button>
      </div>
      {/* Section & Subject Pickers */}
      <div className="flex gap-3 mb-6">
        <select value={selectedSection} onChange={e=>setSelectedSection(e.target.value)} className="px-2 py-1 border rounded">
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>
        <select value={selectedSubject} onChange={e=>setSelectedSubject(e.target.value)} className="px-2 py-1 border rounded">
          {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>
      <div className="bg-white dark:bg-[#071025] p-6 rounded shadow">
        <div className="font-semibold mb-3 text-lg">Exams</div>
        {filteredExams.length === 0 ? (
          <div>No exams scheduled for this section and subject.</div>
        ) : filteredExams.map((e, idx) => {
          const analytics = getAnalytics(e.grades);
          return (
            <div key={e.id} className="flex justify-between items-center bg-[#fafafd] dark:bg-[#09111b] rounded mb-4 p-4 border">
              <div>
                <div className="font-bold text-lg">{e.type} ({e.section})</div>
                <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">Subject: {e.subject}</div>
                <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">Date: {e.date}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {e.paper ? <span>PDF uploaded</span> : <span>No question paper uploaded</span>}
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold
                    ${getStatus(e.date, e.grades)==="Graded" ? "bg-green-100 text-green-700"
                      : getStatus(e.date, e.grades)==="Overdue" ? "bg-red-100 text-red-700"
                      : getStatus(e.date, e.grades)==="Active" ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-900"}
                  `}>
                    {getStatus(e.date, e.grades)}
                  </span>
                </div>
                {/* Analytics Widget */}
                <div className="mt-2 text-[13px] text-gray-600">
                  <span>Avg: {analytics.avg}</span> &nbsp;|&nbsp; <span>Max: {analytics.max}</span> &nbsp;|&nbsp; <span>Min: {analytics.min}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={ev => uploadPaper(exams.indexOf(e), ev.target.files)}
                  />
                  <span className={`inline-block px-3 py-1 border rounded cursor-pointer
                        ${e.paper ? "bg-green-50 text-green-800 border-green-400"
                        : "bg-gray-50 text-gray-600 border-gray-300"}`}>
                    {e.paper ? "PDF Uploaded" : "Upload PDF"}
                  </span>
                </label>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => openGrading(exams.indexOf(e))}
                >
                  Grade
                </button>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => exportCSV(exams.indexOf(e))}
                >
                  Export Grades
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Create Exam Modal */}
      <Modal open={openCreate} onClose={()=>setOpenCreate(false)} title="Create Exam">
        <div className="space-y-3">
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full p-2 border rounded">
            <option>1st Insem</option>
            <option>2nd Insem</option>
            <option>3rd Sem</option>
            <option>End Sem</option>
          </select>
          <select value={section} onChange={e=>setSection(e.target.value)} className="w-full p-2 border rounded">
            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="w-full p-2 border rounded">
            {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full p-2 border rounded"/>
          <input type="file" accept=".pdf" onChange={e=>setPaper(e.target.files)} className="w-full p-2 border rounded"/>
          <div className="text-right">
            <button onClick={createExam} className="px-4 py-2 bg-red-600 text-white rounded">Create Exam</button>
          </div>
        </div>
      </Modal>
      {/* Grading Modal */}
      <Modal open={openGrade} onClose={()=>setOpenGrade(false)} title="Grade Exam">
        {gradeIdx !== null && (
          <div>
            <div className="font-bold mb-2">{exams[gradeIdx].type} ({exams[gradeIdx].section}) - {exams[gradeIdx].subject}</div>
            <select
              value={selectedStudent}
              onChange={e=>setSelectedStudent(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Student</option>
              {(studentsMock[exams[gradeIdx].section] || []).map(s =>
                <option key={s} value={s}>{s}</option>
              )}
            </select>
            <input
              value={inputGrade}
              onChange={e=>setInputGrade(e.target.value)}
              placeholder="Enter Marks/Grade"
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={setStudentGrade} className="px-4 py-2 bg-blue-600 text-white rounded">
              Save Grade
            </button>
            {/* Show entered grades */}
            <div className="mt-4 text-sm">
              <div className="font-semibold mb-1">Grades:</div>
              <ul>
                {Object.entries(exams[gradeIdx].grades).map(([st, gr]) =>
                  <li key={st}>{st}: {gr}</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
