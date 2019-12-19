import {
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    CREATE_USER_PROFILE,
    CREATE_USER_PROFILE_FAIL,
    CREATE_USER_PROFILE_SUCCESS,
    UPLOAD_PROFILE_PIC,
    UPLOAD_PROFILE_PIC_FAIL,
    UPLOAD_PROFILE_PIC_SUCCESS
} from '../utils/ApiConstants';
import RestApi from '../api/RestApi';
import AsyncStorage from '@react-native-community/async-storage';
import Singleton from '../utils/Singleton';
import { showAlert } from '../utils/Helper';

const singleton = Singleton.getInstance();
const api = new RestApi();

export const registerUser = (firstName, lastName, emailAddress, password) => (dispatch) => {
    dispatch({
        type: REGISTER_USER,
    });

    let params = {
        'firstName': firstName,
        'lastName': lastName,
        'emailAddress': emailAddress,
        'password': password,
    };

    api.registerUser(params, (error, response) => {

        if (error === true) {
            dispatch({
                type: REGISTER_USER_FAIL,
            });
            setTimeout(function () { showAlert(JSON.stringify(response)) }, 1000);
        } else {
            if (response.status === 200) {
                AsyncStorage.setItem('user_token', response.response.token);
                AsyncStorage.setItem('user_email', response.response.emailAddress);
                AsyncStorage.setItem('user_id', response.response.id);
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: REGISTER_USER_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }

        }

    });
};

export const loginUser = (emailAddress, password, fcm_Token) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
    });
    let params = {
        'emailAddress': emailAddress,
        'password': password,
    };

    api.loginUser(params, fcm_Token, (error, response) => {

        if (error === true) {
            dispatch({
                type: LOGIN_USER_FAIL,
            });
            setTimeout(function () { showAlert(JSON.stringify(response)) }, 1000);
        } else {
            if (response.status === 200) {
                AsyncStorage.setItem('user_token', response.response.token);
                AsyncStorage.setItem('user_email', response.response.emailAddress);
                if (response.response.profilePicture.profilePicturePath !== undefined)
                    AsyncStorage.setItem('user_image', response.response.profilePicture.profilePicturePath);
                AsyncStorage.setItem('user_id', response.response.id);
                if (response.response.profilePicture.profilePicturePath !== undefined)
                    singleton.setProfilePic(response.response.profilePicture.profilePicturePath)
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: response.response
                });
            } else {
                dispatch({
                    type: LOGIN_USER_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};

export const uploadProfilePic = (imageUri, token) => (dispatch) => {
    dispatch({
        type: UPLOAD_PROFILE_PIC,
    });

    let params = null;
    params = new FormData();
    params.append('profilePicture', { uri: imageUri, name: 'image.jpg', type: 'image/jpg' });

    api.uploadProfilePic(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: UPLOAD_PROFILE_PIC_FAIL,
            });
            setTimeout(function () { showAlert(JSON.stringify(response)) }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: UPLOAD_PROFILE_PIC_SUCCESS,
                    payload: response
                });
            } else {
                dispatch({
                    type: UPLOAD_PROFILE_PIC_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};
export const createUserProfile = (phoneNumber, location, profession, dob, emailAddress, token) => (dispatch) => {
    dispatch({
        type: CREATE_USER_PROFILE,
    });

    let params = {
        'phoneNumber': phoneNumber,
        'address': location,
        'profession': profession,
        'dob': dob,
        'emailAddress': emailAddress,
        'gender': 'male',
    };

    api.createUserProfile(params, token, (error, response) => {

        if (error === true) {
            dispatch({
                type: CREATE_USER_PROFILE_FAIL,
            });
            setTimeout(function () { showAlert(JSON.stringify(response)) }, 1000);
        } else {
            if (response.status === 200) {
                dispatch({
                    type: CREATE_USER_PROFILE_SUCCESS,
                    payload: response
                });
                AsyncStorage.setItem('user_image', response.response.profilePicturePath);
                singleton.setProfilePic(response.response.profilePicturePath);
            } else {
                dispatch({
                    type: CREATE_USER_PROFILE_FAIL,
                });
                setTimeout(function () { showAlert(response.message); }, 750);
            }
        }

    });
};