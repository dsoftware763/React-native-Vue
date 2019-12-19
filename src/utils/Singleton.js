export default class Singleton {

    static myInstance = null;

    profile_pic = null;
    user_id = null;
    friend_id = null;
    friend_profile = null;
    currentTime = '00:00am';
    notificationCount = 0;

    /**
     * @returns {Singleton}
     */
    static getInstance() {
        if (Singleton.myInstance == null) {
            Singleton.myInstance = new Singleton();
        }

        return this.myInstance;
    }

    getProfilePic() {
        return this.profile_pic;
    }

    setProfilePic(profile_pic) {
        this.profile_pic = profile_pic;
    }

    getUserId() {
        return this.user_id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
    }

    getFriendId() {
        return this.friend_id;
    }

    setFriendId(friend_id) {
        this.friend_id = friend_id;
    }

    getFriendProfile() {
        return this.friend_profile;
    }

    setFriendProfile(friend_profile) {
        this.friend_profile = friend_profile;
    }

    getCurrentTime() {
        return this.currentTime;
    }

    setCurrentTime(currentTime) {
        this.currentTime = currentTime;
    }

    getNotificationCount() {
        return this.notificationCount;
    }

    setNotificationCount(notificationCount) {
        this.notificationCount = notificationCount;
    }

}