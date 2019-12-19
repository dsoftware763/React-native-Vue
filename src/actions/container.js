import {CHANGE_CONTAINER} from '../utils/ApiConstants';

export const sendNotification = (container) => (dispatch) => {
    dispatch({
        type: CHANGE_CONTAINER,
        payload: container
    });
};