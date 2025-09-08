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

// MAINTAINABILITY ISSUES

// Code Smell: Función muy larga y compleja
function processComplexData(data, type, format, options, callback, errorHandler, validator, transformer) {
  if (type === 'user') {
    if (format === 'json') {
      if (options.validate) {
        if (validator) {
          if (validator(data)) {
            if (transformer) {
              const transformed = transformer(data);
              if (callback) {
                callback(transformed);
              }
            }
          } else {
            if (errorHandler) {
              errorHandler('Validation failed');
            }
          }
        }
      }
    }
  }
}

// Code Smell: Duplicación de código
function calculateUserAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}

function calculateEmployeeAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
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
  processText
};