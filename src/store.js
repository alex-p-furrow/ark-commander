import { createStore, action } from "easy-peasy";
import { getArkItems, getArkItemCategories } from "./utils/arkItems";

const arkItemCategories = getArkItemCategories();
const navCategories = [
    { name: "Items", subCategories: arkItemCategories },
    { name: "Creatures", subCategories: null }
];

const items = {
    filteredItems: getArkItems(),
    selectedItemCategory: null,
    searchTerm: null,
    setSelectedItemCategory: action((state, payload) => {
        state.selectedItemCategory = payload;
        state.filteredItems = getArkItems(payload, state.searchTerm);
    }),
    setSearchTerm: action((state, payload) => {
        state.searchTerm = payload;
        state.filteredItems = getArkItems(state.selectedItemCategory, payload);
    }),
    resetFilters: action((state, payload) => {
        state.selectedItemCategory = null;
        state.searchTerm = null;
        state.filteredItems = getArkItems();
    })
};

const navigation = {
    categories: navCategories,
    selectedCategory: navCategories[0],
    setSelectedCategory: action((state, payload) => {
        state.selectedCategory = payload;
    })
};

const snackbar = {
    isOpen: false,
    variant: "info",
    message: "",
    clearSnackbar: action((state, payload) => {
        state.isOpen = false;
        state.variant = "info";
        state.message = "";
    }),
    openSnackbar: action((state, payload) => {
        state.isOpen = true;
        state.variant = payload.variant;
        state.message = payload.message;
    })
};

const storeModel = {
    items: items,
    navigation: navigation,
    snackbar: snackbar
};

export const store = createStore(storeModel);
