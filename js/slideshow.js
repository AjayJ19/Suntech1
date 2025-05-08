let slideIndex = 0
const slides = document.getElementsByClassName("slides")
const dots = document.getElementsByClassName("dot")

// Initialize slideshow
document.addEventListener("DOMContentLoaded", () => {
  showSlides()
})

// Next/previous controls
function plusSlides(n) {
  showSlidesByIndex((slideIndex += n))
}

// Thumbnail image controls
function currentSlide(n) {
  showSlidesByIndex((slideIndex = n - 1))
}

function showSlides() {
  let i

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "")
  }

  // Increment slide index
  slideIndex++

  // Reset to first slide if at the end
  if (slideIndex > slides.length) {
    slideIndex = 1
  }

  // Display the current slide and activate corresponding dot
  slides[slideIndex - 1].style.display = "block"
  dots[slideIndex - 1].className += " active-dot"

  // Change slide every 5 seconds
  setTimeout(showSlides, 5000)
}

function showSlidesByIndex(n) {
  let i

  // Reset to first slide if past the end
  if (n > slides.length) {
    slideIndex = 1
  }

  // Go to last slide if before the beginning
  if (n < 1) {
    slideIndex = slides.length
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "")
  }

  // Display the current slide and activate corresponding dot
  slides[slideIndex - 1].style.display = "block"
  dots[slideIndex - 1].className += " active-dot"
}

