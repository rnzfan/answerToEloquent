class Group {
    constructor(basket = []) {
        this.basket = basket;
    }
    add(item) {
        if (this.basket.indexOf(item) == -1) {
            this.basket.push(item);
        }
    }
    delete(item) {
        this.basket = this.basket.filter(newitem=>newitem!==item);
    }
    has(item) {
        if (this.basket.indexOf(item) != -1) {
            return true;
        } else return false;
    }
    static from(items) {
        return new Group(items);
    }

    [Symbol.iterator]() {return new GroupIterator(this)}
}


class GroupIterator {
    constructor(group) {
    this.index = 0;
    this.group = group;
    }

    next() {
        if (this.index == this.group.basket.length) return {done: true};
        let result = {value: this.group.basket[this.index], done: false};
        this.index++;
        return result;
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
