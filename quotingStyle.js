let text = "'I'm the cook,' he said, 'it's my happys' job.'";


console.log(text.replace(/(^|\W)'/g, '$1"'));

// → "I'm the cook," he said, "it's my job."