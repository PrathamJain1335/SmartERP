import React, { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";

const sections = [
  { id: "cs101a", name: "CS101 - Section A" },
  { id: "cs101b", name: "CS101 - Section B" },
  { id: "cs102a", name: "CS102 - Section A" },
];

// Mock attendance data and semester academic progress
const dataStore = {
  cs101a: {
    attendance: {
      present: 88,
      absent: 12,
      weekly: [
        { name: "Week 1", val: 85 },
        { name: "Week 2", val: 88 },
        { name: "Week 3", val: 90 },
        { name: "Week 4", val: 87 },
      ],
      totalStudents: 50,
    },
    academicProgress: [
      { semester: "Sem 1", avgMarks: 75 },
      { semester: "Sem 2", avgMarks: 80 },
      { semester: "Sem 3", avgMarks: 85 },
      { semester: "Sem 4", avgMarks: 82 },
    ],
  },
  cs101b: {
    attendance: {
      present: 82,
      absent: 18,
      weekly: [
        { name: "Week 1", val: 80 },
        { name: "Week 2", val: 83 },
        { name: "Week 3", val: 85 },
        { name: "Week 4", val: 79 },
      ],
      totalStudents: 45,
    },
    academicProgress: [
      { semester: "Sem 1", avgMarks: 70 },
      { semester: "Sem 2", avgMarks: 72 },
      { semester: "Sem 3", avgMarks: 75 },
      { semester: "Sem 4", avgMarks: 77 },
    ],
  },
  cs102a: {
    attendance: {
      present: 90,
      absent: 10,
      weekly: [
        { name: "Week 1", val: 87 },
        { name: "Week 2", val: 91 },
        { name: "Week 3", val: 93 },
        { name: "Week 4", val: 89 },
      ],
      totalStudents: 48,
    },
    academicProgress: [
      { semester: "Sem 1", avgMarks: 82 },
      { semester: "Sem 2", avgMarks: 85 },
      { semester: "Sem 3", avgMarks: 86 },
      { semester: "Sem 4", avgMarks: 88 },
    ],
  },
};

const COLORS = ["#10B981", "#EF4444"];

export default function Reports() {
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0].id);
  const [report, setReport] = useState(dataStore[selectedSectionId]);

  useEffect(() => {
    setReport(dataStore[selectedSectionId]);
  }, [selectedSectionId]);

  // Export PDF logic omitted for brevity, same as previously described

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-2xl font-bold">Attendance & Academic Reports</h3>
        <div className="flex items-center gap-4">
          <select
            className="border p-2 rounded"
            value={selectedSectionId}
            onChange={e => setSelectedSectionId(e.target.value)}
          >
            {sections.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {/* Export PDF button if needed */}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Attendance Pie */}
        <div className="bg-white dark:bg-[#071025] p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Attendance Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Present", value: report.attendance.present },
                  { name: "Absent", value: report.attendance.absent },
                ]}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label
                labelLine={false}
              >
                {[report.attendance.present, report.attendance.absent].map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center font-semibold text-lg">
            Total Students: {report.attendance.totalStudents}
          </div>
        </div>

        {/* Weekly Attendance Bar */}
        <div className="bg-white dark:bg-[#071025] p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Weekly Attendance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={report.attendance.weekly}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="val" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Progress Bar */}
        <div className="bg-white dark:bg-[#071025] p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Academic Progress (Semester-wise)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={report.academicProgress}>
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgMarks" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
