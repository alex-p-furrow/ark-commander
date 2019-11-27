const data = require("../data/items.json");

export function getArkItemCategories() {
    return data.filter((x, i, a) => a.findIndex(z => z.category === x.category) === i).map(y => y.category);
}

export function getArkItems(category = null, searchTerm = null) {
    if (!category && !searchTerm) return data;

    if (category) {
        const c = data.filter(x => x.category === category);
        return searchTerm ? c.filter(x => x.name.includes(searchTerm)) : c;
    }

    return data.filter(x => x.name.includes(searchTerm));
}
