document.addEventListener("DOMContentLoaded", () => {
  // Get the cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Get the container to display cart items
  const cartItemsContainer = document.querySelector(".cart-items");

  // Get the empty cart message
  const emptyCartMessage = document.querySelector(".empty-cart-message");

  // Get elements for cart summary
  const subtotalElement = document.querySelector(".subtotal");
  const taxElement = document.querySelector(".tax");
  const totalElement = document.querySelector(".total-amount");

  // Function to render cart items
  function renderCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear existing items

    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        // Calculate the total price for this item
        const price = Number.parseFloat(item.price.replace("$", ""));
        const totalPrice = price * item.quantity;

        cartItemElement.innerHTML = `
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.description || "Delicious coffee"}</p>
            <span class="price">${item.price}</span>
          </div>
          <div class="item-actions">
            <div class="item-quantity">
              <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
              <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input">
              <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
            </div>
            <div class="item-total">
              <span>$${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-btn"><i class="fas fa-trash"></i></button>
        `;

        // Add event listeners for quantity and remove buttons
        const decreaseButton = cartItemElement.querySelector(".decrease");
        const increaseButton = cartItemElement.querySelector(".increase");
        const quantityInput = cartItemElement.querySelector(".quantity-input");
        const removeButton = cartItemElement.querySelector(".remove-btn");

        decreaseButton.addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity--;
            quantityInput.value = item.quantity;
            updateCartTotals();
            saveCartToLocalStorage();
          }
        });

        increaseButton.addEventListener("click", () => {
          if (item.quantity < 10) {
            item.quantity++;
            quantityInput.value = item.quantity;
            updateCartTotals();
            saveCartToLocalStorage();
          }
        });

        quantityInput.addEventListener("change", () => {
          const value = Number.parseInt(quantityInput.value);
          if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
          } else if (value > 10) {
            quantityInput.value = 10;
          }
          item.quantity = value;
          updateCartTotals();
          saveCartToLocalStorage();
        });

        removeButton.addEventListener("click", () => {
          cartItems.splice(index, 1); // Remove item from cart
          renderCartItems(); // Re-render cart items
          updateCartTotals();
          saveCartToLocalStorage();
        });

        cartItemsContainer.appendChild(cartItemElement);
      });

      // Hide the empty cart message
      emptyCartMessage.style.display = "none";
    } else {
      // Show the empty cart message if no items are in the cart
      emptyCartMessage.style.display = "block";
    }
  }

  // Function to update cart totals
  function updateCartTotals() {
    let subtotal = 0;

    cartItems.forEach((item) => {
      const price = Number.parseFloat(item.price.replace("$", ""));
      subtotal += price * item.quantity;
    });

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Function to save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Initialize cart
  renderCartItems();
  updateCartTotals();
});


document.addEventListener("DOMContentLoaded", () => {
const checkoutButton = document.getElementById("checkout");

checkoutButton.addEventListener("click", () => {
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
localStorage.setItem("cartItems", JSON.stringify(cartItems));
window.location.href = "checkout.html";
});
});

document.addEventListener("DOMContentLoaded", () => {
// Existing code for initializing cart and rendering items...

// Define valid promo codes
const validPromoCodes = {
"SAVE10": 0.10, // 10% discount
"FREESHIP": 1.00 // Example for free shipping; adjust as needed
};

// Select the button, input, and message div
const applyPromoButton = document.getElementById("apply-promo-button");
const promoInput = document.getElementById("promo-input");
const promoMessage = document.getElementById("promo-message");

// Event listener for the promo code button
applyPromoButton.addEventListener("click", () => {
const promoCode = promoInput.value.trim().toUpperCase();  // Normalize the input

if (validPromoCodes[promoCode] !== undefined) {
    // If the promo code is valid
    const discount = validPromoCodes[promoCode];
    promoMessage.innerHTML = `<div class="promo-success">Promo code applied successfully! Discount: ${discount * 100}%</div>`;
    
    // Update totals with the discount
    updateCartTotals(discount);
} else {
    // If the promo code is invalid
    promoMessage.innerHTML = `<div class="promo-error">Invalid promo code! Please try again.</div>`;
}
});

function updateCartTotals(discount = 0) {
let subtotal = 0;

cartItems.forEach((item) => {
    const price = Number.parseFloat(item.price.replace("$", ""));
    subtotal += price * item.quantity;
});

const tax = subtotal * 0.1; // 10% tax
const total = subtotal + tax - (subtotal * discount); // Apply discount if any

// Update the UI components
subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
taxElement.textContent = `$${tax.toFixed(2)}`;
totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize your cart rendering and totals
renderCartItems();
updateCartTotals();
});
