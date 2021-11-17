function reverseArray(array) {
    let reversedArray = [];
    for (const i in array) {
        reversedArray.push(array[array.length-1-i]);
    }
    return reversedArray;
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length/2); i++) {
        const temp = array[i];
        array[i] = array[array.length-1-i];
        array[array.length-1-i] = temp;
    }
}

console.log(reverseArray(["A", "BE", "C", "E"]));

let arrayValue = [1,2,3,4,5,6,7];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
