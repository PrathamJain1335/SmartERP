import React, { useRef, useState } from "react";
import { downloadElementAsPDF } from "./utilities/pdfUtils"; // jsPDF export utility assumed

// Fixed profile data editable by admin only
const fixedProfileData = {
  name: "Dr. Tokir Khan",
  role: "Assistant Professor",
  facultyId: "FAC101",
  dob: "July 12, 1985",
  gender: "Female",
  contact: "+91 9876543210",
  email: "tokir.khan@ujecrcuniversity.edu.in",
  department: "Jaipur School of Engineering and Technology",
  qualification: "M.tech (Computer Science)",
  address: "123 University Quarters, Jaipur, Rajasthan",
  joinedDate: "August 1, 2019",
  expireDate: "July 31, 2040",
};

export default function Profile() {
  const idCardRef = useRef();
  const [photoUrl, setPhotoUrl] = useState(""); // User-uploaded photo data URL

  // Handle photo file upload & preview
  function onFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result);
    reader.readAsDataURL(file);
  }

  // Download current ID card as PDF
  function downloadID() {
    downloadElementAsPDF(idCardRef.current, `${fixedProfileData.facultyId}_IDCard.pdf`, false);
  }

  return (
    <div className="bg-white dark:bg-[#071025] p-6 rounded shadow">
      <div className="flex gap-7 items-center mb-8">
        {/* Profile photo upload and preview */}
        <div className="relative w-44">
          <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" className="object-cover w-full h-full rounded-full" />
            ) : (
              fixedProfileData.name.split(" ").map((n) => n[0]).join("")
            )}
          </div>
          <label className="absolute bottom-2 right-2 cursor-pointer">
            <input type="file" accept="image/*" hidden onChange={onFile} />
            <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs shadow hover:bg-red-700 select-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="inline w-4 h-4 mr-1">
                <path d="M12 19c3.866 0 7-3.134 7-7a6.97 6.97 0 0 0-4-6.29M7 2h10l4 4v12a2 2 0 0 1-2 2H7l-4-4V4a2 2 0 0 1 2-2z" />
              </svg>
              Update
            </span>
          </label>
        </div>

        {/* Fixed profile info display */}
        <div>
          <div className="text-2xl font-bold mb-2">{fixedProfileData.name}</div>
          <div className="text-base text-gray-400 mb-4">{fixedProfileData.role}</div>
          <button onClick={downloadID} className="px-4 py-2 bg-red-600 text-white rounded shadow">
            Download Professional ID Card
          </button>
        </div>
      </div>

      {/* Info sections (non-editable) */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Personal Information */}
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-[#0f1a2c] text-gray-800 dark:text-gray-200">
          <div className="font-bold mb-3 text-lg">Personal Information</div>
          <div className="mb-2"><b>Date of Birth:</b> {fixedProfileData.dob}</div>
          <div className="mb-2"><b>Gender:</b> {fixedProfileData.gender}</div>
          <div className="mb-2"><b>Contact No.:</b> {fixedProfileData.contact}</div>
          <div className="mb-2"><b>Email ID:</b> {fixedProfileData.email}</div>
          <div className="mb-2"><b>Permanent Address:</b> {fixedProfileData.address}</div>
        </div>

        {/* Professional Information */}
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-[#0f1a2c] text-gray-800 dark:text-gray-200">
          <div className="font-bold mb-3 text-lg">Professional Information</div>
          <div className="mb-2"><b>Faculty ID:</b> {fixedProfileData.facultyId}</div>
          <div className="mb-2"><b>Department:</b> {fixedProfileData.department}</div>
          <div className="mb-2"><b>Qualification:</b> {fixedProfileData.qualification}</div>
        </div>
      </div>

      {/* Professional ID Card Preview */}
      <div className="mt-10 flex justify-center">
        <div
          ref={idCardRef}
          className="overflow-hidden shadow-lg rounded-xl bg-white"
          style={{ width: 330, minHeight: 470 }}
        >
          <div style={{ background: "linear-gradient(120deg, #a60514 70%, #fff 30%)", height: 110, position: "relative" }}>
            <img
              src={photoUrl || "https://via.placeholder.com/100"}
              alt="ID"
              style={{
                position: "absolute",
                left: 20,
                bottom: -45,
                borderRadius: "50%",
                width: 90,
                height: 90,
                objectFit: "cover",
                boxShadow: "0 4px 16px #bbb",
              }}
            />
            <div style={{ position: "absolute", right: 15, top: 15, color: "#fff", fontWeight: 700 }}>
              JECRC UNIVERSITY
            </div>
          </div>
          <div className="px-5 pt-12 pb-3">
            <div className="text-lg font-bold">{fixedProfileData.name}</div>
            <div className="text-sm text-red-700 mb-1">{fixedProfileData.role}</div>
            <div className="text-xs mb-1"><b>ID No:</b> {fixedProfileData.facultyId}</div>
            <div className="text-xs mb-1"><b>Department:</b> {fixedProfileData.department}</div>
            <div className="text-xs mb-1"><b>DOB:</b> {fixedProfileData.dob}</div>
            <div className="text-xs mb-1"><b>Email:</b> {fixedProfileData.email}</div>
            <div className="text-xs mb-1"><b>Phone:</b> {fixedProfileData.contact}</div>
            <div className="text-xs mb-1"><b>Address:</b> {fixedProfileData.address}</div>
            <div className="text-xs mb-1"><b>Joined Date:</b> {fixedProfileData.joinedDate}</div>
            <div className="text-xs mb-1"><b>Expire Date:</b> {fixedProfileData.expireDate}</div>
            <div className="mt-2 mb-1 flex justify-center">
              <div
                style={{
                  width: "130px",
                  height: "32px",
                  background: "repeating-linear-gradient(90deg,#333 0 2px,#fff 2px 6px)",
                }}
              />
            </div>
            <div className="mt-3 mb-1 text-xs text-right">Your Signature</div>
            <div className="text-xs text-right font-semibold">Principal</div>
          </div>
          <div style={{ background: "#a60514", height: 25 }} />
        </div>
      </div>
    </div>
  );
}
