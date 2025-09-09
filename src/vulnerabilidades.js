const crypto = require('crypto');

// Bug corregido: control de JSON.parse
try {
  const payload = '{"id":123}';
  const obj = JSON.parse(payload);
  console.log(obj.id);
} catch (err) {
  console.error("Error parseando JSON:", err.message);
}

// Vulnerabilidad corregida: no usar eval
const userInput = "console.log('Hola')";
console.log("Entrada segura:", userInput);

// Refactor: función corta y genérica
function processUser(user) {
  Object.entries(user).forEach(([k,v]) => console.log(`${k}: ${v}`));
}

// Evitar duplicación
function getUserProperty(user, prop) {
  return user[prop];
}

// Security Hotspot corregido: usar SHA256
const hash = crypto.createHash('sha256').update('password123').digest('hex');

processUser({name:"Juan", age:30, email:"juan@mail.com", phone:"1234"});
console.log("Nombre usuario:", getUserProperty({name:"Juan"}, "name"));
console.log("Email usuario:", getUserProperty({email:"juan@mail.com"}, "email"));
console.log("SHA256 hash:", hash);

// Code Smell: Duplicación de código
function calculateUserAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}