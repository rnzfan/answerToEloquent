function range(start, end) {
    let result = [];
    if (start < end) {
        for (let i=0; i<=(end-start); i++) {
            result.push(start+i);
        }
    } else if (start > end) {
        for (let i=0; i<=(start-end); i++) {
            result.push(start-i);
        }
    } else result.push(start);
    return result;
}

/* another approach */
function range1(start, end) {
    let step = start < end ? 1 : -1;
    let result = [];
    for (i=0; Math.abs(i)<=Math.abs(end-start); i=i+step) {
        result.push(start+i);
    }
    return result;
}

function sum(range) {
    let result = 0;
    for (i in range) {
        result += range[i];
    }
    return result;    
}

console.log(range(-1,8));
console.log(range(5,2,-1));
console.log(range(3,3));
console.log(sum(range(3,-1)));

console.log(range1(-1,8));
console.log(range1(5,2,-1));
console.log(range1(3,3));
console.log(sum(range1(3,-1)));