//
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

const crypto = require('crypto');

// Bug: JSON mal formado
const payload = '{"id":123';
const obj = JSON.parse(payload);
console.log(obj.id);

// Vulnerabilidad: uso de eval
const userInput = "console.log('Hacked!')";
eval(userInput);

// Code Smell: función larga y repetitiva
function processUser(user) {
  console.log("Nombre: " + user.name);
  console.log("Edad: " + user.age);
  console.log("Correo: " + user.email);
  console.log("Teléfono: " + user.phone);
}

// Duplicación de código
function getUserName(user) { return user.name; }
function getUserEmail(user) { return user.email; }

// Security Hotspot: hash inseguro
const hash = crypto.createHash('md5').update('password123').digest('hex');

processUser({name:"Juan", age:30, email:"juan@mail.com", phone:"1234"});
console.log("Nombre usuario:", getUserName({name:"Juan"}));
console.log("Email usuario:", getUserEmail({email:"juan@mail.com"}));
console.log("MD5 hash:", hash);