require('./scripts.js');

function countBy(items, groupName) {
let counts = [];
for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
    counts.push({name, count: 1});
    } else {
    counts[known].count++;
    }
}
return counts;
}

function characterScript(code) {
for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
    return code >= from && code < to;
    })) {
    return script;
    }
}
return null;
}

function dominantDirection(text) {
    let scripts = countBy(
        text, char => {
            let script = characterScript(char.codePointAt(0));
            return script ? script.direction : "none";
        }
    ).filter(({name}) => name != "none");

    if (scripts.length == 0) return "ltr"; //default return be ltr

    return scripts.reduce(
        (x, y) => y.count > x.count ? y : x
    ).name;
}

console.log(dominantDirection("Hello"));
console.log(dominantDirection("Hey, مساء الخير"));
  
  
  