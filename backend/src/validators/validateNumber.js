// Funzione che verifica se un numero di telefono è valido
function validateNumber(number) {
    
    // Verifica se il numero è una stringa
    if (typeof number !== 'string') {
        return false;
    }

    // Rimuove tutti i caratteri non numerici
    let plain = number.replace(/\D/g, '');
    
    // Verifica se il numero è valido
    return true;
}

module.exports = validateNumber;