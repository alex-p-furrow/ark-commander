import React from "react";
import { CssBaseline, Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, pink } from "@material-ui/core/colors";

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
            flex: 1
        }
    };
});

function App() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline />
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            be
                            {bull}
                            nev
                            {bull}o{bull}
                            lent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
