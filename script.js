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

// Render Product List
function renderProducts() {
  productList.innerHTML = ""; // Clear previous content
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.id)));
  });
}

// Render Cart List
function renderCart() {
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartList.innerHTML = ""; // Clear previous content
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add Item to Cart
function addToCart(productId) {
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);
  if (product) {
    cartData.push(product); // Add product to cart
    sessionStorage.setItem("cart", JSON.stringify(cartData)); // Save to session storage
    renderCart(); // Update cart UI
  }
}

// Clear Cart
function clearCart() {
  sessionStorage.removeItem("cart"); // Remove cart from session storage
  renderCart(); // Re-render the cart
}

// Initial Render
renderProducts();
renderCart();

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);
