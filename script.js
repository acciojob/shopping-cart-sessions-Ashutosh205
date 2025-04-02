// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// HTML elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from sessionStorage or initialize it
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to render products
function renderProducts() {
  productList.innerHTML = ""; // Clear previous products
  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });
}

// Function to render the cart
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart items
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} (x${item.quantity})`;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(item.id));
    li.appendChild(removeBtn);

    cartList.appendChild(li);
  });
}

// Function to add a product to the cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Function to clear the cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Event listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Initialize page
renderProducts();
renderCart();
