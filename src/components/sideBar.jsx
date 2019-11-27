import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Paper, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        paper: {
            width: 240,
            maxHeight: "100%",
            overflow: "auto",
            borderRight: 1,
            borderColor: theme.palette.divider,
            zIndex: 2
        },
        scroll: {}
    };
});

export default function SideBar() {
    const classes = useStyles();
    const categories = useStoreState(state => state.navigation.categories);
    const selectedCategory = useStoreState(state => state.navigation.selectedCategory);
    const setSelectedCategory = useStoreActions(actions => actions.navigation.setSelectedCategory);
    const setSelectedItemCategory = useStoreActions(actions => actions.items.setSelectedItemCategory);

    const handleCategoryClick = (event, item) => {
        setSelectedCategory(item);
    };

    const handleSubCategoryClick = (event, item) => {
        setSelectedItemCategory(item);
    };

    return (
        <Paper className={classes.paper}>
            <List>
                {categories.map((item, index) => (
                    <ListItem
                        button
                        key={item.name}
                        selected={item.name === selectedCategory.name}
                        onClick={event => handleCategoryClick(event, item)}
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            {selectedCategory.subCategories && (
                <List className={classes.scroll}>
                    {selectedCategory.subCategories.map((item, index) => (
                        <ListItem button key={item} dense={true} onClick={event => handleSubCategoryClick(event, item)}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}
