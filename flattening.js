function flattening(arrays) {
    return arrays.reduce((a,b) => a.concat(b))
}

let arrays = [[1, 2, 3], [4, 5], [6], ['a', 'b'], ["Hello"]];

console.log(flattening(arrays));