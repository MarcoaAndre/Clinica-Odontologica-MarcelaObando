
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <div class="navbar-brand">
                    <img src="media/logo.jpg" alt="Odontología Marcela Obando" class="logo">
                </div>
                <ul class="navbar-nav">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="#services">Servicios</a></li>
                    <li><a href="#about">Nosotros</a></li>
                    <li><a href="cart.html">Carrito (<span id="cart-count">0</span>)</a></li>
                    <li id="auth-link"><a href="#" id="login-logout">Iniciar Sesión</a></li>
                </ul>
            </nav>
        `;
    }
}


function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Contacto</h3>
                        <p>Dirección: Calle Principal #123</p>
                        <p>Teléfono: 555-1234</p>
                        <p>Email: info@odontologiamarcela.com</p>
                    </div>
                    <div class="footer-section">
                        <h3>Horario</h3>
                        <p>Lunes a Viernes: 8am - 6pm</p>
                        <p>Sábados: 9am - 1pm</p>
                    </div>
                    <div class="footer-section">
                        <h3>Redes Sociales</h3>
                        <!-- Iconos de redes sociales -->
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Odontología Marcela Obando. Todos los derechos reservados.</p>
                </div>
            </footer>
        `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    updateCartCount();
});


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}


function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <div class="navbar-brand">
                    <img src="images/logo.png" alt="Odontología Marcela Obando" class="logo">
                </div>
                <ul class="navbar-nav">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="#services">Servicios</a></li>
                    <li><a href="#about">Nosotros</a></li>
                    <li><a href="cart.html">Carrito (<span class="cart-count">0</span>)</a></li>
                    <li id="auth-link"><a href="#" id="login-logout">Iniciar Sesión</a></li>
                </ul>
            </nav>
        `;
        
        
        updateCartCount();
    }
}



window.updateCartCount = updateCartCount;
