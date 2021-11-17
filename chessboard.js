let size = 12;
for (let x=1; x<=size; x++) {
    let line = "";
    
    for (let y=1; y<=size; y++) {
        if ((x%2==1 && y%2==0) || (x%2==0 && y%2==1)) {
            line += '#';
        } else {
            line += " ";
        }     
    }

    console.log(line);
}

