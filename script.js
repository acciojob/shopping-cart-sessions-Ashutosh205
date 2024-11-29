// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from session storage or initialize an empty one
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current cart display
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Save cart to session storage
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== parseInt(productId));
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Save cart to session storage
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Clear cart from session storage
  renderCart();
}

// Event listeners
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event.target.getAttribute("data-id"));
  } else if (event.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(event.target.getAttribute("data-id"));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
