/**
 * Validates an Italian mobile phone number.
 */
function validateNumber(number) {

    // Ensure the input is a string.
    if (typeof number !== 'string') {
        return false;
    }

    // Strip non-digit characters and remove the country code.
    let plain = number.replace(/\D/g, '');
    plain = plain.substring(2);

    const isValid = /^3\d{8,9}$/.test(plain);

    return isValid;
}

module.exports = validateNumber;