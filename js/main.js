document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById("hamburger-menu")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle the current item
        item.classList.toggle("active")
      })
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")
  const formMessage = document.getElementById("form-message")

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Simulate form submission
      formMessage.innerHTML = "Sending your message..."
      formMessage.className = "form-message"

      setTimeout(() => {
        formMessage.innerHTML = "Your message has been sent successfully! We will get back to you soon."
        formMessage.className = "form-message success"
        contactForm.reset()
      }, 1500)
    })
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Set active class on current navigation link
  const navLinksList = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop();
  navLinksList.forEach(link => {
    // Remove any existing 'active' class
    link.classList.remove('active');
    // If the link href matches the current page, set 'active'
    if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
})

