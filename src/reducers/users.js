import {
    USERS,
    USERS_FAIL,
    USERS_SUCCESS,
    USERS_UNAUTHENTICATED,
    REQUEST_USERS,
    REQUEST_USERS_FAIL,
    REQUEST_USERS_SUCCESS,
    REFINE_USERS,
    REFINE_USERS_FAIL,
    REFINE_USERS_SUCCESS
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    loading: false,
    usersList: [],
    requestUser: null,
    unAuthenticated: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case USERS:
            return { ...state, loading: true };

        case USERS_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, usersList: action.payload };

        case USERS_FAIL:
            return { ...state, loading: false };

        case USERS_UNAUTHENTICATED:
            return { ...state, loading: false, unAuthenticated: true };

        case REQUEST_USERS:
            return { ...state, loading: true };

        case REQUEST_USERS_SUCCESS:
            return { ...state, loading: false, requestUser: action.payload };

        case REQUEST_USERS_FAIL:
            return { ...state, loading: false };

        case REFINE_USERS:
            return { ...state, loading: true };

        case REFINE_USERS_SUCCESS:
            return { ...state, loading: false, usersList: action.payload };

        case REFINE_USERS_FAIL:
            return { ...state, loading: false };

        default:
            return state;
    }
};