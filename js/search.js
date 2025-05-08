// Assume students data is imported or defined here.  For example:
// import students from './students-data.js';
// Or:
const students = [
  {
    rollNumber: "STU001",
    name: "John Doe",
    course: "Computer Science",
    courseCode: "CS101",
    feeStatus: "Paid",
    admissionDate: "2023-09-01",
    contactNumber: "123-456-7890",
    email: "john.doe@example.com",
    courseDetails: {
      instructor: "Jane Smith",
      duration: "4 years",
      schedule: "Mon/Wed/Fri",
      completionStatus: "In Progress",
      nextExamDate: "2024-05-15",
    },
  },
  {
    rollNumber: "STU002",
    name: "Alice Smith",
    course: "Electrical Engineering",
    courseCode: "EE201",
    feeStatus: "Pending",
    admissionDate: "2023-08-15",
    contactNumber: "987-654-3210",
    email: "alice.smith@example.com",
    courseDetails: {
      instructor: "Bob Johnson",
      duration: "4 years",
      schedule: "Tue/Thu",
      completionStatus: "In Progress",
      nextExamDate: "2024-06-20",
    },
  },
  {
    rollNumber: "STU003",
    name: "Bob Johnson",
    course: "Mechanical Engineering",
    courseCode: "ME301",
    feeStatus: "Overdue",
    admissionDate: "2023-07-01",
    contactNumber: "555-123-4567",
    email: "bob.johnson@example.com",
    courseDetails: {
      instructor: "Carol Williams",
      duration: "4 years",
      schedule: "Mon/Wed",
      completionStatus: "Completed",
      nextExamDate: "N/A",
    },
  },
]

// Function to search for student by roll number
function searchStudent() {
  const rollNumber = document.getElementById("roll-number").value.trim().toUpperCase()
  const searchResult = document.getElementById("search-result")

  // Show the search result container
  searchResult.style.display = "block"

  // Find the student in the database
  const student = students.find((s) => s.rollNumber === rollNumber)

  if (student) {
    // Create HTML for student information
    let feeStatusClass = ""
    if (student.feeStatus === "Paid") {
      feeStatusClass = "fee-paid"
    } else if (student.feeStatus === "Pending") {
      feeStatusClass = "fee-pending"
    } else if (student.feeStatus === "Overdue") {
      feeStatusClass = "fee-overdue"
    }

    const html = `
            <div class="student-info">
                <h3>Student Information</h3>
                <div class="student-details">
                    <div class="detail-group">
                        <h4>Roll Number</h4>
                        <p>${student.rollNumber}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Name</h4>
                        <p>${student.name}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Course</h4>
                        <p>${student.course} (${student.courseCode})</p>
                    </div>
                    <div class="detail-group">
                        <h4>Fee Status</h4>
                        <p><span class="fee-status ${feeStatusClass}">${student.feeStatus}</span></p>
                    </div>
                    <div class="detail-group">
                        <h4>Admission Date</h4>
                        <p>${student.admissionDate}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Contact</h4>
                        <p>${student.contactNumber}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Email</h4>
                        <p>${student.email}</p>
                    </div>
                </div>
            </div>
            
            <div class="course-details">
                <h3>Course Details</h3>
                <div class="course-info">
                    <div class="detail-group">
                        <h4>Instructor</h4>
                        <p>${student.courseDetails.instructor}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Duration</h4>
                        <p>${student.courseDetails.duration}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Schedule</h4>
                        <p>${student.courseDetails.schedule}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Completion Status</h4>
                        <p>${student.courseDetails.completionStatus}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Next Exam Date</h4>
                        <p>${student.courseDetails.nextExamDate}</p>
                    </div>
                </div>
            </div>
        `

    searchResult.innerHTML = html
  } else {
    // No student found
    searchResult.innerHTML = `
            <div class="no-result">
                <p>No student found with roll number: ${rollNumber}</p>
                <p>Please check the roll number and try again.</p>
            </div>
        `
  }
}

// Function for quick search on homepage
function quickSearch() {
  const rollNumber = document.getElementById("quick-roll-number").value.trim().toUpperCase()
  const quickSearchResult = document.getElementById("quick-search-result")

  // Show the search result container
  quickSearchResult.style.display = "block"

  // Find the student in the database
  const student = students.find((s) => s.rollNumber === rollNumber)

  if (student) {
    // Create HTML for student information (simplified version)
    let feeStatusClass = ""
    if (student.feeStatus === "Paid") {
      feeStatusClass = "fee-paid"
    } else if (student.feeStatus === "Pending") {
      feeStatusClass = "fee-pending"
    } else if (student.feeStatus === "Overdue") {
      feeStatusClass = "fee-overdue"
    }

    const html = `
            <div class="student-info">
                <h3>${student.name} (${student.rollNumber})</h3>
                <div class="student-details">
                    <div class="detail-group">
                        <h4>Course</h4>
                        <p>${student.course}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Fee Status</h4>
                        <p><span class="fee-status ${feeStatusClass}">${student.feeStatus}</span></p>
                    </div>
                </div>
                <p class="search-note">For detailed information, visit the <a href="students.html">Student Portal</a></p>
            </div>
        `

    quickSearchResult.innerHTML = html
  } else {
    // No student found
    quickSearchResult.innerHTML = `
            <div class="no-result">
                <p>No student found with roll number: ${rollNumber}</p>
                <p>Please check the roll number and try again.</p>
            </div>
        `
  }
}

