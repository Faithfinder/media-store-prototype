import { items, reviews } from "src/types/state/actions";

import produce from "immer";

const initialState = {};

export default produce((draft, { type, payload, error }) => {
    if (error) return;
    switch (type) {
        case items.fetchResponse:
            payload.forEach(element => {
                draft[element._id] = element;
            });
            return;
        case items.fetchSpecificResponse:
            draft[payload._id] = payload;
            return;
        case reviews.createReviewResponse:
            draft[payload.itemId].reviews.push(payload.review);
            return;
        default:
            return draft;
    }
}, initialState);
