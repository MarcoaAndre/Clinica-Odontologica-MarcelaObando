
document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('auth-link');
    const loginLogout = document.getElementById('login-logout');
    
    if (authLink && loginLogout) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (user) {
            loginLogout.textContent = 'Cerrar Sesión';
            loginLogout.href = '#';
            loginLogout.onclick = logout;
            
            
            if (user.isAdmin) {
                authLink.innerHTML += '<li><a href="admin.html">Administrador</a></li>';
            }
        } else {
            loginLogout.textContent = 'Iniciar Sesión';
            loginLogout.href = '#';
            loginLogout.onclick = showLoginModal;
        }
    }
});


function showLoginModal() {
    
}


function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        return { success: false, message: 'El email ya está registrado' };
    }
    
    const newUser = {
        email,
        password, 
        isAdmin: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
}


function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, isAdmin: user.isAdmin };
    }
    
    return { success: false, message: 'Credenciales incorrectas' };
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}