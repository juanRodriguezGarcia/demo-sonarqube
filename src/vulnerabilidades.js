// Archivo con vulnerabilidades para testing de SonarQube

// Vulnerabilidad: SQL Injection
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId;
    return query;
}

// Vulnerabilidad: XSS
function displayMessage(message) {
    document.innerHTML = message;
}

// Vulnerabilidad: Hardcoded credentials
const API_KEY = "12345-secret-key";
const PASSWORD = "admin123";

// Vulnerabilidad: Weak cryptography
function simpleHash(data) {
    return data.split('').reverse().join('');
}

module.exports = {
    getUserData,
    displayMessage,
    API_KEY,
    PASSWORD,
    simpleHash
};