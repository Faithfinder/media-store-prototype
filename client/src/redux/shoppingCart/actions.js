import { batch } from "react-redux";
import { createAction } from "redux-actions";

import cart from "src/redux/shoppingCart/types";
import cartBackend from "src/services/backend/shoppingCart";

export const addToCart = itemId => async (dispatch, getState) => {
    const updatedCart = putItemIntoCart(getState, itemId);
    await setCart(dispatch, updatedCart);
};

export const setCartAmount = (itemId, amount) => async (dispatch, getState) => {
    const updatedCart = changeAmountInCart(getState, itemId, amount);
    await setCart(dispatch, updatedCart);
};

export const emptyCart = () => async dispatch => {
    await setCart(dispatch, {});
};

const putItemIntoCart = (getState, itemId) => {
    const currentCart = { ...getState().shoppingCart.contents };
    if (currentCart[itemId]) {
        currentCart[itemId].amount++;
    } else {
        currentCart[itemId] = { id: itemId, amount: 1 };
    }
    return currentCart;
};

const changeAmountInCart = (getState, itemId, amount) => {
    const currentCart = { ...getState().shoppingCart.contents };
    if (amount) {
        currentCart[itemId] = { id: itemId, amount: amount };
    } else {
        delete currentCart[itemId];
    }
    return currentCart;
};

async function setCart(dispatch, updatedCart) {
    let payload;
    dispatch({ type: cart.setRequest });
    try {
        payload = await cartBackend.setCart(updatedCart);
    } catch (error) {
        payload = error;
    }
    dispatch(createAction(cart.setResponse)(payload));
}

export const checkCart = () => async dispatch => {
    let payload;

    batch(() => {
        dispatch({ type: cart.checkRequest });
    });
    try {
        payload = await cartBackend.checkCart();
    } catch (error) {
        payload = error;
    }
    dispatch(createAction(cart.checkResponse)(payload));
};
