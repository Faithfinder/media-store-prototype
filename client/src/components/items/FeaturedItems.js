import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Dot
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

import { fetchItems } from "src/redux/items/actions";
import { useFeaturedItems } from "src/redux/items/selectors";

import AddToCartButton from "src/components/shoppingCart/AddToCartButton";

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "relative"
    },
    navButton: {
        position: "absolute",
        top: 0,
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        border: 0,
        padding: "0 1em",
        zIndex: "2",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "white"
        },
        "&:focus": { outline: 0, color: "white" },
        "&:active": { backgroundColor: "rgba(0,0,0,1)" }
    },
    backButton: {
        left: 0
    },
    nextButton: {
        right: 0
    },
    dots: {
        position: "absolute",
        bottom: "0",
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center",
        padding: "1em",
        paddingTop: 0
    },
    dot: {
        height: "0.5em",
        width: "0.5em",
        border: 0,
        borderRadius: "0.25em",
        margin: "0.1em",
        backgroundColor: "lightgray",
        "&:disabled": { backgroundColor: "darkgray" }
    },
    caption: {
        position: "absolute",
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center",
        bottom: "0",
        zIndex: "1",
        height: "150px",
        color: "white",
        padding: "1em",
        backgroundColor: "rgba(0,0,0, 0.50)"
    }
}));

const FeaturedItems = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItems({ isFeatured: true }));
    }, [dispatch]);

    const featuredItems = useFeaturedItems();

    if (!featuredItems.length) return null;

    return (
        <CarouselProvider
            naturalSlideWidth={16}
            naturalSlideHeight={4}
            totalSlides={featuredItems.length}
            infinite={1}
            className={classes.wrapper}
        >
            <Slider>
                {featuredItems.map((item, index) => {
                    return (
                        <Slide key={item._id} index={index}>
                            <Image
                                src={item.featured.image}
                                alt={item.title}
                                aspectRatio={4 / 1}
                            />
                            <div className={classes.caption}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                >
                                    {item.featured.caption}
                                </Typography>
                                <AddToCartButton item={item} />
                            </div>
                        </Slide>
                    );
                })}
            </Slider>

            <ButtonBack
                className={classes.backButton + " " + classes.navButton}
            >
                <ArrowBackIos />
            </ButtonBack>
            <ButtonNext
                className={classes.nextButton + " " + classes.navButton}
            >
                <ArrowForwardIos />
            </ButtonNext>
            <div className={classes.dots}>
                {featuredItems.map((item, index) => {
                    return (
                        <Dot
                            key={item._id}
                            slide={index}
                            className={classes.dot}
                        />
                    );
                })}
            </div>
        </CarouselProvider>
    );
};

export default FeaturedItems;
