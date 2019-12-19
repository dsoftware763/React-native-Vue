import axios from 'axios';
import { BASE_URL } from '../utils/ApiConstants'
export default class RestApi {

    loginUser(params, fcm_Token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': fcm_Token
        }
        const uri = `${BASE_URL}authentication/login`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    registerUser(params, callback) {
        const headers = { 'Content-Type': 'application/json' }
        const uri = `${BASE_URL}authentication/register`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    createUserProfile(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/createprofile`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    fetchMyProfile(token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/viewSelfProfile`;
        this.commonAxios('get', headers, uri, null, callback);
    }

    fetchUsersProfile(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/viewProfile`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    addSocialLink(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/addProfileLink`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    deleteSocialLink(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/deleteProfileLink`;
        this.commonAxios('put', headers, uri, params, callback);
    }

    changePrivacy(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}profile/accountPrivacy`;
        this.commonAxios('put', headers, uri, params, callback);
    }

    uploadProfilePic(params, token, callback) {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'token': token
        }
        const uri = `${BASE_URL}profile/imageUpload`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    getUsers(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}people/getSurroundingPeople`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    onRequestUser(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}friends/createFriend`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    getConversation(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}conversation/getConversation`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    acceptRequest(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}friends/acceptfriend`;
        this.commonAxios('put', headers, uri, params, callback);
    }

    fetchConnections(id, token, callback) {
        const headers = {
            'token': token
        }
        const uri = `${BASE_URL}activity/connections/${id}`;
        this.commonAxios('get', headers, uri, null, callback);
    }

    removeConnection(id, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}friends/removeFriend/${id}`;
        this.commonAxios('put', headers, uri, null, callback);
    }

    fetchInbox(id, token, callback) {
        const headers = {
            'token': token
        }
        const uri = `${BASE_URL}activity/inbox/${id}`;
        this.commonAxios('get', headers, uri, null, callback);
    }

    fetchActivities(id, token, callback) {
        const headers = {
            'token': token
        }
        const uri = `${BASE_URL}activity/notifications/${id}`;
        this.commonAxios('get', headers, uri, null, callback);
    }

    followSocialLink(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}follow/followAccount`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    onRefineUser(params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}people/refineSearchPeople`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    onRefineConnects(id, params, token, callback) {
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const uri = `${BASE_URL}people/refineConnectPeople/${id}`;
        this.commonAxios('post', headers, uri, params, callback);
    }

    commonAxios(method, headers, uri, params, callback) {

        if (params !== null) {
            axios({
                method: method,
                headers: headers,
                url: uri,
                data: params,
            }, { timeout: 5000 })
                .then(response => callback(false, response.data))
                .catch(error => callback(true, error));
        } else {
            axios({
                method: method,
                headers: headers,
                url: uri,
            }, { timeout: 5000 })
                .then(response => callback(false, response.data))
                .catch(error => callback(true, error));

        }

    }

}