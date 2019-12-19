import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    CREATE_USER_PROFILE,
    CREATE_USER_PROFILE_FAIL,
    CREATE_USER_PROFILE_SUCCESS,
    UPLOAD_PROFILE_PIC,
    UPLOAD_PROFILE_PIC_FAIL,
    UPLOAD_PROFILE_PIC_SUCCESS
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    loading: false,
    registeredUser: null,
    loggedInUser: null,
    profile: null,
    profilePic: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, loggedInUser: action.payload };

        case LOGIN_USER_FAIL:
            return { ...state, loading: false };

        case REGISTER_USER:
            return { ...state, loading: true };

        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, registeredUser: action.payload };

        case REGISTER_USER_FAIL:
            return { ...state, loading: false };

        case CREATE_USER_PROFILE:
            return { ...state, loading: true };

        case CREATE_USER_PROFILE_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, profile: action.payload };

        case CREATE_USER_PROFILE_FAIL:
            return { ...state, loading: false };

        case UPLOAD_PROFILE_PIC:
            return { ...state, loading: true };

        case UPLOAD_PROFILE_PIC_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, profilePic: true };

        case UPLOAD_PROFILE_PIC_FAIL:
            return { ...state, loading: false, profilePic: false };

        default:
            return state;
    }
};