function arrayToList(array) {
    if (array.length != 0) {
        return {'value': array.shift(), 'rest': arrayToList(array)};
    } else return null;
    
}
/* This one is incorrect, return array inside array!
function listToArray(list) {
    if (list.rest != null) {
        return [list.value, listToArray(list.rest)]
    } else return list.value;
}
*/

function listToArray(list) {
    let array = [];
    while (list.rest != null) {
        array.push(list.value);
        list = list.rest;
    }
    array.push(list.value);
    return array;
}

function prepend(value, list) {
    return {'value': value, 'rest': list};
}

function nth(list, nth) {
    if (nth < 0) return undefined;
    while (nth>0) {
        list = list.rest;
        if (list != null) {
            nth--;
        } else return undefined;
    }
    return list.value;
}

function nth_r(list, nth) {
    if ((list != null) && (nth >= 0)) {
        if (nth > 0) {
            return nth_r(list.rest, --nth);
        } else return list.value;

    } else return undefined;
}


console.log(arrayToList([11, 22, 33, 44, 55]));


console.log(listToArray(arrayToList([67,68,69, 70])));

console.log(prepend(10, prepend(20, null)));


console.log(nth(arrayToList([10, 20, 30, 40]), 4));

console.log(nth_r(arrayToList([10, 20, 30, 40]), 5));

