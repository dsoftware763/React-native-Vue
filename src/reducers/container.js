import {
    CHANGE_CONTAINER,
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    container: 'auth',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHANGE_CONTAINER:
            return { ...state, container: action.payload };

        default:
            return state;
    }
};