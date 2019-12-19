import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, ScrollView } from 'react-native';
import { never_miss_connection, have_account, create_account, password, first_name, last_name, email, here } from '../../utils/strings';
import { EditText } from '../../common/widgets';
import { styles } from '../../styles/SignupStyles';
import { showAlert } from '../../utils/Helper';
import { registerUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';

class SignupScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
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
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.auth.registeredUser !== null && nextProps.auth.registeredUser !== undefined) {
            nextProps.navigation.navigate('AddProfileScreen');
        }
        // Return null to indicate no change to state.
        return null;
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onCreateAccountPress = () => {
        const { first_name, last_name, email, password } = this.state;
        if (first_name.length === 0) {
            showAlert('Please enter First name!')
        } else if (last_name.length === 0) {
            showAlert('Please enter Last name!')
        } else if (email.length === 0) {
            showAlert('Please enter Email!')
        } else if (password.length === 0) {
            showAlert('Please enter Password!')
        } else {
            this.props.registerUser(first_name, last_name, email, password)
            // this.props.navigation.navigate('AddProfileScreen');
        }

    }

    onHaveAccountPress = () => {
        this.props.navigation.navigate('LoginScreen');
    }

    onFirstNameChange = (text) => {
        this.setState({
            first_name: text
        });
    }

    onLastNameChange = (text) => {
        this.setState({
            last_name: text
        });
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
            case "last":
                this.secondTextInput.focus();
                break;
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
            case "first":
                this.firstTextInput = input;
                break;
            case "last":
                this.secondTextInput = input;
                break;
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
                            style={[styles.logoImage, (Platform.OS === 'android') ? styles.logoImageAndroid : {}]}
                        />

                        <Text style={styles.text1}>
                            {never_miss_connection}
                        </Text>

                        <View style={{ marginTop: 52 }}>
                            <EditText
                                currentType="first"
                                nextType="last"
                                reference={this.reference.bind(this)}
                                placeholder={first_name}
                                secureTextEntry={false}
                                onChangeText={this.onFirstNameChange}
                                value={this.state.first_name}
                                autoCapitalize='sentences'
                                focusNext={this.focusNext.bind(this)}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <EditText
                                currentType="last"
                                nextType="email"
                                reference={this.reference.bind(this)}
                                placeholder={last_name}
                                secureTextEntry={false}
                                onChangeText={this.onLastNameChange}
                                value={this.state.last_name}
                                autoCapitalize='sentences'
                                focusNext={this.focusNext.bind(this)}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <EditText
                                currentType="email"
                                nextType="password"
                                reference={this.reference.bind(this)}
                                placeholder={email}
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

                        <TouchableOpacity onPress={this.onCreateAccountPress}>
                            <View style={styles.createTextContainer}>
                                <Text style={styles.createText}>
                                    {create_account}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onHaveAccountPress}>
                            <Text style={styles.haveAccountText}>
                                {have_account}
                                <Text style={styles.hereText}>
                                    {here}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
                    </View>

                </TouchableWithoutFeedback>
            </ImageBackground>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth };
};
export default connect(mapStateToProps, {
    registerUser
})(SignupScreen);
