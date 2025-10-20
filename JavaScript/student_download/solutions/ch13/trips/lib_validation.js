function isEmpty(value) {
    return value === "";
}
function isAnyEmpty(...values) {
    for(let value of values) {
        if (isEmpty(value)) {
            return true;
        }
    }
    return false;
}
function isLessThanZero(value) {
    return isNaN(value) || value < 0
}

export {isEmpty, isAnyEmpty, isLessThanZero};