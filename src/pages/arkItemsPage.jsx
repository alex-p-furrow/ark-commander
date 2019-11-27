import React, { memo } from "react";
import { useStoreState } from "easy-peasy";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArkItemSummary from "../components/arkItemSummary";
import ArkItemActions from "../components/arkItemActions";

const summaryHeight = 80;
const actionsHeight = 80;

const useStyles = makeStyles(theme => {
    return {
        expansion: {
            border: "1px solid",
            borderColor: theme.palette.divider,
            boxShadow: "none",
            "&:not(:last-child)": {
                borderBottom: 0
            },
            "&:before": {
                display: "none"
            },
            "&$expanded": {
                margin: 0
            }
        },
        expanded: {},
        summary: {
            height: summaryHeight,
            background: theme.palette.background.default,
            "&$expanded": {
                background: theme.palette.background.paper
            }
        },
        actions: {
            height: actionsHeight,
            padding: 0,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        }
    };
});

export default function ArkItemsPage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(null);
    const arkItems = useStoreState(state => state.items.filteredItems);
    const listRef = React.createRef();

    const handleChange = index => (event, expansionState) => {
        const prevIndex = expanded;
        setExpanded(expansionState ? index : null);

        let lowest = index;
        // if this is a new expansion there might be a previously expanded panel that is open earlier in the list
        if (expansionState && Number.isInteger(prevIndex) && prevIndex < lowest) {
            lowest = prevIndex;
        }

        listRef.current.resetAfterIndex(lowest);
    };

    const getItemHeight = index => {
        return expanded === index ? summaryHeight + actionsHeight : summaryHeight;
    };

    const Row = memo(({ index, style }) => {
        return (
            <ExpansionPanel
                key={index}
                square
                expanded={expanded === index}
                onChange={handleChange(index)}
                TransitionProps={{ unmountOnExit: true }}
                style={style}
                classes={{
                    root: classes.expansion,
                    expanded: classes.expanded
                }}
            >
                <ExpansionPanelSummary
                    aria-controls={index + "-content"}
                    id={index + "-header"}
                    classes={{
                        root: classes.summary,
                        expanded: classes.expanded
                    }}
                >
                    <ArkItemSummary name={arkItems[index].name} imageName={arkItems[index].imageName} category={arkItems[index].category} />
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelActions
                    classes={{
                        root: classes.actions
                    }}
                >
                    <ArkItemActions
                        wikiUrl={arkItems[index].wikiUrl}
                        stackSize={arkItems[index].stackSize}
                        blueprintPath={arkItems[index].blueprintPath}
                    />
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    });

    return (
        <AutoSizer>
            {({ height, width }) => (
                <VariableSizeList ref={listRef} itemCount={arkItems.length} height={height} width={width} itemSize={getItemHeight}>
                    {Row}
                </VariableSizeList>
            )}
        </AutoSizer>
    );
}
