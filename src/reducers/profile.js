import {
    MY_PROFILE,
    MY_PROFILE_FAIL,
    MY_PROFILE_SUCCESS,
    USERS_PROFILE,
    USERS_PROFILE_FAIL,
    USERS_PROFILE_SUCCESS,
    CHANGE_PRIVACY,
    CHANGE_PRIVACY_FAIL,
    CHANGE_PRIVACY_SUCCESS,
    ADD_SOCIAL_LINK,
    ADD_SOCIAL_LINK_FAIL,
    ADD_SOCIAL_LINK_SUCCESS,
    DELETE_SOCIAL_LINK,
    DELETE_SOCIAL_LINK_FAIL,
    DELETE_SOCIAL_LINK_SUCCESS,
    FOLLOW_SOCIAL_LINK,
    FOLLOW_SOCIAL_LINK_FAIL,
    FOLLOW_SOCIAL_LINK_SUCCESS
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    loading: false,
    myProfile: null,
    privacy: null,
    userProfile: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case MY_PROFILE:
            return { ...state, loading: true };

        case MY_PROFILE_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, myProfile: action.payload };

        case MY_PROFILE_FAIL:
            return { ...state, loading: false };

        case USERS_PROFILE:
            return { ...state, loading: true };

        case USERS_PROFILE_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, userProfile: action.payload };

        case USERS_PROFILE_FAIL:
            return { ...state, loading: false };

        case CHANGE_PRIVACY:
            return { ...state, loading: true };

        case CHANGE_PRIVACY_SUCCESS:
            return { ...state, loading: false, privacy: action.payload };

        case CHANGE_PRIVACY_FAIL:
            return { ...state, loading: false };

        case ADD_SOCIAL_LINK:
            return { ...state, loading: true };

        case ADD_SOCIAL_LINK_SUCCESS:
            return { ...state, loading: false, myProfile: action.payload };

        case ADD_SOCIAL_LINK_FAIL:
            return { ...state, loading: false };

        case DELETE_SOCIAL_LINK:
            return { ...state, loading: true };

        case DELETE_SOCIAL_LINK_SUCCESS:
            return { ...state, loading: false, myProfile: action.payload };

        case DELETE_SOCIAL_LINK_FAIL:
            return { ...state, loading: false };

        case FOLLOW_SOCIAL_LINK:
            return { ...state, loading: true };

        case FOLLOW_SOCIAL_LINK_SUCCESS:
            return { ...state, loading: false, userProfile: action.payload };

        case FOLLOW_SOCIAL_LINK_FAIL:
            return { ...state, loading: false };

        default:
            return state;
    }
};