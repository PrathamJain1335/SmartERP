import React, { useState } from "react";

// Sample approvals data – place this above your component definition
const approvals = [
  { id: 1, type: "Certificate", section: "CS101-A", student: "Tokir Khan", status: "pending" },
  { id: 2, type: "Internship", section: "CS102-A", student: "Pratham", status: "pending" },
  { id: 3, type: "Project", section: "CS101-B", student: "Anushka Sharma", status: "approved" },
  { id: 4, type: "Certificate", section: "CS101-B", student: "Rahul Agarwal", status: "pending" },
  { id: 5, type: "Internship", section: "CS102-A", student: "Amit Kumar", status: "approved" },
  // Add more data here as needed
];

// Dropdown options
const sectionOptions = ["All Sections", "CS101-A", "CS101-B", "CS102-A"];
const typeOptions = ["All Types", "Certificate", "Internship", "Project"];

function Approvals({
  approvals = [],
  onApprove,
  onReject,
  onView,
}) {
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [selectedType, setSelectedType] = useState("All Types");

  // Filter logic
  const filteredApprovals = approvals.filter(a =>
    (selectedSection === "All Sections" || a.section === selectedSection) &&
    (selectedType === "All Types" || a.type === selectedType)
  );

  return (
    <div className="bg-white dark:bg-[#071025] p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Student Documents - Approval Hub</h3>
        <div className="flex gap-3">
          {/* Section Dropdown */}
          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded"
          >
            {sectionOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Type Dropdown */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded"
          >
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {filteredApprovals.map(a => (
            <div key={a.id} className="p-3 border rounded mb-2 flex items-center justify-between">
              <div>
                <div className="font-semibold">{a.type} • {a.section}</div>
                <div className="text-sm text-gray-500">{a.student}</div>
              </div>
              <div className="flex gap-2">
                {a.status === "pending" && (
                  <>
                    <button
                      onClick={() => onApprove?.(a.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject?.(a.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => onView?.(a)}
                  className="px-3 py-1 border rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
          {filteredApprovals.length === 0 && (
            <div className="text-gray-500 mt-8">No approvals found for these filters.</div>
          )}
        </div>

        <div>
          <div className="p-3 border rounded mb-4">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold">
              {filteredApprovals.filter(a => a.status === "pending").length}
            </div>
          </div>
          <div className="p-3 border rounded mb-4">
            <div className="text-sm text-gray-500">Approved</div>
            <div className="text-2xl font-bold">
              {filteredApprovals.filter(a => a.status === "approved").length}
            </div>
          </div>
          <div className="p-3 border rounded">
            <div className="font-semibold mb-1">Preview</div>
            <div className="text-sm text-gray-500">
              Select an approval to preview document here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the approvals page using the sample data
export default function StudentDocumentsPage() {
  // Optionally define handlers for approve/reject/view
  const handleApprove = id => alert(`Approved item ${id}`);
  const handleReject = id => alert(`Rejected item ${id}`);
  const handleView = a => alert(`Viewing details for ${a.student}, document type: ${a.type}`);

  return (
    <Approvals
      approvals={approvals}
      onApprove={handleApprove}
      onReject={handleReject}
      onView={handleView}
    />
  );
}
