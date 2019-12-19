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
import RestApi from '../api/RestApi';
import { showAlert } from '../utils/Helper';

const api = new RestApi();

export const fetchMyProfile = (token) => (dispatch) => {
    dispatch({
        type: MY_PROFILE,
    });

    api.fetchMyProfile(token, (error, response) => {

        if (error === true) {
            dispatch({
                type: MY_PROFILE_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: MY_PROFILE_SUCCESS,
                    payload: response.response.profileDetails
                });
            } else {
                dispatch({
                    type: MY_PROFILE_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const fetchUsersProfile = (emailAddress, token) => (dispatch) => {
    dispatch({
        type: USERS_PROFILE,
    });
    let params = {
        'emailAddress': emailAddress
    };

    api.fetchUsersProfile(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: USERS_PROFILE_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: USERS_PROFILE_SUCCESS,
                    payload: response.response.profileDetails
                });
            } else {
                dispatch({
                    type: USERS_PROFILE_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const changePrivacy = (emailAddress, publicAccount, token) => (dispatch) => {
    dispatch({
        type: CHANGE_PRIVACY,
    });
    let params = {
        'emailAddress': emailAddress,
        'publicAccount': publicAccount
    };

    api.changePrivacy(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: CHANGE_PRIVACY_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: CHANGE_PRIVACY_SUCCESS,
                    payload: response.response.publicAccount
                });
            } else {
                dispatch({
                    type: CHANGE_PRIVACY_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const addSocialLink = (emailAddress, profileLink, token) => (dispatch) => {
    dispatch({
        type: ADD_SOCIAL_LINK,
    });
    let params = {
        'emailAddress': emailAddress,
        'profileLink': profileLink
    };

    api.addSocialLink(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: ADD_SOCIAL_LINK_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: ADD_SOCIAL_LINK_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: ADD_SOCIAL_LINK_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const deleteSocialLink = (emailAddress, id, token) => (dispatch) => {
    dispatch({
        type: DELETE_SOCIAL_LINK,
    });
    let params = {
        'emailAddress': emailAddress,
        'socialmediaaccountId': id
    };

    api.deleteSocialLink(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: DELETE_SOCIAL_LINK_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_SOCIAL_LINK_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: DELETE_SOCIAL_LINK_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const followSocialLink = (user_id, friend_id, account_type, token) => (dispatch) => {
    dispatch({
        type: FOLLOW_SOCIAL_LINK,
    });
    let params = {
        "followerId": user_id,
        "followId": friend_id,
        "accountType": account_type
    };

    api.followSocialLink(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: FOLLOW_SOCIAL_LINK_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: FOLLOW_SOCIAL_LINK_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: FOLLOW_SOCIAL_LINK_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};
