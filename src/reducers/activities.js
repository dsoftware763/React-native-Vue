import {
    ACCEPT_REQUEST,
    ACCEPT_REQUEST_FAIL,
    ACCEPT_REQUEST_SUCCESS,
    REJECT_REQUEST,
    REJECT_REQUEST_FAIL,
    REJECT_REQUEST_SUCCESS,
    CONNECTIONS,
    CONNECTIONS_FAIL,
    CONNECTIONS_SUCCESS,
    INBOX,
    INBOX_FAIL,
    INBOX_SUCCESS,
    ACTIVITIES,
    ACTIVITIES_FAIL,
    ACTIVITIES_SUCCESS,
    REFINE_CONNECTIONS,
    REFINE_CONNECTIONS_FAIL,
    REFINE_CONNECTIONS_SUCCESS
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    loading: false,
    connectionsList: [],
    inboxList: [],
    activitesList: [],
    rejectedId: null,
    acceptId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CONNECTIONS:
            return { ...state, loading: true };

        case CONNECTIONS_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, connectionsList: action.payload };

        case CONNECTIONS_FAIL:
            return { ...state, loading: false, connectionsList: [] };

        case REJECT_REQUEST:
            return { ...state, loading: true };

        case REJECT_REQUEST_SUCCESS:
            return { ...state, loading: false, rejectedId: action.payload };

        case REJECT_REQUEST_FAIL:
            return { ...state, loading: false };

        case ACCEPT_REQUEST:
            return { ...state, loading: true };

        case ACCEPT_REQUEST_SUCCESS:
            return { ...state, loading: false, acceptId: action.payload, activitesList: action.payload.respone.notifications };

        case ACCEPT_REQUEST_FAIL:
            return { ...state, loading: false };

        case INBOX:
            return { ...state, loading: true };

        case INBOX_SUCCESS:
            return { ...state, loading: false, inboxList: action.payload };

        case INBOX_FAIL:
            return { ...state, loading: false, inboxList: [] };

        case ACTIVITIES:
            return { ...state, loading: true };

        case ACTIVITIES_SUCCESS:
            return { ...state, loading: false, activitesList: action.payload };

        case ACTIVITIES_FAIL:
            return { ...state, loading: false, activitesList: [] };

        case REFINE_CONNECTIONS:
            return { ...state, loading: true };

        case REFINE_CONNECTIONS_SUCCESS:
            return { ...state, loading: false, connectionsList: action.payload };

        case REFINE_CONNECTIONS_FAIL:
            return { ...state, loading: false, connectionsList: [] };

        default:
            return state;
    }
};