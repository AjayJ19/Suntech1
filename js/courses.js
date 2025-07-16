// Function to filter courses by category
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const courseCards = document.querySelectorAll(".course-card")

  if (filterBtns.length > 0 && courseCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((otherBtn) => {
          otherBtn.classList.remove("active")
        })

        // Add active class to clicked button
        btn.classList.add("active")

        const filter = btn.getAttribute("data-filter")

        // Show/hide courses based on filter
        courseCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Course search functionality
  const searchInput = document.getElementById("course-search")
  const searchBtn = document.getElementById("search-btn")

  if (searchInput && searchBtn && courseCards.length > 0) {
    function searchCourses() {
      const searchTerm = searchInput.value.toLowerCase()

      courseCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase()
        const description = card.querySelector("p").textContent.toLowerCase()

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }

    searchBtn.addEventListener("click", searchCourses)
    searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        searchCourses()
      }
    })
  }

  // Course modal functionality
  const modal = document.getElementById("course-modal")
  const closeModal = document.querySelector(".close-modal")

  if (modal && closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  }
})

// Sample courses data (replace with your actual data or import)
const courses = {
  1: {
    title: "Introduction to Web Development",
    code: "WD101",
    description: "Learn the basics of HTML, CSS, and JavaScript.",
    instructor: "Arjun Kumar",
    duration: "8 weeks",
    level: "Beginner",
    fee: "$200",
    schedule: "Mondays and Wednesdays, 6-8 PM",
    prerequisites: "None",
    syllabus: ["HTML Basics", "CSS Fundamentals", "JavaScript Introduction"],
    outcomes: ["Build a basic website", "Understand web development concepts"],
  },
  2: {
    title: "Advanced JavaScript",
    code: "JS201",
    description: "Deep dive into JavaScript concepts and frameworks.",
    instructor: "Kavitha Devi",
    duration: "10 weeks",
    level: "Intermediate",
    fee: "$300",
    schedule: "Tuesdays and Thursdays, 7-9 PM",
    prerequisites: "Basic JavaScript knowledge",
    syllabus: ["ES6 Features", "React.js", "Node.js"],
    outcomes: ["Develop complex web applications", "Work with modern JavaScript frameworks"],
  },
}

// Function to show course details in modal
function showCourseDetails(courseId) {
  const modal = document.getElementById("course-modal")
  const modalContent = document.getElementById("modal-content-container")

  if (modal && modalContent && courses[courseId]) {
    const course = courses[courseId]

    let syllabusHtml = ""
    course.syllabus.forEach((item) => {
      syllabusHtml += `<li>${item}</li>`
    })

    let outcomesHtml = ""
    course.outcomes.forEach((item) => {
      outcomesHtml += `<li>${item}</li>`
    })

    const html = `
            <div class="course-modal-content">
                <h2>${course.title}</h2>
                <p class="course-code">Course Code: ${course.code}</p>
                
                <div class="course-section">
                    <h3>Description</h3>
                    <p>${course.description}</p>
                </div>
                
                <div class="course-details-grid">
                    <div class="course-section">
                        <h3>Course Information</h3>
                        <ul class="course-info-list">
                            <li><strong>Instructor:</strong> ${course.instructor}</li>
                            <li><strong>Duration:</strong> ${course.duration}</li>
                            <li><strong>Level:</strong> ${course.level}</li>
                            <li><strong>Fee:</strong> ${course.fee}</li>
                            <li><strong>Schedule:</strong> ${course.schedule}</li>
                            <li><strong>Prerequisites:</strong> ${course.prerequisites}</li>
                        </ul>
                    </div>
                    
                    <div class="course-section">
                        <h3>Syllabus</h3>
                        <ul class="syllabus-list">
                            ${syllabusHtml}
                        </ul>
                    </div>
                </div>
                
                <div class="course-section">
                    <h3>Learning Outcomes</h3>
                    <ul class="outcomes-list">
                        ${outcomesHtml}
                    </ul>
                </div>
                
                <div class="course-actions">
                    <a href="contact.html" class="btn primary-btn">Enroll Now</a>
                    <a href="#" class="btn secondary-btn">Download Syllabus</a>
                </div>
            </div>
        `

    modalContent.innerHTML = html
    modal.style.display = "block"
  }
}

