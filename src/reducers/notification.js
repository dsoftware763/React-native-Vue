import {
    SEND_NOTIFICATION,
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    count: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SEND_NOTIFICATION:
            return { ...state, count: action.payload };

        default:
            return state;
    }
};