import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { CssBaseline, Snackbar } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, pink } from "@material-ui/core/colors";
import TitleBar from "./nav/titleBar";
import SideBar from "./nav/sideBar";
import ArkItemsPage from "./pages/arkItemsPage";
import SnackbarContentWrapper from "./components/snackbarContentWrapper";

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: blueGrey,
        secondary: pink
    }
});

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: "flex",
            height: "100vh",
            flexDirection: "column"
        },
        body: {
            display: "flex",
            flex: 1,
            height: "100%"
        },
        content: {
            flex: 1,
            height: "100%",
            overflow: "auto",
            zIndex: 1
        }
    };
});

function App() {
    const classes = useStyles();
    const history = useStoreState(state => state.navigation.history);
    const isOpen = useStoreState(state => state.snackbar.isOpen);
    const variant = useStoreState(state => state.snackbar.variant);
    const message = useStoreState(state => state.snackbar.message);
    const clearSnackbar = useStoreActions(actions => actions.snackbar.clearSnackbar);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        clearSnackbar();
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline />
                <Router history={history}>
                    <div className={classes.root}>
                        <TitleBar />
                        <div className={classes.body}>
                            <SideBar />
                            <main className={classes.content}>
                                <Switch>
                                    <Route path="/creatures">
                                        <div>
                                            <p>TODO Createures</p>
                                        </div>
                                    </Route>
                                    <Route path={["/", "/items"]}>
                                        <ArkItemsPage />
                                    </Route>
                                </Switch>
                            </main>
                        </div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            open={isOpen}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <SnackbarContentWrapper onClose={handleClose} variant={variant} message={message} />
                        </Snackbar>
                    </div>
                </Router>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
