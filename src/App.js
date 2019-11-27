import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { CssBaseline, Snackbar } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, pink } from "@material-ui/core/colors";
import TitleBar from "./components/titleBar";
import SideBar from "./components/sideBar";
import ItemsDisplay from "./components/itemsDisplay";
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
                <div className={classes.root}>
                    <TitleBar />
                    <div className={classes.body}>
                        <SideBar />
                        <main className={classes.content}>
                            <ItemsDisplay />
                        </main>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                        open={isOpen}
                        autoHideDuration={5000}
                        onClose={handleClose}
                    >
                        <SnackbarContentWrapper onClose={handleClose} variant={variant} message={message} />
                    </Snackbar>
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
