// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Cart functionality
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Feedback visual
  const button = event.target;
  button.textContent = '✔ Adicionado';
  button.style.backgroundColor = '#4CAF50';
  
  setTimeout(() => {
    button.textContent = 'Adicionar ao Carrinho';
    button.style.backgroundColor = '';
  }, 2000);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.cart-count').forEach(count => {
    count.textContent = cart.length;
  });
}

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.closest('.product-info').querySelector('h3').textContent;
    const price = this.closest('.product-info').querySelector('.product-price').textContent;
    addToCart(productName, price);
  });
});

// Initialize cart count
document.addEventListener('DOMContentLoaded', updateCartCount);

// Reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));


