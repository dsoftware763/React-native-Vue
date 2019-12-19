import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileHeader, LinksView } from '../../common/widgets';
import { styles } from '../../styles/UserProfileStyles';
import { fetchUsersProfile, followSocialLink } from '../../actions/profile';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';

import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();

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
}

class UserProfileScreen extends Component {

    onRightPress = () => {
        if (this.props.profile.userProfile !== null || this.props.profile.userProfile !== undefined) {
            singleton.setFriendId(this.props.profile.userProfile.id);
            singleton.setFriendProfile(this.props.profile.userProfile);
            this.props.self.setState({ screen: 'Message', messageFrom: 'userProfile' });
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                this.props.fetchUsersProfile(this.props.selectedUserMail, result);
            }
        });
    }

    fetchSocialText(socialMedia, type) {
        if (socialMedia !== undefined) {
            switch (type) {
                case 'instagram':
                    return (socialMedia.instagram.username.length > 0) ? socialMedia.instagram.username : 'not linked';
                case 'facebook':
                    return (socialMedia.facebook.username.length > 0) ? socialMedia.facebook.username : 'not linked';
                case 'snapchat':
                    return (socialMedia.snapchat.username.length > 0) ? socialMedia.snapchat.username : 'not linked';
                case 'twitter':
                    return (socialMedia.twitter.username.length > 0) ? socialMedia.twitter.username : 'not linked';
                case 'youtube':
                    return (socialMedia.youtube.username.length > 0) ? socialMedia.youtube.username : 'not linked';
                case 'linkedin':
                    return (socialMedia.linkedIn.username.length > 0) ? socialMedia.linkedIn.username : 'not linked';
                case 'website':
                    return (socialMedia.website.link.length > 0) ? socialMedia.website.link : 'not linked';
                case 'gmail':
                    return (socialMedia.gmail.link.length > 0) ? socialMedia.gmail.link : 'not linked';
                default:
                    return 'not linked';
            }
        } else {
            return 'not linked';
        }
    }

    fetchLinkedSocial(socialMedia, type) {
        if (socialMedia !== undefined) {
            switch (type) {
                case 'instagram':
                    return (socialMedia.instagram.linkedToinstagram);
                case 'facebook':
                    return (socialMedia.facebook.linkedTofacebook);
                case 'snapchat':
                    return (socialMedia.snapchat.linkedTosnapchat);
                case 'twitter':
                    return (socialMedia.twitter.linkedTotwitter);
                case 'youtube':
                    return (socialMedia.youtube.linkedToyoutube);
                case 'linkedin':
                    return (socialMedia.linkedIn.LinkedTolnkedIn);
                case 'website':
                    return false;
                case 'gmail':
                    return false;
                default:
                    return false;
            }
        } else {
            return false;
        }
    }

    onAddPress = (socialMedia, type) => {
        if (socialMedia !== undefined) {
            var url = '';
            switch (type) {
                case 'instagram':
                    url = socialMedia.instagram.link;
                    break;
                case 'facebook':
                    url = socialMedia.facebook.link;
                    break;
                case 'snapchat':
                    url = socialMedia.snapchat.link;
                    break;
                case 'twitter':
                    url = socialMedia.twitter.link;
                    break;
                case 'youtube':
                    url = socialMedia.youtube.link;
                    break;
                case 'linkedin':
                    url = socialMedia.linkedIn.link;
                    break;
                case 'website':
                    url = socialMedia.website.link;
                    break;
                case 'gmail':
                    url = 'mailto:' + socialMedia.gmail.link;
                    break;
                default:
                    break;
            }

            if (url.length > 0) {
                var self = this;
                Linking.canOpenURL(url)
                    .then((supported) => {
                        if (!supported) {
                            console.log("Can't handle url: " + url);
                        } else {
                            setTimeout(function () { self.followSocialLinkApi(type); }, 2000);
                            return Linking.openURL(url);
                        }
                    })
                    .catch((err) => console.error('An error occurred', err));
            }


        }

    }

    followSocialLinkApi(type) {
        const friend_id = this.props.profile.userProfile.id;
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                this.props.followSocialLink(singleton.getUserId(), friend_id, type, result);
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

    render() {
        var userProfile = {};
        if (this.props.profile.userProfile !== null)
            userProfile = this.props.profile.userProfile;

        let privacyValue = (userProfile.publicAccount) ? 'Public' : 'Private';

        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.mainContainer}>
                    {this.renderLoader()}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerSubContainer}>
                            <TouchableOpacity onPress={() => this.props.self.setState({ screen: 'UserLocations' })}>
                                <Image
                                    style={styles.headerImage}
                                    source={require('../../assets/icons/back_arrow.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.self.setState({ screen: '' })}>
                                <Text style={styles.headerText}>
                                    Back To Results
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ProfileHeader
                        onRightPress={this.onRightPress}
                        saveView='message'
                        myProfile={userProfile}
                        privacy={privacyValue}
                    />

                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'instagram')}
                        icon={assets.instaColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'instagram')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'instagram')}
                        type='instagram'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'snapchat')}
                        icon={assets.snapchatColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'snapchat')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'snapchat')}
                        type='snapchat'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'facebook')}
                        icon={assets.facebookColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'facebook')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'facebook')}
                        type='facebook'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'twitter')}
                        icon={assets.twitterColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'twitter')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'twitter')}
                        type='twitter'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'youtube')}
                        icon={assets.youtubeColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'youtube')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'youtube')}
                        type='youtube'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'linkedin')}
                        icon={assets.linkedinColoredIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'linkedin')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'linkedin')}
                        type='linkedin'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'website')}
                        icon={assets.webIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'website')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'website')}
                        type='website'
                    />
                    <LinksView
                        text={this.fetchSocialText(userProfile.socialMediaAccount, 'gmail')}
                        icon={assets.mailIcon}
                        tick={this.fetchLinkedSocial(userProfile.socialMediaAccount, 'gmail')}
                        onAddPress={this.onAddPress.bind(this, userProfile.socialMediaAccount, 'gmail')}
                        type='gmail'
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
    fetchUsersProfile,
    followSocialLink
})(UserProfileScreen);
