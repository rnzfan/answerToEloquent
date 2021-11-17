function loop(value, testFunction, updateFunction, bodyFunction) {
    let i = value;
    while (testFunction(i)) {
        bodyFunction(i);
        i = updateFunction(i);
    };
}

loop(3, n => n > 0, n => n - 1, console.log);
