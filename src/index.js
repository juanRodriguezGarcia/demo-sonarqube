const sum = require('./sum');

console.log('¡Hola Mundo!');
console.log('Suma de 2 + 3 =', sum(2, 3));
console.log('Suma de 10 + 5 =', sum(10, 5));

// Code Smell: Duplicación de código
/* istanbul ignore next */
function calculateUserAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}

function calculateEmployeeAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  let edad=age;
  return edad;
}