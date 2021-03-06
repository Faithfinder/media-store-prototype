import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Facebook from "src/components/auth/Facebook";
import ShoppingCartButton from "src/components/navbar/ShoppingCartButton";
import Link from "src/components/common/CombinedLink";

const useStyles = makeStyles(theme => ({
    space: {
        flex: 1
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Link variant="h6" to="/" color="inherit" underline="none">
                    Media Store Prototype
                </Link>
                <div className={classes.space} />
                <Facebook />
                <ShoppingCartButton />
            </Toolbar>
        </AppBar>
    );
};
