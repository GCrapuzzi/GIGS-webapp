export function validateNumber(numero) {
    let chiaro = numero.replace(/\D/g, '');
    chiaro = chiaro.substring(2)
    let regexMobile = /^3\d{8,9}$/;
    if (regexMobile.test(chiaro)) {
        return true;
    }
    return false;
}