import React, { memo } from "react";
import { useStoreActions } from "easy-peasy";
import { Chip, TextField, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const { shell } = require("electron");
const { clipboard } = require("electron");

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "start"
        },
        form: {
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end"
        }
    };
});

const ArkItemActions = memo(({ wikiUrl, stackSize, blueprintPath }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState(stackSize);
    const openSnackbar = useStoreActions(actions => actions.snackbar.openSnackbar);

    const handleWikiLinkClick = event => {
        shell.openExternal(wikiUrl);
    };

    const handleQuantityChange = event => {
        setQuantity(event.target.value);
    };

    const handleCopyClick = event => {
        const command = `cheat giveitem ${blueprintPath} ${quantity} 0 0`;
        clipboard.writeText(command);
        openSnackbar({ variant: "info", message: "Command copied to clipboard." });
    };

    return (
        <div className={classes.root}>
            <Chip icon={<OpenInNewIcon />} size="small" label="Wiki" onClick={event => handleWikiLinkClick(event)} />
            <div className={classes.form}>
                <TextField
                    id="standard-number"
                    label="Quantity"
                    type="number"
                    className={classes.textField}
                    margin="none"
                    value={quantity}
                    onChange={event => handleQuantityChange(event)}
                />
                <Tooltip title="copy command">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        clickable
                        onClick={event => handleCopyClick(event)}
                    >
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
});

export default ArkItemActions;
