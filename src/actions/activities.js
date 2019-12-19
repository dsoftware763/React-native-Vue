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
import RestApi from '../api/RestApi';
import { showAlert } from '../utils/Helper';

const api = new RestApi();

export const acceptRequest = (userId, friendId, token) => (dispatch) => {
    dispatch({
        type: ACCEPT_REQUEST,
    });
    let params = {
        "userId": userId,
        "friendId": friendId
    };

    api.acceptRequest(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: ACCEPT_REQUEST_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: ACCEPT_REQUEST_SUCCESS,
                    payload: response
                });
            } else {
                dispatch({
                    type: ACCEPT_REQUEST_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const fetchConnections = (id, token) => (dispatch) => {
    dispatch({
        type: CONNECTIONS,
    });

    api.fetchConnections(id, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: CONNECTIONS_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: CONNECTIONS_SUCCESS,
                    payload: response.response
                });
                if (response.response.length === 0) {
                    // setTimeout(function () { showAlert('There are no Connections!'); }, 750);
                }
            } else {
                dispatch({
                    type: CONNECTIONS_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const removeConnection = (id, token) => (dispatch) => {
    dispatch({
        type: REJECT_REQUEST,
    });

    api.removeConnection(id, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: REJECT_REQUEST_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: REJECT_REQUEST_SUCCESS,
                    payload: id
                });
            } else {
                dispatch({
                    type: REJECT_REQUEST_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const fetchInbox = (id, token) => (dispatch) => {
    dispatch({
        type: INBOX,
    });

    api.fetchInbox(id, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: INBOX_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: INBOX_SUCCESS,
                    payload: response.response
                });
                if (response.response.length === 0) {
                    // setTimeout(function () { showAlert('There are no messages!'); }, 750);
                }
            } else {
                dispatch({
                    type: INBOX_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const fetchActivities = (id, token) => (dispatch) => {
    dispatch({
        type: ACTIVITIES,
    });

    api.fetchActivities(id, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: ACTIVITIES_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: ACTIVITIES_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: ACTIVITIES_FAIL,
                });
                // setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};


export const onRefineConnects = (ageFilter, genderFilter, timeFilter, firstNameFilter, self, id, token) => (dispatch) => {
    dispatch({
        type: REFINE_CONNECTIONS,
    });

    let params = {
        "ageFilter": ageFilter,
        "genderFilter": genderFilter,
        "timeFilter": timeFilter,
        "firstNameFilter": firstNameFilter
    }

    api.onRefineConnects(id, params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: REFINE_CONNECTIONS_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: REFINE_CONNECTIONS_SUCCESS,
                    payload: response.response
                });
                self.setState({ screen: 'Activities', selectedTab: 3 });
            } else {
                dispatch({
                    type: REFINE_CONNECTIONS_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};