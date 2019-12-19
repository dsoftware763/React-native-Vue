import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, NativeModules, TextInput, Share } from 'react-native';
import { ProfileHeader, LinkAccountView } from '../../common/widgets';
import { styles } from '../../styles/MyProfileStyles';
import { fetchMyProfile, changePrivacy, addSocialLink, deleteSocialLink } from '../../actions/profile';
import { connect } from 'react-redux';
import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import InstagramLogin from 'react-native-instagram-login';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { showAlert } from '../../utils/Helper';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import branch, { BranchEvent } from 'react-native-branch';
import LinkedInModal from 'react-native-linkedin'
import SnapchatLogin from 'react-native-snapchat-login';
import DraggableFlatList from 'react-native-draggable-flatlist';

const { RNTwitterSignIn } = NativeModules

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: "r73DKV6Si29LYkOiT1jCpyqF3",
    TWITTER_CONSUMER_SECRET: "NEToc6eyp3ivhx3p3z3eRaVQHpJKFG5LEDOS6yFLGimXe0XnVD"
}

const assets = {
    instaColoredIcon: require('../../assets/icons/insta_colored.png'),
    snapchatColoredIcon: require('../../assets/icons/snapchat_colored.png'),
    linkedinColoredIcon: require('../../assets/icons/linkedin_colored.png'),
    youtubeColoredIcon: require('../../assets/icons/youtube_colored.png'),
    facebookColoredIcon: require('../../assets/icons/facebook_colored.png'),
    twitterColoredIcon: require('../../assets/icons/twitter_colored.png'),
    webIcon: require('../../assets/icons/web.png'),
    mailIcon: require('../../assets/icons/mail.png'),
    twitterUnColoredIcon: require('../../assets/icons/twitter_uncolored.png'),
    instaUnColoredIcon: require('../../assets/icons/insta_uncolored.png'),
    facebookUnColoredIcon: require('../../assets/icons/facebook_uncolored.png'),
    youtubeUnColoredIcon: require('../../assets/icons/youtube_uncolored.png'),
    snapchatUnColoredIcon: require('../../assets/icons/snapchat_uncolored.png'),
    linkedinUnColoredIcon: require('../../assets/icons/linkedin_uncolored.png'),
}
let privacyValue = null;

class MyProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            saveView: 'save',
            websiteDialogVisible: false,
            websiteText: '',
            data: ['instagram', 'snapchat', 'facebook', 'twitter', 'youtube', 'linkedin', 'website', 'gmail']
        }
    }

    async componentDidMount() {
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                this.props.fetchMyProfile(result);
            }
        });
        this._configureGoogleSignIn();

    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: '990562407128-jrq0slu1413qc8sce661s0q25cav6u35.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }

    shareProfile = async () => {
        // only canonicalIdentifier is required
        let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
            locallyIndex: true,
            title: 'Cool Content!',
            contentDescription: 'Cool Content Description',
            contentMetadata: {
                ratingAverage: 4.2,
                customMetadata: {
                    prop1: 'test',
                    prop2: 'abc'
                }
            }
        })

        let linkProperties = {
            feature: 'share',
            channel: 'facebook'
        }

        let controlParams = {
            $desktop_url: 'http://downloadvue.com/'
        }

        let { url } = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
        console.log('url::', url);
        this.onShare(url);
    }

    async onShare(url) {
        try {
            const result = await Share.share({
                message: url
            });
            console.log(result);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    async _signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('user:::', userInfo);
            // this.setState({ userInfo, error: null });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                showAlert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                showAlert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                showAlert('play services not available or outdated');
            } else {
                showAlert('Something went wrong', error.toString());

            }
        }
    };

    addWebsite() {
        this.setState({
            websiteDialogVisible: true
        });
    }

    addSnapchat() {
        SnapchatLogin.login()
            .then((r2) => {
                console.log('login')
                console.log(r2);
            });
    }

    onRightPress = () => {
        if (this.state.saveView === 'edit') {
            this.setState({
                saveView: 'save'
            });
        } else {
            this.setState({
                saveView: 'edit'
            });
        }
    }

    getInstagramByMyself(access_token) {
        fetch('https://api.instagram.com/v1/users/self/?access_token=' + access_token)
            .then((response) => response.json()).then((responseData) => {
                this.addSocialLink("instagram", "https://www.instagram.com/" + responseData.data.username, '@' + responseData.data.username);
            });
    }

    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends,link&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                console.log('json::', json);
                this.addSocialLink("facebook", "https://www.facebook.com/", '@' + 'RvRaheja');
                // Some user object has been set up somewhere, build that user here
                // user.name = json.name
                // user.id = json.id
                // user.user_friends = json.friends
                // user.email = json.email
                // user.username = json.name
                // user.loading = false
                // user.loggedIn = true
                // user.avatar = setAvatar(json.id)      
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    handleFacebookLogin() {
        var self = this;
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log('fb:::', data)
                            self.initUser(data.accessToken);
                        }
                    )
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    _twitterSignIn() {
        var self = this;
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(loginData => {
                console.log(loginData)
                const { userName } = loginData
                self.addSocialLink("twitter", "https://www.twitter.com/" + userName, '@' + userName);
            })
            .catch(error => {
                console.log(error + '');
                showAlert(error + '');
            }
            )
    }

    addSocialLink(id, link, username) {
        var profileLink = {
            "id": id,
            "link": link,
            "linked": true,
            "username": username
        }

        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                AsyncStorage.getItem('user_email', (err, mail) => {
                    this.props.addSocialLink(mail, profileLink, token);
                });
            }
        });

    }

    deleteSocialLink(id) {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                AsyncStorage.getItem('user_email', (err, mail) => {
                    this.props.deleteSocialLink(mail, id, token);
                });
            }
        });
    }

    renderLoader() {
        return (
            <ProgressDialog
                visible={this.props.profile.loading}
                message="Please, wait..."
            />
        );
    }

    onPrivacyPress = () => {
        let publicView = true;
        if (privacyValue === 'Public') {
            publicView = false
        } else {
            publicView = true
        }
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                AsyncStorage.getItem('user_email', (err, email) => {
                    this.props.changePrivacy(email, publicView, token);
                });
            }
        });
    }

    fetchSocialText(socialMedia, type) {
        if (socialMedia !== undefined) {
            switch (type) {
                case 'instagram':
                    return (socialMedia.instagram.username.length > 0) ? socialMedia.instagram.username : 'link account';
                case 'facebook':
                    return (socialMedia.facebook.username.length > 0) ? socialMedia.facebook.username : 'link account';
                case 'snapchat':
                    return (socialMedia.snapchat.username.length > 0) ? socialMedia.snapchat.username : 'link account';
                case 'twitter':
                    return (socialMedia.twitter.username.length > 0) ? socialMedia.twitter.username : 'link account';
                case 'youtube':
                    return (socialMedia.youtube.username.length > 0) ? socialMedia.youtube.username : 'link account';
                case 'linkedin':
                    return (socialMedia.linkedIn.username.length > 0) ? socialMedia.linkedIn.username : 'link account';
                case 'website':
                    return (socialMedia.website.link.length > 0) ? socialMedia.website.link : 'link account';
                case 'gmail':
                    return (socialMedia.gmail.link.length > 0) ? socialMedia.gmail.link : 'link account';
                default:
                    return 'link account';
            }
        } else {
            return 'link account';
        }
    }

    onWebsiteChangeText = (text) => {
        this.setState({
            websiteText: text
        });
    }

    onAddWebsite = () => {
        var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

        if (this.state.websiteText.length > 0 && this.state.websiteText.match(urlR)) {
            this.setState({
                websiteDialogVisible: false,
            });
            const self = this;
            setTimeout(function () { self.addSocialLink("website", self.state.websiteText, ''); }, 1000);

        }
    }

    renderWebsiteDialog() {
        return (
            <Dialog
                visible={this.state.websiteDialogVisible}
                title="Add Website"
                onTouchOutside={() => this.setState({ websiteDialogVisible: false })} >
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.dialogView1}>
                        <TextInput
                            style={styles.dialogTextInput1}
                            underlineColorAndroid='transparent'
                            placeholder='https://www.google.com'
                            placeholderTextColor='white'
                            autoCapitalize="none"
                            value={this.state.websiteText}
                            onChangeText={this.onWebsiteChangeText}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={this.onAddWebsite}>
                        <View style={styles.dialogView2}>
                            <Text style={styles.dialogText1}>
                                Add
                                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Dialog>
        );
    }

    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        var myProfile = {};
        if (this.props.profile.myProfile !== null)
            myProfile = this.props.profile.myProfile;

        console.log(item, index);
        switch (item) {
            case 'instagram':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'instagram')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.instagram : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.instagram.linked)) ? assets.instaUnColoredIcon : assets.instaColoredIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.instagram.linked)) ? this.instagramLogin.show() : this.deleteSocialLink('instagram') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'snapchat':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'snapchat')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.snapchat : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.snapchat.linked)) ? assets.snapchatUnColoredIcon : assets.snapchatColoredIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.snapchat.linked)) ? this.addSnapchat() : this.deleteSocialLink('snapchat') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'facebook':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'facebook')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.facebook : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.facebook.linked)) ? assets.facebookUnColoredIcon : assets.facebookColoredIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.facebook.linked)) ? this.handleFacebookLogin() : this.deleteSocialLink('facebook') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'twitter':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'twitter')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.twitter : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.twitter.linked)) ? assets.twitterUnColoredIcon : assets.twitterColoredIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.twitter.linked)) ? this._twitterSignIn() : this.deleteSocialLink('twitter') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'youtube':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'youtube')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.youtube : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.youtube.linked)) ? assets.youtubeUnColoredIcon : assets.youtubeColoredIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.youtube.linked)) ? this._signIn() : this.deleteSocialLink('youtube') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'linkedin':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'linkedin')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.linkedIn : {}}
                    icon={(myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.linkedIn.linked)) ? assets.linkedinUnColoredIcon : assets.linkedinColoredIcon}
                    saveView={this.state.saveView}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'website':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'website')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.website : {}}
                    icon={assets.webIcon}
                    saveView={this.state.saveView}
                    onAddMinusPress={() => { (myProfile.socialMediaAccount !== undefined && !(myProfile.socialMediaAccount.website.linked)) ? this.addWebsite() : this.deleteSocialLink('website') }}
                    move={move}
                    moveEnd={moveEnd}
                />;
            case 'gmail':
                return <LinkAccountView
                    text={this.fetchSocialText(myProfile.socialMediaAccount, 'gmail')}
                    data={(myProfile.socialMediaAccount !== undefined) ? myProfile.socialMediaAccount.gmail : {}}
                    icon={assets.mailIcon}
                    saveView={this.state.saveView}
                    move={move}
                    moveEnd={moveEnd}
                />;
            default:
                return <View />
        }
    }

    render() {
        var myProfile = {};
        if (this.props.profile.myProfile !== null)
            myProfile = this.props.profile.myProfile;

        if (this.props.profile.privacy === null) {
            privacyValue = (myProfile.publicAccount) ? 'Public' : 'Private'
        }
        else {
            privacyValue = (this.props.profile.privacy) ? 'Public' : 'Private'
        }

        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.mainContainer}>
                    {this.renderLoader()}
                    {this.renderWebsiteDialog()}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => this.props.self.setState({ screen: '' })}>
                            <View style={styles.headerLeftViewContainer}>
                                <Image
                                    style={styles.headerLeftImage}
                                    source={require('../../assets/icons/back_arrow.png')}
                                />
                                <Text style={styles.headerLeftText}>
                                    Back To Results
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.shareProfile} style={styles.headerRightViewContainer}>
                            <View style={styles.headerRightViewContainer}>
                                <Text style={styles.headerRightText}>
                                    Share Profile
                        </Text>
                                <Image
                                    style={styles.headerRightImage}
                                    source={require('../../assets/icons/share.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ProfileHeader
                        onRightPress={this.onRightPress}
                        onPrivacyPress={this.onPrivacyPress}
                        myProfile={myProfile}
                        saveView={this.state.saveView}
                        privacy={privacyValue}
                    />

                    <InstagramLogin
                        ref={ref => this.instagramLogin = ref}
                        clientId='739fbbd786b8472f819c63f7581be269'
                        redirectUrl='https://google.com'
                        scopes={['basic']}
                        onLoginSuccess={(token) => this.getInstagramByMyself(token)}
                        onLoginFailure={(data) => console.log(data)}
                        cacheEnabled={false}
                        incognito={true}
                        thirdPartyCookiesEnabled={false}
                        sharedCookiesEnabled={false}
                        domStorageEnabled={false}
                    />

                    <DraggableFlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        removeClippedSubviews={false}
                        onMoveEnd={({ data }) => this.setState({ data })}
                        extraData={[this.state, this.props]}
                    />
                </View>
            </ScrollView>
        );
    }

}

const mapStateToProps = ({ profile }) => {
    return { profile };
};
export default connect(mapStateToProps, {
    fetchMyProfile,
    changePrivacy,
    addSocialLink,
    deleteSocialLink
})(MyProfileScreen);