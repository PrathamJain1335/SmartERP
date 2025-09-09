import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Students({ students = [] }) {
  const [tab, setTab] = useState("Attendance");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [section, setSection] = useState("CSE - 2nd Year - Section A");
  const [presentMap, setPresentMap] = useState({});

  // mock: pre-fill attendance for demo
  useEffect(() => {
    const map = {};
    students.forEach(
      (s, i) => (map[s.roll || s.id || s.name] = i % 2 === 0)
    );
    setPresentMap(map);
  }, [students]);

  function togglePresent(key) {
    setPresentMap((p) => ({ ...p, [key]: !p[key] }));
  }

  function markAllPresent() {
    const next = {};
    students.forEach((s) => (next[s.roll || s.id || s.name] = true));
    setPresentMap(next);
  }

  function saveAttendance() {
    const all = JSON.parse(localStorage.getItem("attendanceData") || "{}");
    all[date] = all[date] || {};
    all[date][section] = presentMap;
    localStorage.setItem("attendanceData", JSON.stringify(all));
    alert("✅ Attendance saved successfully!");
  }

  // Mock report data
  const reportData = [
    { name: "CS101", attendance: 85 },
    { name: "CS102", attendance: 72 },
    { name: "MA201", attendance: 90 },
    { name: "PH202", attendance: 65 },
  ];

  // Mock student records
  const mockDocuments = [
    { type: "Aadhaar Card", url: "https://via.placeholder.com/400x250" },
    { type: "College ID", url: "https://via.placeholder.com/400x250" },
    { type: "10th Marksheet", url: "https://via.placeholder.com/400x250" },
    { type: "12th Marksheet", url: "https://via.placeholder.com/400x250" },
  ];

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700">
        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b dark:border-gray-700">
          {["Attendance", "Records", "Reports"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 px-1 font-medium transition ${
                tab === t
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Attendance Tab */}
        {tab === "Attendance" && (
          <>
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option>CSE - 2nd Year - Section A</option>
                <option>CSE - 2nd Year - Section B</option>
              </select>
              <div className="text-right">
                <button
                  onClick={markAllPresent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mark All Present
                </button>
              </div>
            </div>

            <textarea
              className="w-full p-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
              rows={2}
              placeholder="Enter topics covered..."
            ></textarea>

            {/* Attendance Table */}
            <div className="overflow-auto rounded border dark:border-gray-700">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 border">Roll No.</th>
                    <th className="p-3 border">Student Name</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const key = s.roll || s.id || s.name;
                    return (
                      <tr
                        key={key}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <td className="p-3 border">{s.roll ?? s.id}</td>
                        <td className="p-3 border">{s.name}</td>
                        <td className="p-3 border text-center">
                          <input
                            type="checkbox"
                            checked={!!presentMap[key]}
                            onChange={() => togglePresent(key)}
                          />
                        </td>
                        <td className="p-3 border">
                          <input
                            placeholder="Optional"
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={markAllPresent}
              >
                Mark All Present
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded">
                Edit Later
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={saveAttendance}
              >
                Save Attendance
              </button>
            </div>
          </>
        )}

        {/* Records Tab */}
        {tab === "Records" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Student Documents</h3>
            <div className="overflow-auto rounded border dark:border-gray-700">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 border">Roll No.</th>
                    <th className="p-3 border">Student Name</th>
                    <th className="p-3 border">Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const key = s.roll || s.id || s.name;
                    return (
                      <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-3 border">{s.roll ?? s.id}</td>
                        <td className="p-3 border">{s.name}</td>
                        <td className="p-3 border">
                          <ul className="space-y-2">
                            {mockDocuments.map((doc, i) => (
                              <li
                                key={i}
                                className="flex justify-between items-center"
                              >
                                <span>{doc.type}</span>
                                <button
                                  onClick={() => window.open(doc.url, "_blank")}
                                  className="px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                  View
                                </button>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {tab === "Reports" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Attendance Reports</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData}>
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
                <Bar
                  dataKey="attendance"
                  fill="#A60514"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
