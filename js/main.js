document.addEventListener('DOMContentLoaded', function() {
    
    loadProducts();
    
    
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
});
function loadProducts() {
    
    const products = [
        {
            id: 1,
            name: "Limpieza Dental Profesional",
            description: "Remoción completa de placa y sarro con tecnología ultrasónica.",
            price: 80.00,
            image: "media/limpieza.jfif",
            category: "Prevención"
        },
        {
            id: 2,
            name: "Blanqueamiento Dental",
            description: "Tratamiento con luz LED para aclarar varios tonos el color de tus dientes.",
            price: 150.00,
            image: "media/blanqueamiento.jfif",
            category: "Estética"
        },
        {
            id: 3,
            name: "Ortodoncia Invisible",
            description: "Sistema de alineadores transparentes para corregir la posición dental.",
            price: 2500.00,
            image: "media/ortodonciainv.jfif",
            category: "Ortodoncia"
        },
        {
            id: 4,
            name: "Extracción Dental",
            description: "Extracción cuidadosa de dientes dañados con anestesia local.",
            price: 100.00,
            image: "media/extraccion.jfif",
            category: "Cirugía"
        },
        {
            id: 5,
            name: "Implante Dental",
            description: "Reemplazo permanente de dientes perdidos con implantes de titanio.",
            price: 1200.00,
            image: "media/implante.jfif",
            category: "Rehabilitación"
        },
        {
            id: 6,
            name: "Carillas de Porcelana",
            description: "Carillas personalizadas para corregir forma y color de dientes.",
            price: 300.00,
            image: "media/carillas.jfif",
            category: "Estética"
        }
    ];

    const container = document.getElementById('products-container');
    
    let html = '';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default-dental.jpg'">
                    <span class="product-category">${product.category}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="btn add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const products = [
        {
            id: 1,
            name: "Limpieza Dental Profesional",
            price: 80.00,
            image: "media/limpieza.jfif"
        },
        
    ];
    
    const productToAdd = products.find(product => product.id === productId);
    
    if (!productToAdd) {
        console.error("Producto no encontrado");
        return;
    }

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            image: productToAdd.image,
            quantity: 1
        });
    }
    
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    
    showNotification(`${productToAdd.name} agregado al carrito`);
    
   
    updateCartCount();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });

}
