document.addEventListener('DOMContentLoaded', function() {
    
    loadCartItems();
    
   
    setupCartEvents();
    setupCheckout();
    setupPaymentModal();
});


function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <img src="media/carrito.jpg" alt="Carrito vacío">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega servicios desde nuestra página principal</p>
                <a href="index.html" class="btn">Ver Servicios</a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/default-dental.jpg'">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="btn quantity-btn decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="btn quantity-btn increase">+</button>
                    </div>
                    <p class="item-subtotal">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="btn remove-btn">&times;</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    document.querySelector('.cart-summary').style.display = 'block';
    updateCartTotal();
}


function setupCartEvents() {
    
    document.addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        
        const productId = parseInt(cartItem.dataset.id);
        
        
        if (e.target.classList.contains('increase')) {
            updateCartItemQuantity(productId, 1);
        }
        
        
        if (e.target.classList.contains('decrease')) {
            updateCartItemQuantity(productId, -1);
        }
        
        
        if (e.target.classList.contains('remove-btn')) {
            removeFromCart(productId);
        }
    });
}


function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        
        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}


function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}


function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13; 
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}


function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
           
            document.getElementById('payment-modal').style.display = 'flex';
        });
    }
}


function setupPaymentModal() {
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('payment-form');
    
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}


function processPayment() {
    
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    
    if (!cardName || !cardNumber) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    
    document.getElementById('payment-modal').style.display = 'none';
    
    
    generateInvoice();
}


function generateInvoice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('currentUser')) || { email: 'Invitado' };
    const now = new Date();
    
    
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
    
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;
    
    
    document.getElementById('invoice-number').textContent = invoiceNumber;
    document.getElementById('invoice-date').textContent = now.toLocaleDateString('es-ES');
    document.getElementById('customer-email').textContent = user.email;
    
    
    const invoiceItemsBody = document.getElementById('invoice-items-body');
    let itemsHtml = '';
    
    cart.forEach(item => {
        itemsHtml += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });
    
    invoiceItemsBody.innerHTML = itemsHtml;
    
    
    document.getElementById('invoice-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('invoice-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('invoice-total').textContent = `$${total.toFixed(2)}`;
    
    
    document.getElementById('invoice').style.display = 'block';
    document.querySelector('.cart-container').style.display = 'none';
}


function completePurchase() {
    
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('currentUser')) || { email: 'Invitado' };
    
    if (cart.length > 0) {
        sales.push({
            date: new Date().toISOString(),
            invoiceNumber: document.getElementById('invoice-number').textContent,
            customer: user.email,
            items: cart,
            total: parseFloat(document.getElementById('invoice-total').textContent.replace('$', ''))
        });
        
        localStorage.setItem('sales', JSON.stringify(sales));
    }
    
    
    localStorage.removeItem('cart');
    updateCartCount();
    
    
    window.location.href = 'index.html?purchase=success';
}


window.updateCartCount = function() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });

};
