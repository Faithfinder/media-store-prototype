import { ITEMS_FETCH_REQUEST, ITEMS_FETCH_RESPONSE } from "./types";
import axios from "axios";

export const fetchItems = filter => async dispatch => {
    let errored = false;
    let payload;
    try {
        dispatch({ type: ITEMS_FETCH_REQUEST });
        const response = await axios.get("/api/items", {
            params: filter
        });
        if (response.status === 200) {
            payload = response.data;
        } else {
            errored = true;
            payload = new Error(`Couldn't fetch items: ${response.statusText}`);
        }
    } catch (error) {
        errored = true;
        payload = error;
    }
    dispatch({ type: ITEMS_FETCH_RESPONSE, payload, error: errored });
};
