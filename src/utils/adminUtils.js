const ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD
};

function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function isValidToken(token) {
    return !!token;
}

function getStoredToken() {
    return localStorage.getItem('adminToken');
}

function setStoredToken(token) {
    localStorage.setItem('adminToken', token);
}

function clearStoredToken() {
    localStorage.removeItem('adminToken');
}

function isAdmin() {
    const token = getStoredToken();
    return isValidToken(token);
}

function loginAdmin(username, password) {
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
        const token = generateToken();
        setStoredToken(token);
        return true;
    }
    return false;
}

export { isAdmin, loginAdmin, clearStoredToken };