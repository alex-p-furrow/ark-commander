import { createStore, action } from "easy-peasy";
import { getArkItems, getArkItemCategories } from "./utils/arkItems";

const arkItemCategories = getArkItemCategories();
const navCategories = [
    { name: "Items", subCategories: arkItemCategories },
    { name: "Creatures", subCategories: null }
];
console.log(arkItemCategories);
const items = {
    filteredItems: getArkItems(),
    setSelectedCategory: action((state, payload) => {
        state.selectedCategory = payload;
        state.filteredItems = payload ? getArkItems(payload) : getArkItems();
    })
};

const navigation = {
    categories: navCategories,
    selectedCategory: navCategories[0],
    setSelectedCategory: action((state, payload) => {
        state.selectedCategory = payload;
    })
};

const storeModel = {
    items: items,
    navigation: navigation
};

export const store = createStore(storeModel);
