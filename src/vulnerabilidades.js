const crypto = require('crypto');

// Bug: JSON mal formado (movido a función para evitar error en import)
function parseInvalidJSON() {
  const payload = '{"id":123';
  const obj = JSON.parse(payload);
  console.log(obj.id);
}

// Vulnerabilidad corregida: no usar eval
const userInput = "console.log('Hola')";
console.log("Entrada segura:", userInput);

// Code Smell: función larga y repetitiva
function processUser(user) {
  console.log("Nombre: " + user.name);
  console.log("Edad: " + user.age);
  console.log("Correo: " + user.email);
  console.log("Teléfono: " + user.phone);
}

// Duplicación de código
function getUserName(user) { return user.name; }


// Función genérica
function getUserProperty(user, prop) {
  return user[prop];
}

// MAINTAINABILITY - Función compleja


// Security Hotspot: hash inseguro
const hash = crypto.createHash('sha256').update('password123').digest('hex');

// Código de ejemplo movido a función
function runExamples() {
  processUser({name:"Juan", age:30, email:"juan@mail.com", phone:"1234"});
  console.log("Nombre usuario:", getUserName({name:"Juan"}));
  console.log("Email usuario:", getUserEmail({email:"juan@mail.com"}));
  console.log("sha256 hash:", hash);
}


// RELIABILITY ISSUES

// Bug: División por cero no controlada
function divide(a, b) {
  return a / b; // Puede retornar Infinity
}

// Bug: Acceso a propiedades sin validar
function getUserEmail(user) {
  return user.profile.email; // Error si user o profile son null/undefined
}

// Bug: Array access sin verificar bounds
function getFirstItem(items) {
  return items[0]; // Error si items está vacío
}

// Bug: Null pointer exception
function processData(data) {
  const result = null;
  return result.length; // Acceso a propiedad de null
}

// Bug: Literal usado como función
function calculateTotal() {
  const number = 42;
  return number(); // Intentando llamar un número como función
}

// Bug: String usado como función
function processText() {
  const text = "hello";
  return text(); // Intentando llamar un string como función
}

// Bug: Regex mal formado (Reliability)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Code Smell: Duplicación de código
function calculateUserAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}






// RESPONSIBILITY - Manejo irresponsable de recursos
function leakMemory() {
  const data = new Array(1000000).fill('data');
  // No se libera la memoria
  return data;
}



function unsafeRedirect(url) {
  window.location = url; // Open redirect vulnerability
}

module.exports = {
  processUser,
  getUserProperty,
  processComplexData,
  calculateUserAge,
  calculateEmployeeAge,
  divide,
  getUserEmail,
  getFirstItem,
  processData,
  calculateTotal,
  processText,
  validateEmail,
  unsafeOperation,
  confusingLogic,
  leakMemory,
  insecureAuth,
  executeCommand,
  unsafeRedirect
};