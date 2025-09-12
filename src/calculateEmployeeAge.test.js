const { calculateEmployeeAge } = require('./vulnerabilidades');

describe('calculateEmployeeAge', () => {
  test('should calculate correct age for valid birth year', () => {
    const currentYear = new Date().getFullYear();
    const birthYear = 1990;
    const expectedAge = currentYear - birthYear;
    
    expect(calculateEmployeeAge(birthYear)).toBe(expectedAge);
  });

  test('should handle current year birth', () => {
    const currentYear = new Date().getFullYear();
    
    expect(calculateEmployeeAge(currentYear)).toBe(0);
  });

  test('should handle future birth year', () => {
    const futureYear = new Date().getFullYear() + 5;
    
    expect(calculateEmployeeAge(futureYear)).toBeLessThan(0);
  });
});