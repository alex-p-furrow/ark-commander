import React, { memo } from "react";
import { Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: "flex",
            flexGrow: 1,
            alignItems: "center"
        },
        content: {
            flexGrow: 1,
            paddingLeft: theme.spacing(3)
        },
        wiki: {
            justifySelf: "end"
        }
    };
});

const ArkItemSummary = memo(({ name, category, imageName }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img width={32} height="auto" src={"images/" + imageName} alt={name} />
            <div className={classes.content}>
                <Typography variant="h5" noWrap>
                    {name}
                </Typography>
            </div>
            <Chip size="small" label={category} />
        </div>
    );
});

export default ArkItemSummary;
