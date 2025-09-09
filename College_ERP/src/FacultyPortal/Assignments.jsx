import React, { useState } from "react";
import Modal from "../FacultyPortal/Modal";

// Sample sections and students mapping
const sections = ["CS101-A", "CS101-B", "CS102-A"];
const studentsMock = {
  "CS101-A": ["Aarav Sharma", "Diya Patel", "Rohan Gupta"],
  "CS101-B": ["Ananya Das", "Rahul Mehta"],
  "CS102-A": ["Pratham", "Amit Kumar"]
};

// Sample initial assignments: one per section
const initialAssignments = [
  {
    id: "1",
    title: "Assignment 1: Intro to C++",
    deadline: "2025-09-10",
    marks: 20,
    pdf: null,
    section: "CS101-A",
    grades: {}, // {student: grade}
  },
  {
    id: "2",
    title: "Problem Set - Math",
    deadline: "2025-09-12",
    marks: 15,
    pdf: null,
    section: "CS102-A",
    grades: {},
  },
];

export default function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [openCreate, setOpenCreate] = useState(false);

  // For creating assignment
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [marks, setMarks] = useState(10);
  const [pdf, setPdf] = useState(null);
  const [section, setSection] = useState(sections);

  // For grading assignment
  const [openGrade, setOpenGrade] = useState(false);
  const [gradeIdx, setGradeIdx] = useState(null);
  const [selectedGradeStudent, setSelectedGradeStudent] = useState("");
  const [inputGrade, setInputGrade] = useState("");

  // Section selection
  const [selectedSection, setSelectedSection] = useState(sections);

  function createAssignment() {
    if (!title.trim() || !deadline || !section) return;
    setAssignments([
      ...assignments,
      {
        id: Date.now().toString(),
        title,
        deadline,
        marks,
        pdf,
        section,
        grades: {},
      },
    ]);
    setTitle("");
    setDeadline("");
    setMarks(10);
    setPdf(null);
    setSection(sections);
    setOpenCreate(false);
  }

  function uploadPDF(idx, file) {
    const updated = [...assignments];
    updated[idx].pdf = file;
    setAssignments(updated);
  }

  // Grade Modal logic
  function openGradeModal(idx) {
    setGradeIdx(idx);
    setOpenGrade(true);
    setSelectedGradeStudent("");
    setInputGrade("");
  }
  function setStudentGrade() {
    if (!selectedGradeStudent || !inputGrade.trim()) return;
    const updated = [...assignments];
    updated[gradeIdx].grades[selectedGradeStudent] = inputGrade;
    setAssignments(updated);
    setInputGrade("");
  }

  // Filtered assignments for selected section
  const filteredAssignments = assignments.filter(a => a.section === selectedSection);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold">Assignments</h3>
        <button onClick={() => setOpenCreate(true)} className="px-4 py-2 bg-red-600 text-white rounded">
          Create Assignment
        </button>
      </div>
      {/* Section Picker */}
      <div className="mb-4">
        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          {sections.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-[#071025] p-6 rounded shadow">
        <div className="font-semibold mb-3 text-lg">Assignments</div>
        {filteredAssignments.length === 0 ? (
          <div>No assignments for this section</div>
        ) : (
          filteredAssignments.map((a, idx) => (
            <div key={a.id} className="flex justify-between items-center bg-[#fafafd] dark:bg-[#09111b] rounded mb-4 p-4 border">
              <div>
                <div className="font-bold text-lg">{a.title}</div>
                <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  Deadline: {a.deadline}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {a.pdf ? <span>PDF uploaded</span> : <span>No PDF uploaded</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="mr-4 font-bold">Marks: {a.marks}</div>
                <label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={e => uploadPDF(idx, e.target.files)}
                  />
                  <span className={`inline-block px-3 py-1 border rounded cursor-pointer
                          ${a.pdf ? "bg-green-50 text-green-800 border-green-400"
                          : "bg-gray-50 text-gray-600 border-gray-300"}`}>
                    {a.pdf ? "PDF Uploaded" : "Upload PDF"}
                  </span>
                </label>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => openGradeModal(assignments.indexOf(a))}
                >
                  Grade
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Assignment Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Create Assignment">
        <div className="space-y-3">
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Assignment Title"
          />
          <input 
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().split("T")}
          />
          <input 
            type="number"
            value={marks}
            onChange={e => setMarks(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Marks"
            min={1}
            max={100}
          />
          <select
            value={section}
            onChange={e => setSection(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {sections.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          <input
            type="file"
            accept=".pdf"
            onChange={e => setPdf(e.target.files)}
            className="w-full p-2 border rounded"
          />
          <div className="text-right">
            <button onClick={createAssignment} className="px-4 py-2 bg-red-600 text-white rounded">Create</button>
          </div>
        </div>
      </Modal>

      {/* Grading Modal */}
      <Modal open={openGrade} onClose={() => setOpenGrade(false)} title="Grade Assignment">
        {gradeIdx !== null && (
          <div>
            <div className="font-bold mb-2">{assignments[gradeIdx].title} ({assignments[gradeIdx].section})</div>
            {/* List students for grading */}
            <div className="mb-3">
              <select
                value={selectedGradeStudent}
                onChange={e => setSelectedGradeStudent(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Student</option>
                {(studentsMock[assignments[gradeIdx].section] || []).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <input
              value={inputGrade}
              onChange={e => setInputGrade(e.target.value)}
              placeholder="Enter Grade"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={setStudentGrade}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Grade
            </button>
            {/* Show entered grades */}
            <div className="mt-4">
              <div className="text-sm font-semibold mb-1">Grades:</div>
              <ul className="text-sm">
                {Object.entries(assignments[gradeIdx].grades).map(([st, gr]) => (
                  <li key={st}>{st}: {gr}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
