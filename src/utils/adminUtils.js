// src/utils/adminUtils.js
const ADMIN_CREDENTIALS = {
    username: 'sparsh',  // Change these credentials
    password: 'sparsh11'  // to your preferred values
};

function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function isValidToken(token) {
    return !!token; // In a real app, you'd want more robust token validation
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