let map = {one: true, two: true, hasOwnProperty: true};

map.hasOwnProperty = function(property) {
    return Object.prototype.hasOwnProperty.call(this, property);
}

console.log(map.hasOwnProperty("one"));