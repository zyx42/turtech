import {GET_PRODUCT, GET_PRODUCTS} from "../actions/types";

const initialState = {
    products: [],
    product: {},
    totalElements: 0,
    totalPages: 0,
    itemsCountPerPage: 10
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                itemsCountPerPage: action.payload.size
            };

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };

        default:
            return state;
    }
}