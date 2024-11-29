// Function to add product to cart and store in session storage
function addToCart(id, name, price) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const product = { id, name, price };

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(item => item.id === id);
  if (existingProductIndex > -1) {
    // If the product already exists in the cart, update the quantity
    cart[existingProductIndex].quantity++;
  } else {
    // If it's a new product, add it to the cart
    product.quantity = 1;
    cart.push(product);
  }

  // Store updated cart in session storage
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Update cart UI
  updateCartUI();
}

// Function to update the cart UI based on session storage
function updateCartUI() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cart.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `${product.name} - $${product.price} x ${product.quantity}`;
    cartList.appendChild(listItem);
  });
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem('cart');
  updateCartUI();
}

// Initial call to update cart UI when the page loads
updateCartUI();
