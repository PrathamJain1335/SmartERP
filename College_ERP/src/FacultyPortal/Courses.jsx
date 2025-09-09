import React, { useState } from "react";

export default function Courses({ courses = [] }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id ?? null);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [lessonPlan, setLessonPlan] = useState("");

  if (!courses.length) return <div className="p-4">No courses available</div>;

  const course = courses.find((c) => c.id === selectedCourse);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      <div className="bg-white dark:bg-[#101827] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Courses & Teaching</h3>

        {/* ---- Tabs ---- */}
        <div className="flex border-b mb-4 space-x-6 text-sm font-medium">
          {["Overview", "Syllabus", "Lesson Plans", "Coverage"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---- Overview Tab ---- */}
        {activeTab === "Overview" && (
          <div className="grid md:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setSelectedCourse(c.id)}
              >
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-gray-400">{c.description}</p>
                <p className="text-xs mt-1">Lectures/week: {c.lessons?.length ?? 0}</p>
              </div>
            ))}
          </div>
        )}

        {/* ---- Syllabus Tab ---- */}
        {activeTab === "Syllabus" && (
          <div>
            <h4 className="font-semibold mb-2">Upload / View Syllabus</h4>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="file"
                onChange={(e) => setSyllabusFile(e.target.files[0])}
                className="text-sm"
              />
              <button className="px-4 py-1 bg-blue-600 text-white rounded">
                Upload
              </button>
              {syllabusFile && (
                <button className="px-4 py-1 border rounded">View</button>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {syllabusFile ? syllabusFile.name : "No syllabus uploaded."}
            </p>
          </div>
        )}

        {/* ---- Lesson Plans Tab ---- */}
        {activeTab === "Lesson Plans" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Subject
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-gray-200"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <textarea
                value={lessonPlan}
                onChange={(e) => setLessonPlan(e.target.value)}
                placeholder="Enter week-wise plan..."
                className="w-full mt-3 p-2 rounded bg-gray-900 text-gray-200 h-32"
              />
              <div className="flex gap-3 mt-3">
                <button className="px-4 py-1 bg-blue-600 text-white rounded">
                  Save Lesson Plan
                </button>
                <button className="px-4 py-1 border rounded">Auto Sync</button>
              </div>
            </div>

            {/* Coverage Tracker */}
            <div>
              <h4 className="font-semibold mb-2">Coverage Tracker</h4>
              <p className="text-xs text-gray-400 mb-2">Auto updated</p>
              {courses.map((c) => (
                <div key={c.id} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{c.title}</span>
                    <span>{c.coverage ?? 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded mt-1">
                    <div
                      className="h-2 bg-red-500 rounded"
                      style={{ width: `${c.coverage ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Coverage Tab ---- */}
        {activeTab === "Coverage" && (
          <div>
            <h4 className="font-semibold mb-4">Overall Coverage</h4>
            {courses.map((c) => (
              <div key={c.id} className="mb-3">
                <div className="flex justify-between text-sm">
                  <span>{c.title}</span>
                  <span>{c.coverage ?? 0}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded mt-1">
                  <div
                    className="h-2 bg-red-500 rounded"
                    style={{ width: `${c.coverage ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
