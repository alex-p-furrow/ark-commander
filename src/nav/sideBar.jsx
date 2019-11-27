import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Switch, Route } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArkItemsNav from "./arkItemsNav";

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

    const handleCategoryClick = (event, item) => {
        setSelectedCategory(item);
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
            <List className={classes.scroll}>
                <Switch>
                    <Route path="/creatures">
                        <ListItem>
                            <ListItemText primary={"TODO"} />
                        </ListItem>
                    </Route>
                    <Route path={["/", "/items"]}>
                        <ArkItemsNav />
                    </Route>
                </Switch>
            </List>
        </Paper>
    );
}
