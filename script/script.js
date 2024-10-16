document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();

    // Función para añadir al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.product;
            const productPrice = parseFloat(event.target.dataset.price);
            addToCart(productName, productPrice);
        });
    });

    // Función para búsqueda y redirección
    document.getElementById('search-btn').addEventListener('click', buscarProducto);
    
    // Aplicar cupón si es válido
    const applyCouponButton = document.getElementById('apply-coupon-btn');
    if (applyCouponButton) {
        applyCouponButton.addEventListener('click', applyCoupon);
    }
});

let cart = [];
let discount = 0;
let couponCode = 'CUPON30';
let couponApplied = false;

// Función para cargar carrito de localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedDiscount = localStorage.getItem('discount');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    if (savedDiscount) {
        discount = parseFloat(savedDiscount);
        couponApplied = true;
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}

// Función para añadir un producto al carrito
function addToCart(productName, price) {
    const product = { name: productName, price: price };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} ha sido añadido al carrito.`);
}

// Función para la búsqueda
function buscarProducto() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.includes("mochila de niños")) {
        window.location.href = "catalogo-niños.html";
    } else if (searchTerm.includes("mochila de montañas")) {
        window.location.href = "catalogomontaña.html";
    } else if (searchTerm.includes("mochila deportiva")) {
        window.location.href = "catalogo-deportiva.html";
    } else if (searchTerm.includes("mochila estandar")) {
        window.location.href = "catalogo-estandar.html";
    } else {
        alert("No se encontró el tipo de mochila que buscas.");
    }
}

// Función para generar el cupón
function generarCupon() {
    const cuponElement = document.getElementById('cupon-codigo');
    cuponElement.style.display = "block";
    alert("¡Cupón generado! Usa el código CUPON30 para un 30% de descuento.");
}

// Función para aplicar el cupón
function applyCoupon() {
    const enteredCoupon = document.getElementById('coupon-input').value;
    if (enteredCoupon === couponCode) {
        if (!couponApplied) {
            discount = 0.30; // 30% de descuento
            localStorage.setItem('discount', discount);
            couponApplied = true;
            alert("¡Cupón aplicado correctamente! 30% de descuento en tu compra.");
        } else {
            alert("El cupón ya ha sido aplicado.");
        }
    } else {
        alert("Cupón no válido.");
    }
}

// Función para calcular el total con el cupón aplicado
function calculateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    let total = subtotal;
    
    if (couponApplied) {
        total = subtotal - (subtotal * discount);
    }
    
    return { subtotal: subtotal.toFixed(2), total: total.toFixed(2) };
}

// Función para mostrar el total del carrito en la página del carrito
function displayCartTotals() {
    const totals = calculateTotal();
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement && totalElement) {
        subtotalElement.textContent = `Subtotal: S/. ${totals.subtotal}`;
        totalElement.textContent = `Total: S/. ${totals.total}`;
    }
}

// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
