import {
    CONVERSATION,
    CONVERSATION_SUCCESS,
    CONVERSATION_FAIL,
    CONVERSATION_EMPTY
} from '../utils/ApiConstants';

const INITIAL_STATE = {
    loading: false,
    conversationList: [],
    conversationId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CONVERSATION:
            return { ...state, loading: true };

        case CONVERSATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, conversationList: action.payload.response.chats };

        case CONVERSATION_FAIL:
            return { ...state, loading: false, conversationList: [] };

        case CONVERSATION_EMPTY:
            return { ...state, loading: false, conversationList: [] };

        default:
            return state;
    }
};