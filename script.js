// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Parallax effect
window.addEventListener("scroll", () => {
  const parallaxSections = document.querySelectorAll(".parallax-effect")
  parallaxSections.forEach((section) => {
    const scrollPosition = window.pageYOffset
    section.style.backgroundPositionY = scrollPosition * 0.7 + "px"
  })
})

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.style.backgroundColor = "rgba(74, 44, 42, 0.9)"
  } else {
    header.style.backgroundColor = "transparent"
  }
})

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".feature-card, .menu-item, .testimonial-card")
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("animate")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Testimonial slider
const testimonialSlider = document.querySelector(".testimonial-slider")
let isDown = false
let startX
let scrollLeft

testimonialSlider.addEventListener("mousedown", (e) => {
  isDown = true
  startX = e.pageX - testimonialSlider.offsetLeft
  scrollLeft = testimonialSlider.scrollLeft
})

testimonialSlider.addEventListener("mouseleave", () => {
  isDown = false
})

testimonialSlider.addEventListener("mouseup", () => {
  isDown = false
})

testimonialSlider.addEventListener("mousemove", (e) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - testimonialSlider.offsetLeft
  const walk = (x - startX) * 2
  testimonialSlider.scrollLeft = scrollLeft - walk
})

// Form submission
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = form.querySelector('input[type="email"]').value
  // Here you would typically send this data to a server
  console.log(`Subscribed with email: ${email}`)
  alert("Thank you for subscribing!")
  form.reset()
})

// Animate trusted companies
const trustedCompanies = document.querySelector(".trusted-companies")
let animationFrame

const animateTrustedCompanies = () => {
  trustedCompanies.style.transform = `translateX(-${scrollPosition}px)`
  scrollPosition += 1
  if (scrollPosition >= trustedCompanies.scrollWidth / 2) {
    scrollPosition = 0
  }
  animationFrame = requestAnimationFrame(animateTrustedCompanies)
}

let scrollPosition = 0
animateTrustedCompanies()

// Pause animation on hover
trustedCompanies.addEventListener("mouseenter", () => {
  cancelAnimationFrame(animationFrame)
})

trustedCompanies.addEventListener("mouseleave", () => {
  animateTrustedCompanies()
})

