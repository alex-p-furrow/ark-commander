import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { ListItem, ListItemText } from "@material-ui/core";

export default function ArkItemsNav() {
    const categories = useStoreState(state => state.items.categories);
    const setSelectedItemCategory = useStoreActions(actions => actions.items.setSelectedItemCategory);

    const handleCategoryClick = (event, item) => {
        setSelectedItemCategory(item);
    };

    return (
        <React.Fragment>
            {categories.map((item, index) => (
                <ListItem button key={item} dense={true} onClick={event => handleCategoryClick(event, item)}>
                    <ListItemText primary={item} />
                </ListItem>
            ))}
        </React.Fragment>
    );
}
