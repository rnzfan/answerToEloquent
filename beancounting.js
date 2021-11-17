function countBs(string) {
    let count = 0;
    for (i in string) {
        if (string[i] == 'B') count++;
    }
    return count;
}

function countChar(string, char) {
    let count = 0;
    for (i in string) {
        if (string[i] == char) count++;
    }
    return count;
}

function countBs2(string) {
    return countChar(string, 'B');
}

console.log(countBs("BBC"));

console.log(countChar("kakarkakak", "k"));

console.log(countBs2("BBCB"));