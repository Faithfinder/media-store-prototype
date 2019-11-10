import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tooltip from "@material-ui/core/Tooltip";

import { setCartAmount } from "../../actions/shoppingCart";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        margin: "5px",
        minWidth: "400px"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-betwwen",
        paddingTop: 0
    },
    details: {
        display: "flex",
        flexDirection: "column",
        flex: "1 0 auto"
    },
    cardItemDetails: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        margin: "1em"
    },
    image: {
        maxWidth: "50px"
    },
    quantityInput: {
        maxWidth: "5em"
    },
    textAlignCenter: {
        textAlign: "center"
    },
    priceInput: {
        maxWidth: "50px",
        textAlign: "center"
    }
}));

export const CartItem = ({ item }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [refreshing] = useSelector(({ shoppingCart }) => [
        shoppingCart.refreshing
    ]);

    const setCartAmountHandler = amount => () => {
        dispatch(setCartAmount(item.id, amount));
    };

    const quantityBlurHandler = event => {
        let value = Number(event.target.value);
        if (value <= 0) value = 1;
        event.target.value = value;
        dispatch(setCartAmount(item.id, value));
    };

    const keyPressHandler = event => {
        const letterPressed =
            event.key.length === 1 &&
            !Number(event.target.value + event.key) &&
            !(event.ctrlKey || event.altKey || event.metaKey);

        if (letterPressed) {
            event.preventDefault();
        }
        if (event.key === "Enter") {
            event.target.blur();
        }
    };

    return (
        <Grid item component={Card} className={classes.card}>
            <CardMedia
                component="img"
                image={item.image}
                title={item.title}
                className={classes.image}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h6">{item.title}</Typography>
                    <div className={classes.cardItemDetails}>
                        <TextField
                            label="Quantity"
                            defaultValue={item.amount}
                            min="1"
                            key={item.amount}
                            onBlur={quantityBlurHandler}
                            onKeyDown={keyPressHandler}
                            disabled={refreshing}
                            InputProps={{
                                className: classes.quantityInput,
                                startAdornment: (
                                    <IconButton
                                        size="small"
                                        className={classes.quantityArrow}
                                        onClick={setCartAmountHandler(
                                            item.amount - 1
                                        )}
                                        disabled={
                                            item.amount === 1 || refreshing
                                        }>
                                        <ArrowLeftIcon fontSize="inherit" />
                                    </IconButton>
                                ),
                                endAdornment: (
                                    <IconButton
                                        size="small"
                                        className={classes.quantityArrow}
                                        onClick={setCartAmountHandler(
                                            item.amount + 1
                                        )}
                                        disabled={refreshing}>
                                        <ArrowRightIcon fontSize="inherit" />
                                    </IconButton>
                                )
                            }}
                            inputProps={{
                                className: classes.textAlignCenter
                            }}
                        />
                        <Typography variant="subtitle1" component="div">
                            <TextField
                                label="Price"
                                value={Number(item.price) * Number(item.amount)}
                                className={classes.priceInput}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true
                                }}
                                inputProps={{
                                    className: classes.textAlignCenter
                                }}
                            />
                        </Typography>
                        <Tooltip title="Remove" aria-label="remove">
                            <IconButton
                                color="secondary"
                                onClick={setCartAmountHandler(0)}
                                disabled={refreshing}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </CardContent>
            </div>
        </Grid>
    );
};