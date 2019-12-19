import {
    CONVERSATION,
    CONVERSATION_SUCCESS,
    CONVERSATION_FAIL,
    CONVERSATION_EMPTY
} from '../utils/ApiConstants';
import RestApi from '../api/RestApi';
import { showAlert } from '../utils/Helper';

const api = new RestApi();

export const getConversation = (senderId, recieverId, token) => (dispatch) => {
    dispatch({
        type: CONVERSATION,
    });

    let params = {
        "senderId": senderId,
        "recieverId": recieverId
    }

    api.getConversation(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: CONVERSATION_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: CONVERSATION_SUCCESS,
                    payload: response
                });
            } else if (response.status === 202) {
                dispatch({
                    type: CONVERSATION_EMPTY,
                    payload: response
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            } else {
                dispatch({
                    type: CONVERSATION_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};
