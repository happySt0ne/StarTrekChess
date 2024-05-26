Set.prototype.push = function (element) {
    this.add(element);
};

Set.prototype.concat = function (set) {
    var mergedSet = new Set(this);

    set.forEach((item) => {
        mergedSet.add(item);
    })

    return mergedSet;
};

Set.prototype.includes = function (item) {
    return this.has(item);
};

Set.prototype.intersection = function(setB) {
    return new Set([...this].filter(element => setB.has(element)));
};

Set.prototype.removeElements = function(setB) {
    var result = new Set(this);

    setB.forEach(element => result.delete(element));

    return result;
};
