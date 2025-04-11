// Tilt effect for cards
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});


// Team Slider Functionality
const slider = document.querySelector(".team-slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let scrollAmount = 0;
const cardWidth = slider.querySelector(".team-card").offsetWidth + 20; // Card width + gap
const maxScroll = slider.scrollWidth - slider.clientWidth;

// Function to scroll to the next card
const scrollNext = () => {
if (scrollAmount >= maxScroll) {
    scrollAmount = 0; // Reset to the first card
} else {
    scrollAmount += cardWidth;
}
slider.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
});
};

// Function to scroll to the previous card
const scrollPrev = () => {
if (scrollAmount <= 0) {
    scrollAmount = maxScroll; // Reset to the last card
} else {
    scrollAmount -= cardWidth;
}
slider.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
});
};

// Manual navigation buttons
prevButton.addEventListener("click", () => {
scrollPrev();
});

nextButton.addEventListener("click", () => {
scrollNext();
});

// Auto-scroll functionality
let autoScrollInterval;

const startAutoScroll = () => {
autoScrollInterval = setInterval(scrollNext, 3000); // Scroll every 3 seconds
};

const stopAutoScroll = () => {
clearInterval(autoScrollInterval);
};

// Start auto-scroll on page load
startAutoScroll();

// Pause auto-scroll on slider hover
slider.addEventListener("mouseenter", stopAutoScroll);
slider.addEventListener("mouseleave", startAutoScroll);


// Parallax Effect
window.addEventListener('scroll', function() {
    const parallaxSection = document.querySelector('.parallax-section');
    const scrollPosition = window.pageYOffset;

    parallaxSection.style.backgroundPositionY = -scrollPosition * 0.5 + 'px'; // Adjust the multiplier for the speed
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


