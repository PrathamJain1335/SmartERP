import React, { useMemo, useRef, useState } from "react";
import { downloadElementAsPDF } from "./utilities/pdfUtils"; // ✅ fixed path
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard({ data }) {
  const assignedCells = data.assignedCells || [];
  const fullTimeSlots = data.fullTimeSlots || [];
  const timeSlots = fullTimeSlots.slice(0, fullTimeSlots.length - 1);
  const timetableRef = useRef();
  const [selectedSection, setSelectedSection] = useState("All");

  const metrics = useMemo(
    () => ({
      students: data.students?.length ?? 0,
      courses: data.courses?.length ?? 0,
      assignments: data.assignments?.length ?? 0,
      pendingApprovals: (data.approvals ?? []).filter(
        (a) => a.status === "pending"
      ).length,
    }),
    [data]
  );

  const sections = [
    "All",
    ...Array.from(new Set(assignedCells.map((c) => c.section))),
  ];

  // Download CSV
  function downloadCSV() {
    const days = [
      "Time",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let csv = days.join(",") + "\n";
    for (let i = 0; i < timeSlots.length; i++) {
      const row = [fullTimeSlots[i]];
      for (let j = 1; j <= 6; j++) {
        const cell = assignedCells.find(
          (c) =>
            c.row === i &&
            c.col === j &&
            (selectedSection === "All" || c.section === selectedSection)
        );
        row.push(cell ? `"${cell.label.replace(/\n/g, " ")}"` : "");
      }
      csv += row.join(",") + "\n";
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ClassSchedule_${selectedSection}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Download PDF
  function downloadPDF() {
    downloadElementAsPDF(
      timetableRef.current?.querySelector("#timetableWrap"),
      `ClassSchedule_${selectedSection}.pdf`,
      true
    );
  }

  const chartData = [
    { name: "Mon", attendance: 85 },
    { name: "Tue", attendance: 88 },
    { name: "Wed", attendance: 90 },
    { name: "Thu", attendance: 87 },
    { name: "Fri", attendance: 92 },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Pending Approvals", value: metrics.pendingApprovals },
          { label: "Assigned Courses", value: metrics.courses },
          { label: "Assignments", value: metrics.assignments },
          { label: "Students", value: metrics.students },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded shadow border dark:border-gray-700"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </div>
            <div className="text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Timetable */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Class Schedule (Week)</h3>
          <div className="flex items-center gap-3">
            <select
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={downloadCSV}
              aria-label="Download timetable CSV"
              className="px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              CSV
            </button>
            <button
              onClick={downloadPDF}
              aria-label="Download timetable PDF"
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              PDF
            </button>
          </div>
        </div>

        <div ref={timetableRef} id="timetableWrap" className="overflow-auto mb-4">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Mon</th>
                <th className="p-3 border">Tue</th>
                <th className="p-3 border">Wed</th>
                <th className="p-3 border">Thu</th>
                <th className="p-3 border">Fri</th>
                <th className="p-3 border">Sat</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, r) => (
                <tr key={r}>
                  <td className="p-3 border font-medium">{fullTimeSlots[r]}</td>
                  {[1, 2, 3, 4, 5, 6].map((c) => {
                    const match = assignedCells.find(
                      (x) =>
                        x.row === r &&
                        x.col === c &&
                        (selectedSection === "All" ||
                          x.section === selectedSection)
                    );
                    return (
                      <td
                        key={c}
                        className="p-3 border align-top whitespace-pre-line"
                        style={{
                          background: match?.color || "transparent",
                          fontWeight: match ? 700 : 400,
                        }}
                      >
                        {match ? match.label : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Chart */}
        <div className="h-64 bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="url(#lineColor)"
                strokeWidth={3}
                dot={{ r: 5, fill: "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
