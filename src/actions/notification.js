import { SEND_NOTIFICATION } from '../utils/ApiConstants';

export const sendNotification = (count) => (dispatch) => {
    dispatch({
        type: SEND_NOTIFICATION,
        payload: count
    });
};