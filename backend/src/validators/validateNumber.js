function validateNumber(numero) {

    // Rimuove tutti i caratteri non numerici e il prefisso italiano
    let plain = numero.replace(/\D/g, '');
    plain = plain.substring(2);

    // Verifica se il numero è valido
    let regexMobile = /^3\d{8,9}$/;
    if (regexMobile.test(plain)) {
        return true;
    }
    return false;
}

module.exports = { validateNumber };