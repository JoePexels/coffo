document.addEventListener("DOMContentLoaded", () => {
    // Toggle Search Input
    const searchToggle = document.getElementById("search-toggle");
    const searchInput = document.getElementById("search-input");

    searchToggle.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Toggle the display of the search input
      if (searchInput.style.display === "none" || searchInput.style.display === "") {
        searchInput.style.display = "block";
        searchInput.focus(); // Focus on the input when it appears
      } else {
        searchInput.style.display = "none";
      }
    });

    // Search Functionality
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const menuItems = document.querySelectorAll(".menu-item");

      let hasMatch = false;

      menuItems.forEach((item) => {
        const itemName = item.querySelector("h3").textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
          item.style.display = "block"; // Show matching items
          hasMatch = true;
        } else {
          item.style.display = "none"; // Hide non-matching items
        }
      });

      // Scroll to the menu section if there's a match
      if (hasMatch) {
        const menuSection = document.getElementById("menu");
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


document.addEventListener("DOMContentLoaded", () => {
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const navIcons = document.querySelector(".nav-icons");

// Function to handle window resize
const handleResize = () => {
if (window.innerWidth > 768) {
  // Ensure nav-links and nav-icons are visible in desktop view
  navLinks.style.display = "flex";
  navIcons.style.display = "flex";
} else {
  // Hide nav-links and nav-icons in mobile view
  navLinks.style.display = "none";
  navIcons.style.display = "none";
}
};

// Initial call to handleResize
handleResize();

// Add resize event listener
window.addEventListener("resize", handleResize);

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
navIcons.style.display = navIcons.style.display === "flex" ? "none" : "flex";

// Toggle icon
const icon = mobileMenuBtn.querySelector("i");
icon.classList.toggle("fa-bars");
icon.classList.toggle("fa-times");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute("href"));

  if (target) {
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      navLinks.style.display = "none";
      navIcons.style.display = "none";
      mobileMenuBtn.querySelector("i").classList.replace("fa-bars", "fa-times");
    }
  }
});
});

// Navbar Background on Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
if (window.scrollY > 50) {
  navbar.style.backgroundColor = "rgba(26, 26, 26, 0.95)";
  navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
} else {
  navbar.style.backgroundColor = "transparent";
  navbar.style.boxShadow = "none";
}
});
      // Testimonial Slider Auto-scroll
      const testimonialSlider = document.querySelector(".testimonial-slider");
      const dots = document.querySelectorAll(".dot");
      let currentSlide = 0;
      const slides = document.querySelectorAll(".testimonial-card");
  
      function showSlide(index) {
        // Update active dot
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
  
        // Scroll to the slide
        const slideWidth = slides[0].offsetWidth + 30; // width + gap
        testimonialSlider.scrollTo({
          left: slideWidth * index,
          behavior: "smooth",
        });
  
        currentSlide = index;
      }
  
      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });
  
      // Auto slide every 4 seconds
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 4000);
  
      // Animate elements on scroll
      const animateOnScroll = () => {
        const elements = document.querySelectorAll(".feature-card, .menu-item, .testimonial-card, .instagram-item");
  
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
  
          if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        });
      };
  
      // Set initial opacity for animation
      document.querySelectorAll(".feature-card, .menu-item, .testimonial-card, .instagram-item").forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      });
  
      // Initial animation check
      animateOnScroll();
  
      // Animation on scroll
      window.addEventListener("scroll", animateOnScroll);
  
      // Initialize cart count
      const cartCountElement = document.getElementById("cart-count");
  
      // Function to update cart count
      const updateCartCount = () => {
        // Retrieve cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        // Calculate total quantity
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        // Update cart count in the UI
        cartCountElement.textContent = totalQuantity;
      };
  
      // Add to Cart Functionality (Only for Order Now buttons in the menu)
      const orderButtons = document.querySelectorAll(".menu .order-btn");
  
      orderButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default form submission behavior
  
          // Get the item details
          const menuItem = this.closest(".menu-item");
          const itemName = menuItem.querySelector("h3").textContent;
          const itemPrice = menuItem.querySelector(".price").textContent;
          const itemImage = menuItem.querySelector("img").src;
  
          // Create a cart item object
          const cartItem = {
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: 1, // Default quantity is 1
          };
  
          // Get existing cart items from localStorage
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
          // Check if the item already exists in the cart
          const existingItemIndex = cartItems.findIndex(
            (item) => item.name === cartItem.name
          );
  
          if (existingItemIndex !== -1) {
            // If the item exists, increment its quantity
            cartItems[existingItemIndex].quantity += 1;
          } else {
            // If the item doesn't exist, add it to the cart
            cartItems.push(cartItem);
          }
  
          // Save the updated cart items to localStorage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
          // Update cart count in the UI
          updateCartCount();
  
          // Show confirmation animation
          this.innerHTML = "✓ Added to Cart";
          this.style.backgroundColor = "#4CAF50";
  
          // Reset button after 2 seconds
          setTimeout(() => {
            this.innerHTML = "Order Now";
            this.style.backgroundColor = "";
          }, 2000);
        });
      });
  
      // Redirect to carts.html when the cart icon is clicked
      const cartIcon = document.querySelector(".cart-icon");
      cartIcon.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        window.location.href = "carts.html"; // Redirect to carts.html
      });
  
      // Filter Menu Items
      const filterButtons = document.querySelectorAll(".filter-buttons .btn-primary");
      const menuItems = document.querySelectorAll(".menu-item");
  
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          // Add active class to the clicked button
          button.classList.add("active");
  
          // Get the filter value
          const filter = button.getAttribute("data-filter");
  
          // Filter menu items
          menuItems.forEach((item) => {
            const category = item.getAttribute("data-category");
            if (filter === "all" || category === filter) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });
  
      // Initialize cart count on page load
      updateCartCount();
    });

            // Function to update cart count on the main page
    function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCountElement = document.getElementById("cart-count");
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
    }

    // Call this function when the page loads
    document.addEventListener("DOMContentLoaded", updateCartCount);

    // Go to Top Button
const goToTopButton = document.getElementById("go-to-top");

// Show or hide the button based on scroll position
window.addEventListener("scroll", () => {
if (window.scrollY > 300) {
goToTopButton.style.display = "block"; // Show the button
} else {
goToTopButton.style.display = "none"; // Hide the button
}
});

// Scroll to top when the button is clicked
goToTopButton.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth", // Smooth scroll
});
});
  