import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { never_miss_connection, no_account, sign_in, username, password, here } from '../../utils/strings';
import { EditText } from '../../common/widgets';
import { styles } from '../../styles/LoginStyles';
import { showAlert } from '../../utils/Helper';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.fcm_Token = '';
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            // this._keyboardDidShow.bind(this, self),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            // this._keyboardDidHide.bind(this, self),
        );
        this.checkPermission();
        this.createNotificationListeners();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const notification1 = new firebase.notifications.Notification()
                .setNotificationId(notification._notificationId)
                .setTitle(notification._title)
                .setBody(notification._body);
            firebase.notifications().displayNotification(notification1);
        });
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log('fcm::', fcmToken);
            this.fcm_Token = fcmToken;
        }

    }
    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onSignInPress = () => {
        const { email, password } = this.state;
        if (email.length === 0) {
            showAlert('Please enter Email!')
        } else if (password.length === 0) {
            showAlert('Please enter Password!')
        } else {
            this.props.loginUser(email, password, this.fcm_Token);
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.auth.loggedInUser !== null) {
            AsyncStorage.getItem('user_token', (err, result) => {
                if (result !== null) {
                    nextProps.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'HomeScreen' })
                        ]
                    }));
                }
            });
        }
        // Return null to indicate no change to state.
        return null;
    }

    onNoAccountPress = () => {
        this.props.navigation.navigate('SignupScreen');
    }


    onEmailChange = (text) => {
        this.setState({
            email: text
        });
    }

    onPasswordChange = (text) => {
        this.setState({
            password: text
        });
    }

    renderLoader() {
        return (
            <ProgressDialog
                visible={this.props.auth.loading}
                message="Please, wait..."
            />
        );
    }

    focusNext(next) {
        switch (next) {
            case "email":
                this.thirdTextInput.focus();
                break;
            case "password":
                this.fourthTextInput.focus();
                break;
        }
    }

    reference(input, currentType) {
        switch (currentType) {
            case "email":
                this.thirdTextInput = input;
                break;
            case "password":
                this.fourthTextInput = input;
                break;
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.backgroundImage}
            >
                {/* <ScrollView> */}
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                    <View style={styles.mainContainer}>

                        {this.renderLoader()}

                        {/* <KeyboardAvoidingView
                            style={{
                                alignItems: 'center',
                                justifyContent: "center"
                            }}
                            behavior="padding"
                            enabled
                            keyboardVerticalOffset={(Platform.OS === 'ios') ? 180 : 40}> */}
                        <Image
                            source={require('../../assets/icons/logo.png')}
                            style={styles.logoImage}
                        />

                        <Text style={styles.text1}>
                            {never_miss_connection}
                        </Text>

                        <View style={{ marginTop: 52 }}>
                            <EditText
                                currentType="email"
                                nextType="password"
                                reference={this.reference.bind(this)}
                                placeholder={username}
                                secureTextEntry={false}
                                onChangeText={this.onEmailChange}
                                value={this.state.email}
                                keyboardType={"email-address"}
                                autoCapitalize='none'
                                focusNext={this.focusNext.bind(this)}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <EditText
                                currentType="password"
                                reference={this.reference.bind(this)}
                                placeholder={password}
                                secureTextEntry={true}
                                onChangeText={this.onPasswordChange}
                                value={this.state.password}
                                autoCapitalize='none'
                            />
                        </View>

                        <TouchableOpacity onPress={this.onSignInPress}>
                            <View style={styles.createTextContainer}>
                                <Text style={styles.createText}>
                                    {sign_in}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onNoAccountPress}>
                            <Text style={styles.haveAccountText}>
                                {no_account}
                                <Text style={styles.hereText}>
                                    {here}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
                    </View>
                </TouchableWithoutFeedback>
                {/* </ScrollView> */}
            </ImageBackground>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth };
};
export default connect(mapStateToProps, {
    loginUser
})(LoginScreen);
