class PGroup {
    constructor(basket) {
        this.basket = basket;
    }

    add(item) {
        if (this.basket.indexOf(item) == -1) {
            return new PGroup(this.basket.concat(item));
        } else return this;
    }

    delete(item) {
        return new PGroup(this.basket.filter(newitem=>newitem!==item));
    }

    has(item) {
        if (this.basket.indexOf(item) != -1) {
            return true;
        } else return false;
    }
}

PGroup.empty = new PGroup([]); // initial value

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));

console.log(a.has("b"));

console.log(b.has("a"));
