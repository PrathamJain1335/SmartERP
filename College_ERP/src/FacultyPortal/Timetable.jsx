import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { downloadElementAsPDF } from "./utilities/pdfUtils";

export default function Timetable() {
  const [schedule, setSchedule] = useState({});
  const printRef = useRef();

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const data = res.data.reduce((acc, curr) => {
          acc[curr.time] = acc[curr.time] || {};
          acc[curr.time][curr.day] = curr.subject;
          return acc;
        }, {});
        setSchedule(data);
      },
    });
  }

  function exportPDF() {
    downloadElementAsPDF(printRef.current, "Timetable.pdf", false);
  }

  const timeSlots = [
    "8:00-8:50",
    "8:50-9:40",
    "9:40-10:30",
    "10:30-11:20",
    "11:20-12:10",
    "12:10-13:00",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="bg-white dark:bg-[#071025] p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Timetable (View Only)</h3>
          <div className="flex gap-2">
            <input type="file" accept=".csv" onChange={handleFile} />
            <button onClick={exportPDF} className="px-3 py-2 bg-red-600 text-white rounded">
              Export PDF
            </button>
          </div>
        </div>

        <div ref={printRef} className="overflow-auto bg-white dark:bg-[#071025] p-2 rounded">
          {Object.keys(schedule).length === 0 ? (
            <div className="text-gray-500 p-4">No file uploaded</div>
          ) : (
            <table className="min-w-full border">
              <thead className="bg-gray-50 dark:bg-[#081028]">
                <tr>
                  <th className="p-2 border">Time</th>
                  {days.map((day, i) => (
                    <th key={i} className="p-2 border">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{time}</td>
                    {days.map((day, j) => (
                      <td
                        key={j}
                        className="p-2 border"
                        style={{
                          backgroundColor:
                            schedule[time]?.[day] === "Mathematics"
                              ? "#ADD8E6"
                              : schedule[time]?.[day] === "Physics"
                              ? "#FFFACD"
                              : schedule[time]?.[day] === "Programming"
                              ? "#FFB6C1"
                              : schedule[time]?.[day] === "EnggGraphics"
                              ? "#98FB98"
                              : "transparent",
                        }}
                      >
                        {schedule[time]?.[day] || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}