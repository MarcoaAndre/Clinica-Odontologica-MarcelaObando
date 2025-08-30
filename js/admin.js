
document.addEventListener('DOMContentLoaded', () => {
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.isAdmin) {
        window.location.href = 'index.html';
        return;
    }
    
    
    loadProducts();
    loadUsers();
    loadSales();
    
    
    setupProductForm();
});


function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const table = document.getElementById('products-table');
    
    let html = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Editar</button>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody>';
    table.innerHTML = html;
    
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => fillProductForm(e.target.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deleteProduct(e.target.dataset.id));
    });
}


function setupProductForm() {
    const form = document.getElementById('product-form');
    form.innerHTML = `
        <input type="hidden" id="product-id">
        <div class="form-group">
            <label for="product-name">Nombre:</label>
            <input type="text" id="product-name" required>
        </div>
        <div class="form-group">
            <label for="product-description">Descripción:</label>
            <textarea id="product-description" required></textarea>
        </div>
        <div class="form-group">
            <label for="product-price">Precio:</label>
            <input type="number" id="product-price" min="0" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="product-stock">Stock:</label>
            <input type="number" id="product-stock" min="0" required>
        </div>
        <div class="form-group">
            <label for="product-image">URL de la imagen:</label>
            <input type="text" id="product-image" required>
        </div>
    `;
    
    document.getElementById('save-product').addEventListener('click', saveProduct);
}


function saveProduct() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const idInput = document.getElementById('product-id');
    const id = idInput.value || Date.now();
    
    const product = {
        id: parseInt(id),
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        image: document.getElementById('product-image').value
    };
    
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
        products[index] = product;
    } else {
        products.push(product);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    resetProductForm();
}


function resetProductForm() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
}


function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const table = document.getElementById('users-table');
    
    let html = `
        <thead>
            <tr>
                <th>Email</th>
                <th>Tipo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.email}</td>
                <td>${user.isAdmin ? 'Administrador' : 'Cliente'}</td>
                <td>
                    <button class="toggle-admin-btn" data-email="${user.email}">
                        ${user.isAdmin ? 'Quitar Admin' : 'Hacer Admin'}
                    </button>
                    <button class="delete-user-btn" data-email="${user.email}">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody>';
    table.innerHTML = html;
    
   
    document.querySelectorAll('.toggle-admin-btn').forEach(btn => {
        btn.addEventListener('click', (e) => toggleAdminStatus(e.target.dataset.email));
    });
    
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deleteUser(e.target.dataset.email));
    });
}


function loadSales() {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    const table = document.getElementById('sales-table');
    
    let html = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Detalles</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    sales.forEach(sale => {
        html += `
            <tr>
                <td>${sale.id}</td>
                <td>${new Date(sale.date).toLocaleDateString()}</td>
                <td>${sale.userEmail}</td>
                <td>$${sale.total.toFixed(2)}</td>
                <td>
                    <button class="view-sale-btn" data-id="${sale.id}">Ver</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody>';
    table.innerHTML = html;
    
   
    document.querySelectorAll('.view-sale-btn').forEach(btn => {
        btn.addEventListener('click', (e) => viewSaleDetails(e.target.dataset.id));
    });
}


function fillProductForm(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === parseInt(id));
    
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
    }
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

function toggleAdminStatus(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.email === email) {
            return { ...user, isAdmin: !user.isAdmin };
        }
        return user;
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function deleteUser(email) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

function viewSaleDetails(id) {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    const sale = sales.find(s => s.id === parseInt(id));
    
    if (sale) {
        let details = `Venta #${sale.id}\nFecha: ${new Date(sale.date).toLocaleDateString()}\nCliente: ${sale.userEmail}\n\nItems:\n`;
        
        sale.items.forEach(item => {
            details += `${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
        });
        
        details += `\nTotal: $${sale.total.toFixed(2)}`;
        alert(details);
    }
}

function updateStockAfterPurchase(items) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    items.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
        }
    });
    
    localStorage.setItem('products', JSON.stringify(products));
}