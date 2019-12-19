import React, { Component } from 'react';
import { View, Image, Text, FlatList, Keyboard, TextInput, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../styles/MessageStyles';
import { MessageListItem } from '../../common/widgets';
import { BASE_URL } from '../../utils/ApiConstants';

import { getConversation } from '../../actions/conversation';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';

import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();

class MessageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        // this.socket = SocketIOClient(SOCKET_BASE_URL);
        this.friendProfile = singleton.getFriendProfile();
        
        this.props.socket.on(singleton.getUserId()+"_" + singleton.getFriendId(), (data) => {
            console.log('received: ', data);
            if (data.status === 200) {
                this.props.conversation.conversationList.push(data.response);
                this.setState({
                    message: ''
                });
            }
        });
    }

    componentDidMount() {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                this.props.getConversation(singleton.getUserId(), singleton.getFriendId(), token);
            }
        });

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            // this._keyboardDidShow.bind(this, self),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            // this._keyboardDidHide.bind(this, self),
        );
    }

    static getDerivedStateFromProps(nextProps) {
        console.log("lest:::", nextProps.conversation.conversationList);

        return null;
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        // this.socket.disconnect();
        singleton.setFriendProfile(null);
        singleton.setFriendId(null);
    }

    sendMessage = () => {
        const { message } = this.state;
        if (message.length > 0) {
            let messageObj = {
                senderId: singleton.getUserId(),
                recieverId: singleton.getFriendId(),
                message: message
            }
            this.props.socket.emit("send_message", messageObj);
        }
    }

    onBack = () => {
        if (this.props.self.state.messageFrom === 'userProfile') {
            this.props.self.setState({ screen: 'UserProfile' });
        } else {
            this.props.self.setState({ screen: 'Activities', selectedTab: 2 });
        }
    }

    renderListItem(item) {
        return (
            <MessageListItem
                item={item.item}
                userId={singleton.getUserId()}
            />
        );
    }

    onMessageChange = (text) => {
        this.setState({
            message: text
        });
    }

    renderLoader() {
        return (
            <ProgressDialog
                visible={this.props.conversation.loading}
                message="Please, wait..."
            />
        );
    }

    render() {
        var image_uri = BASE_URL + this.friendProfile.profilePicturePath;

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#572BD9', '#4840E3', '#3559EF']} style={styles.gradientContainer}>

                <View style={styles.headerContainer}>
                    {this.renderLoader()}
                    <View style={styles.headerImageContainer}>
                        <TouchableOpacity onPress={this.onBack}>
                            <Image
                                style={styles.headerImage}
                                source={require('../../assets/icons/back_arrow.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>
                            MESSAGE {(this.friendProfile.firstName).toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                </View>

                {/* <KeyboardAvoidingView
                    style={{
                        alignItems: 'center',
                        justifyContent: "center",
                        flex: 1,
                        width: '100%'
                    }}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={(Platform.OS === 'ios') ? 180 : 70}> */}
                <View style={styles.profileContainer}>
                    <Image
                        source={(this.friendProfile.profilePicturePath !== null && this.friendProfile.profilePicturePath !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileText}>
                        {this.friendProfile.firstName + ' ' + this.friendProfile.lastName}
                    </Text>
                    <View style={styles.profileLocationContainer}>
                        <Image
                            source={require('../../assets/icons/location_white.png')}
                            style={styles.locationIcon}
                        />
                        <Text style={styles.locationText}>
                            {this.friendProfile.address}
                        </Text>
                    </View>
                </View>


                <FlatList
                    style={styles.listStyle}
                    data={this.props.conversation.conversationList}
                    renderItem={this.renderListItem.bind(this)}
                    removeClippedSubviews={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                />

                <View style={styles.bottomViewContainer}>
                    <TextInput
                        style={[styles.messageInput, (Platform.OS === 'android') ? styles.messageInputAndroid : {}]}
                        placeholder='Write message'
                        placeholderTextColor='#F0F8FF30'
                        value={this.state.message}
                        onChangeText={this.onMessageChange}
                    />
                    <View style={styles.sendIconContainer}>
                        <TouchableOpacity onPress={this.sendMessage}>
                            <Image
                                source={require('../../assets/icons/send.png')}
                                style={styles.sendIcon}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                {/* </KeyboardAvoidingView> */}
            </LinearGradient>
        );
    }

}

const mapStateToProps = ({ conversation }) => {
    return { conversation };
};
export default connect(mapStateToProps, {
    getConversation
})(MessageScreen);