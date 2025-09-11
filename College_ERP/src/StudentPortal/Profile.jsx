import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  AccountCircle as AccountCircleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Verified as VerifiedIcon,
  Work as WorkIcon,
  LocalLibrary as LocalLibraryIcon,
  Download as DownloadIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Cake as CakeIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Public as PublicIcon,
  LocationCity as LocationCityIcon,
  LocationOn as LocationOnIcon,
  Badge as BadgeIcon,
  Bloodtype as BloodtypeIcon,
  Emergency as EmergencyIcon,
} from "@mui/icons-material";

export default function StudentDetails({ profile }) {
  const idCardRef = useRef(null);
  const [showModal, setShowModal] = useState({ open: false, content: "" });


  // Sample student data (non-editable)
  const studentData = {
    fullName: profile?.name || "John Doe",
    studentId: "JECRC2025001",
    fathersName: "Mr. Robert Doe",
    mothersName: "Mrs. Jane Doe",
    dob: "2003-05-15",
    age: 22,
    gender: "Male",
    mobileNumber: "+91-9876543210",
    email: "john.doe@jecrcu.edu.in",
    address: {
      country: "India",
      state: "Rajasthan",
      district: "Jaipur",
      city: "Jaipur",
      pinCode: "303905",
      fullAddress: "123 Vidhani, Sitapura Industrial Area, Jaipur, Rajasthan 303905",
    },
    educationalHistory: {
      tenth: {
        schoolName: "XYZ High School, Jaipur",
        board: "CBSE",
        marks: "92%",
        yearOfPassing: "2019",
      },
      twelfth: {
        schoolName: "ABC Senior Secondary School, Jaipur",
        board: "CBSE",
        marks: "88%",
        yearOfPassing: "2021",
      },
    },
    bloodGroup: "O+",
    emergencyContact: {
      name: "Mr. Robert Doe",
      relation: "Father",
      phone: "+91-8765432109",
    },
    nationality: "Indian",
    category: "General",
    aadhaarNumber: "1234 5678 9012",
    passportNumber: "N/A",
    department: "Computer Science & Engineering",
    course: "B.Tech (CSE)",
    enrollmentYear: "2023",
    scholarshipStatus: "Active (Merit-Based)",
    academicStatus: "Good Standing",
    cgpa: "8.5",
    placementStatus: "Eligible",
    libraryFines: "₹0",
  };

  // Handle PDF download
  const handleDownloadID = () => {
    if (idCardRef.current) {
      html2canvas(idCardRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("./pratham.jpg");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [87, 124],
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("student_id_card.pdf");
      });
    }
  };

  // Handle clickable feature actions
  const handleFeatureClick = (feature) => {
    let content = "";
    switch (feature) {
      case "profile":
        content = `Name: ${studentData.fullName}\nID: ${studentData.studentId}\nFather's Name: ${studentData.fathersName}\nMother's Name: ${studentData.mothersName}\nDOB: ${studentData.dob}\nAge: ${studentData.age}\nGender: ${studentData.gender}\nMobile: ${studentData.mobileNumber}\nEmail: ${studentData.email}\nAddress: ${studentData.address.fullAddress}\nNationality: ${studentData.nationality}\nCategory: ${studentData.category}\nAadhaar: ${studentData.aadhaarNumber}\nPassport: ${studentData.passportNumber}\nBlood Group: ${studentData.bloodGroup}\nEmergency Contact: ${studentData.emergencyContact.name} (${studentData.emergencyContact.relation}) - ${studentData.emergencyContact.phone}`;
        break;
      case "academic":
        content = `Department: ${studentData.department}\nCourse: ${studentData.course}\nEnrollment Year: ${studentData.enrollmentYear}\nCGPA: ${studentData.cgpa}\nStatus: ${studentData.academicStatus}`;
        break;
      case "education":
        content = `10th: ${studentData.educationalHistory.tenth.schoolName}, ${studentData.educationalHistory.tenth.board}, ${studentData.educationalHistory.tenth.marks}, ${studentData.educationalHistory.tenth.yearOfPassing}\n12th: ${studentData.educationalHistory.twelfth.schoolName}, ${studentData.educationalHistory.twelfth.board}, ${studentData.educationalHistory.twelfth.marks}, ${studentData.educationalHistory.twelfth.yearOfPassing}`;
        break;
      case "scholarship":
        content = `Status: ${studentData.scholarshipStatus}\nCheck eligibility and apply via portal.`;
        break;
      case "certification":
        content = `Status: Verified\nDownload certificates from the academic office.`;
        break;
      case "placement":
        content = `Status: ${studentData.placementStatus}\nView opportunities on placement portal.`;
        break;
      case "library":
        content = `Fines: ${studentData.libraryFines}\nManage books on library portal.`;
        break;
      default:
        content = "Feature details loading...";
    }
    setShowModal({ open: true, content });
  };

  // Close modal
  const closeModal = () => setShowModal({ open: false, content: "" });

  return (
    <div className="p-6 bg-[var(--bg)] dark:bg-[var(--bg)] text-[var(--text)] dark:text-[var(--text)] min-h-[calc(100vh-64px)]">
      {/* Header with Logo and Section Name */}
      <div className="mb-8 flex items-center justify-between bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4">
          <img
            src="/image.png" // Updated to a valid JECRC logo URL
            alt="JECRC University Logo"
            className="h-12"
          />
          <h1 className="text-3xl font-bold">Student Details</h1>
        </div>
      </div>

      {/* Student Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile Overview */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("profile")}
        >
          <div className="flex items-center mb-4">
            <AccountCircleIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Profile Overview</h2>
          </div>
          <p><strong>Name:</strong> {studentData.fullName}</p>
          <p><strong>Father's Name:</strong> {studentData.fathersName}</p>
          <p><strong>Mother's Name:</strong> {studentData.mothersName}</p>
          <p><strong>ID:</strong> {studentData.studentId}</p>
          <p><strong>Department:</strong> {studentData.department}</p>
          <p><strong>Course:</strong> {studentData.course}</p>
          <p><strong>Enrollment Year:</strong> {studentData.enrollmentYear}</p>
        </div>

        {/* Personal Information */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("profile")}
        >
          <div className="flex items-center mb-4">
            <CakeIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          <p><strong>DOB:</strong> {studentData.dob}</p>
          <p><strong>Age:</strong> {studentData.age}</p>
          <p><strong>Gender:</strong> {studentData.gender}</p>
          <p><strong>Mobile:</strong> {studentData.mobileNumber}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Nationality:</strong> {studentData.nationality}</p>
          <p><strong>Category:</strong> {studentData.category}</p>
          <p><strong>Aadhaar:</strong> {studentData.aadhaarNumber}</p>
          <p><strong>Passport:</strong> {studentData.passportNumber}</p>
          <p><strong>Blood Group:</strong> {studentData.bloodGroup}</p>
        </div>

        {/* Address Information */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("profile")}
        >
          <div className="flex items-center mb-4">
            <HomeIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Address Information</h2>
          </div>
          <p><strong>Country:</strong> {studentData.address.country}</p>
          <p><strong>State:</strong> {studentData.address.state}</p>
          <p><strong>District:</strong> {studentData.address.district}</p>
          <p><strong>City:</strong> {studentData.address.city}</p>
          <p><strong>PIN Code:</strong> {studentData.address.pinCode}</p>
          <p><strong>Full Address:</strong> {studentData.address.fullAddress}</p>
        </div>

        {/* Educational History */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("education")}
        >
          <div className="flex items-center mb-4">
            <FamilyRestroomIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Educational History</h2>
          </div>
          <h3 className="text-lg font-medium mb-2">10th Grade</h3>
          <p><strong>School:</strong> {studentData.educationalHistory.tenth.schoolName}</p>
          <p><strong>Board:</strong> {studentData.educationalHistory.tenth.board}</p>
          <p><strong>Marks:</strong> {studentData.educationalHistory.tenth.marks}</p>
          <p><strong>Year:</strong> {studentData.educationalHistory.tenth.yearOfPassing}</p>
          <h3 className="text-lg font-medium mt-4 mb-2">12th Grade</h3>
          <p><strong>School:</strong> {studentData.educationalHistory.twelfth.schoolName}</p>
          <p><strong>Board:</strong> {studentData.educationalHistory.twelfth.board}</p>
          <p><strong>Marks:</strong> {studentData.educationalHistory.twelfth.marks}</p>
          <p><strong>Year:</strong> {studentData.educationalHistory.twelfth.yearOfPassing}</p>
        </div>

        {/* Emergency Contact */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("profile")}
        >
          <div className="flex items-center mb-4">
            <PhoneIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Emergency Contact</h2>
          </div>
          <p><strong>Name:</strong> {studentData.emergencyContact.name}</p>
          <p><strong>Relation:</strong> {studentData.emergencyContact.relation}</p>
          <p><strong>Phone:</strong> {studentData.emergencyContact.phone}</p>
        </div>

        {/* Advanced Features (5-6) */}
        {/* Academic Progress */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("academic")}
        >
          <div className="flex items-center mb-4">
            <SchoolIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Academic Progress</h2>
          </div>
          <p><strong>CGPA:</strong> {studentData.cgpa}</p>
          <p><strong>Status:</strong> {studentData.academicStatus}</p>
        </div>

        {/* Scholarship Tracking */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("scholarship")}
        >
          <div className="flex items-center mb-4">
            <AssessmentIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Scholarship Tracking</h2>
          </div>
          <p><strong>Status:</strong> {studentData.scholarshipStatus}</p>
        </div>

        {/* Certification Verification */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("certification")}
        >
          <div className="flex items-center mb-4">
            <VerifiedIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Certification Verification</h2>
          </div>
          <p><strong>Status:</strong> Verified</p>
        </div>

        {/* Placement Statistics */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("placement")}
        >
          <div className="flex items-center mb-4">
            <WorkIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Placement Statistics</h2>
          </div>
          <p><strong>Status:</strong> {studentData.placementStatus}</p>
        </div>

        {/* Library Status */}
        <div
          className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleFeatureClick("library")}
        >
          <div className="flex items-center mb-4">
            <LocalLibraryIcon className="text-[var(--brand)] dark:text-[var(--brand)] mr-2" />
            <h2 className="text-xl font-semibold">Library Status</h2>
          </div>
          <p><strong>Fines:</strong> {studentData.libraryFines}</p>
        </div>

        {/* ID Card Section */}
        <div className="mb-8 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] dark:border-[var(--border)] pb-2">ID Card</h2>
          <div className="mt-6 flex justify-center">
            <div
              ref={idCardRef}
              className="overflow-hidden shadow-lg rounded-xl bg-white"
              style={{ width: 330, minHeight: 470 }}
            >
              <div style={{ background: "linear-gradient(120deg, #a60514 70%, #fff 30%)", height: 110, position: "relative" }}>
                <img
                  src="./pratham.jpg" // Replace with student photo URL
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
                <div className="text-lg font-bold">{studentData.fullName}</div>
                <div className="text-sm text-red-700 mb-1">Student</div>
                <div className="text-xs mb-1"><b>ID No:</b> {studentData.studentId}</div>
                <div className="text-xs mb-1"><b>Department:</b> {studentData.department}</div>
                <div className="text-xs mb-1"><b>DOB:</b> {studentData.dob}</div>
                <div className="text-xs mb-1"><b>Email:</b> {studentData.email}</div>
                <div className="text-xs mb-1"><b>Phone:</b> {studentData.mobileNumber}</div>
                <div className="text-xs mb-1"><b>Address:</b> {studentData.address.fullAddress}</div>
                <div className="text-xs mb-1"><b>Joined Date:</b> {studentData.enrollmentYear}-07-01</div>
                <div className="text-xs mb-1"><b>Expire Date:</b> {new Date().getFullYear() + 4}-06-30</div>
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
                <div className="text-xs text-right font-semibold">Registrar</div>
              </div>
              <div style={{ background: "#a60514", height: 25 }} />
            </div>
          </div>
          <button
            onClick={handleDownloadID}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--active)] transition-colors"
          >
            <DownloadIcon /> Download ID Card (PDF)
          </button>
        </div>

        {/* Modal for Feature Details */}
        {showModal.open && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-xl w-11/12 md:w-3/4 max-w-2xl p-6 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-[var(--muted)] dark:text-[var(--muted)] hover:text-[var(--accent)]">&times;</button>
              <pre className="text-[var(--text)] dark:text-[var(--text)] whitespace-pre-wrap">{showModal.content}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
    );
}