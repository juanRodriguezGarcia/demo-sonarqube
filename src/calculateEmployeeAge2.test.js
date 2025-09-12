const { calculateEmployeeAge2 } = require('./index');

describe('calculateEmployeeAge2', () => {
  test('should calculate correct age for valid birth year', () => {
    const currentYear = new Date().getFullYear();
    const birthYear = 1990;
    const expectedAge = currentYear - birthYear;
    
    expect(calculateEmployeeAge2(birthYear)).toBe(expectedAge);
  });

  test('should handle current year birth', () => {
    const currentYear = new Date().getFullYear();
    
    expect(calculateEmployeeAge2(currentYear)).toBe(0);
  });

  test('should handle future birth year', () => {
    const futureYear = new Date().getFullYear() + 5;
    
    expect(calculateEmployeeAge2(futureYear)).toBeLessThan(0);
  });
});