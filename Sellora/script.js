document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let cart = [];

  // Fetch products from Node.js API
  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
      });
    });

  // Add to cart
  window.addToCart = (id) => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(response => response.json())
      .then(product => {
        cart.push(product);
        updateCart();
      });
  };

  // Remove from cart
  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
  };

  // Update cart UI
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <div>
          <span>$${item.price.toFixed(2)}</span>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
});