// Function to convert English numerals to Bangla numerals
function convertToBanglaNumerals(input) {
    const englishToBangla = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯'
    };
    return input.replace(/\d/g, (digit) => englishToBangla[digit]);
}