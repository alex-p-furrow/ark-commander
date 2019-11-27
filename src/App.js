import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, pink } from "@material-ui/core/colors";
import TitleBar from "./components/titleBar";
import SideBar from "./components/sideBar";
import ItemsDisplay from "./components/itemsDisplay";

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
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
