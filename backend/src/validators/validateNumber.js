// Funzione che verifica se un numero di telefono è valido
function validateNumber(number) {
    // Verifica se il numero è una stringa
    if (typeof number !== 'string') {
        return false;
    }

    // Rimuove tutti i caratteri non numerici e il prefisso italiano
    let plain = number.replace(/\D/g, '');
    plain = plain.substring(2);

    // Verifica se il numero è valido
    let regexMobile = /^3[0-9]{8,9}$/;
    if (regexMobile.test(plain)) {
        return true;
    }
    return false;
}

module.exports = validateNumber;