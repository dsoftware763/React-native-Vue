import { combineReducers } from "redux";

// import reducers

import authentication from './authentication';
import container from './container';
import notification from './notification';
import profile from './profile';
import users from './users';
import conversation from './conversation';
import activities from './activities';

export default combineReducers({
    auth: authentication,
    profile: profile,
    container: container,
    notification: notification,
    users: users,
    conversation: conversation,
    activities: activities,
});