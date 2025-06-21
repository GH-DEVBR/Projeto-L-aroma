// Animação de aparecer ao rolar
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));

// Menu responsivo
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Carrinho de compras
const CART_KEY = 'carrinho';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantidade++;
  } else {
    cart.push({ ...item, quantidade: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, i) => sum + i.quantidade, 0);
  const el = document.querySelector('.cart-count');
  if (el) el.textContent = count;
}

// Adiciona produto ao carrinho ao clicar
document.addEventListener('click', (event) => {
  if (event.target.matches('.add-to-cart')) {
    const btn = event.target;
    const link = btn.closest('a.product-link');
    if (!link) return;
    const url = new URL(link.href, window.location.origin);
    const id = Number(url.searchParams.get('id'));
    const nome = link.querySelector('.product-name').textContent.trim();
    const precoText = link.querySelector('.current-price').textContent;
    const preco = parseFloat(
      precoText.replace('R$', '').replace('.', '').replace(',', '.')
    );
    addToCart({ id, nome, preco });
    alert('Produto adicionado ao carrinho!');
  }
});

// Atualiza contador no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});





