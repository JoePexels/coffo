document.addEventListener("DOMContentLoaded", () => {
// Payment method toggle
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const creditCardForm = document.getElementById("creditCardForm");

paymentMethods.forEach((method) => {
   method.addEventListener("change", function () {
       if (this.id === "creditCard") {
           creditCardForm.style.display = "block";
       } else {
           creditCardForm.style.display = "none";
       }
   });
});

// Get the cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Get the container for the order summary items
const summaryItemsContainer = document.querySelector(".summary-items");

// Clear existing items
summaryItemsContainer.innerHTML = "";

// Calculate subtotal
let subtotal = 0;

// Display each cart item in the order summary
cartItems.forEach((item) => {
   const price = parseFloat(item.price.replace("$", ""));
   const totalPrice = price * item.quantity;
   subtotal += totalPrice;

   const itemElement = document.createElement("div");
   itemElement.classList.add("summary-item-product");

   itemElement.innerHTML = `
       <div class="product-image">
           <img src="${item.image}" alt="${item.name}">
       </div>
       <div class="product-details">
           <h3>${item.name}</h3>
           <p>Quantity: ${item.quantity}</p>
           <span class="product-price">$${totalPrice.toFixed(2)}</span>
       </div>
   `;

   summaryItemsContainer.appendChild(itemElement);
});

// Update the subtotal, tax, and total
const tax = subtotal * 0.1; // 10% tax
const total = subtotal + tax;

document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
document.getElementById("total-cost").textContent = `$${total.toFixed(2)}`;

// Delivery option selection
const deliveryOptions = document.querySelectorAll('input[name="deliveryOption"]');
const shippingCost = document.getElementById("shipping-cost");
const totalCost = document.getElementById("total-cost");

deliveryOptions.forEach((option) => {
   option.addEventListener("change", function () {
       let shipping = 0;

       if (this.id === "express") {
           shipping = 5.99;
       } else if (this.id === "sameDay") {
           shipping = 9.99;
       }

       shippingCost.textContent = `$${shipping.toFixed(2)}`;

       // Update total
       const total = subtotal + tax + shipping;
       totalCost.textContent = `$${total.toFixed(2)}`;
   });
});

// Form validation
const checkoutForm = document.querySelector(".checkout-form");
const placeOrderBtn = document.querySelector(".place-order-btn");

placeOrderBtn.addEventListener("click", function (e) {
   e.preventDefault();

   // Basic validation
   const requiredFields = document.querySelectorAll("[required]");
   let isValid = true;

   requiredFields.forEach((field) => {
       if (!field.value.trim()) {
           isValid = false;
           field.style.border = "1px solid #ff6b6b";
           field.style.boxShadow = "0 0 0 2px rgba(255, 107, 107, 0.2)";
       } else {
           field.style.border = "1px solid rgba(255, 255, 255, 0.1)";
           field.style.boxShadow = "none";
       }
   });

   if (isValid) {
       // Show loading state
       this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
       this.disabled = true;

       // Simulate processing (would be replaced with actual form submission)
       setTimeout(() => {
           // Redirect to confirmation page
           window.location.href = "confirmation.html";
       }, 2000);
   } else {
       // Scroll to the first invalid field
       const firstInvalidField = document.querySelector("[required]:invalid");
       if (firstInvalidField) {
           firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
       }
   }
});

// Format credit card input
const cardNumberInput = document.getElementById("cardNumber");
if (cardNumberInput) {
   cardNumberInput.addEventListener("input", function (e) {
       let value = this.value.replace(/\D/g, "");
       if (value.length > 16) {
           value = value.slice(0, 16);
       }

       // Format with spaces every 4 digits
       let formattedValue = "";
       for (let i = 0; i < value.length; i++) {
           if (i > 0 && i % 4 === 0) {
               formattedValue += " ";
           }
           formattedValue += value[i];
       }

       this.value = formattedValue;
   });
}

// Format expiration date
const expDateInput = document.getElementById("expDate");
if (expDateInput) {
   expDateInput.addEventListener("input", function (e) {
       let value = this.value.replace(/\D/g, "");
       if (value.length > 4) {
           value = value.slice(0, 4);
       }

       // Format as MM/YY
       if (value.length > 2) {
           this.value = value.slice(0, 2) + "/" + value.slice(2);
       } else {
           this.value = value;
       }
   });
}

// Format CVV (3 or 4 digits only)
const cvvInput = document.getElementById("cvv");
if (cvvInput) {
   cvvInput.addEventListener("input", function (e) {
       let value = this.value.replace(/\D/g, "");
       if (value.length > 4) {
           value = value.slice(0, 4);
       }
       this.value = value;
   });
}
});
