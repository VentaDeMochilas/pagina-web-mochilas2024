document.addEventListener('DOMContentLoaded', function () {
    loadCartFromLocalStorage();
    displayCartItems();

    // Aplicar cupón
    document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
    document.getElementById('finalize-order-btn').addEventListener('click', finalizeOrder);
});

let cart = [];
let discount = 0;
let couponApplied = false;

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedDiscount = localStorage.getItem('discount');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    if (savedDiscount) {
        discount = parseFloat(savedDiscount);
        couponApplied = true;
    }
    updateCartTotals();
}

// Mostrar productos del carrito
function displayCartItems() {
    const cartItemsTbody = document.getElementById('cart-items-tbody');
    cartItemsTbody.innerHTML = '';

    cart.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input"></td>
            <td>S/. ${item.price}</td>
            <td>S/. ${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item-btn" data-index="${index}">Eliminar</button></td>
        `;
        cartItemsTbody.appendChild(tr);
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    updateCartTotals();
}

// Actualizar cantidad
function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Eliminar producto
function removeItem(event) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Calcular el total del carrito
function updateCartTotals() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;
    
    if (couponApplied) {
        total = subtotal - (subtotal * discount);
    }
    
    document.getElementById('subtotal').textContent = `Subtotal: S/. ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: S/. ${total.toFixed(2)}`;
}

// Aplicar cupón
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input').value;
    if (couponInput === 'CUPON30' && !couponApplied) {
        discount = 0.30;
        localStorage.setItem('discount', discount);
        couponApplied = true;
        alert("Cupón aplicado: 30% de descuento");
        updateCartTotals();
    } else {
        alert("Cupón no válido o ya aplicado.");
    }
}

// Finalizar pedido
function finalizeOrder() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("Pedido finalizado con éxito.");
    localStorage.removeItem('cart');
    localStorage.removeItem('discount');
    cart = [];
    displayCartItems();
}
