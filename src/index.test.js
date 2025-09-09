const { calculateEmployeeAge } = require('./index');

describe('calculateEmployeeAge function', () => {
    test('calculates correct age for birth year 1990', () => {
        const currentYear = new Date().getFullYear();
        const expectedAge = currentYear - 1990;
        expect(calculateEmployeeAge(1990)).toBe(expectedAge);
    });

    test('calculates correct age for birth year 2000', () => {
        const currentYear = new Date().getFullYear();
        const expectedAge = currentYear - 2000;
        expect(calculateEmployeeAge(2000)).toBe(expectedAge);
    });

    test('calculates age for current year birth', () => {
        const currentYear = new Date().getFullYear();
        expect(calculateEmployeeAge(currentYear)).toBe(0);
    });
});