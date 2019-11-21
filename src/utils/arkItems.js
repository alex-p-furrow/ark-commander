const data = require("../data/items.json");

export function getArkItemCategories() {
    return data.filter((x, i, a) => a.findIndex(z => z.category === x.category) === i).map(y => y.category);
}

export function getArkItems(category = null) {
    if (!category) return data;

    return data.filter(x => x.category === category);
}
