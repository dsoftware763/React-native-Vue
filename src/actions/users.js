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
import RestApi from '../api/RestApi';
import { showAlert } from '../utils/Helper';
import AsyncStorage from '@react-native-community/async-storage';

const api = new RestApi();

export const getUsers = (lat, lng, userId, token, navigation, NavigationActions, StackActions) => (dispatch) => {
    dispatch({
        type: USERS,
    });

    let params = {
        "currentlocation": [lng, lat],
        "userId": userId
    }

    api.getUsers(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: USERS_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: USERS_SUCCESS,
                    payload: response.response
                });
            } else if (response.status === 400) {
                dispatch({
                    type: USERS_UNAUTHENTICATED,
                });
                setTimeout(function () {
                    navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'LoginScreen' })
                        ]
                    }));
                    AsyncStorage.setItem('user_token', '');
                    AsyncStorage.setItem('user_email', '');
                    showAlert('Session timed out!', "Login Again")
                }, 1000);

            } else {
                dispatch({
                    type: USERS_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);

            }
        }

    });
};

export const onRequestUser = (userId, friendId, token) => (dispatch) => {
    dispatch({
        type: REQUEST_USERS,
    });

    let params = {
        "userId": userId,
        "friendId": friendId
    }

    api.onRequestUser(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: REQUEST_USERS_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);

        } else {
            if (response.status === 200) {
                dispatch({
                    type: REQUEST_USERS_SUCCESS,
                    payload: response
                });
            } else {
                dispatch({
                    type: REQUEST_USERS_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const onRefineUser = (ageFilter, genderFilter, timeFilter, firstNameFilter, self, token) => (dispatch) => {
    dispatch({
        type: REFINE_USERS,
    });

    let params = {
        "ageFilter": ageFilter,
        "genderFilter": genderFilter,
        "timeFilter": timeFilter,
        "firstNameFilter": firstNameFilter
    }

    api.onRefineUser(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: REFINE_USERS_FAIL,
            });
            setTimeout(function () { showAlert('Something went wrong!', "Try again") }, 1000);

        } else {
            if (response.status === 200) {
                dispatch({
                    type: REFINE_USERS_SUCCESS,
                    payload: response.response
                });
                self.setState({ screen: '' });
            } else {
                dispatch({
                    type: REFINE_USERS_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};
