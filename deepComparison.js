// not solved yet

function deepEqual(x, y) {
    if (((typeof x == 'object') && (typeof x != null))
    && ((typeof y == 'object') && (typeof y != null))) {
        if ((Object.keys(x) == Object.keys(y))
        && (Object.values(x) == Object.values(y))) {
            return true;
        } else 
    } else return (x === y);
}

// not solved yet