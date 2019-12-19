import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/DrawerStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { showAlert } from '../../utils/Helper';

class DrawerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false
        }
    }

    logoutUser() {
        this.setState({
            dialogVisible: false
        });
        this.props.toggleDrawer();
        AsyncStorage.setItem('user_token', '');
        AsyncStorage.setItem('user_email', '');
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        }));
    }

    renderLogoutDialog() {
        return (
            <ConfirmDialog
                title="Logout"
                message="Are you sure you want to logout?"
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({ dialogVisible: false })}
                positiveButton={{
                    title: "LOGOUT",
                    onPress: () => this.logoutUser()
                }}
                negativeButton={{
                    title: "NO",
                    onPress: () => this.setState({
                        dialogVisible: false
                    })
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        {this.renderLogoutDialog()}
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.props.toggleDrawer();
                                showAlert('Coming soon!');
                            }}>
                                <Text
                                    style={styles.text}>
                                    Settings
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <TouchableOpacity onPress={() => {
                                this.props.toggleDrawer();
                                showAlert('Coming soon!');
                            }}>
                                <Text style={styles.text}>
                                    How It works
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <TouchableOpacity onPress={() => {
                                this.props.toggleDrawer();
                                showAlert('Coming soon!');
                            }}>
                                <Text
                                    style={styles.text}>
                                    Frequently Asked Questions
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <TouchableOpacity onPress={() => {
                                this.props.toggleDrawer();
                                showAlert('Coming soon!');
                            }}>
                                <Text
                                    style={styles.text}>
                                    Notfications
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    dialogVisible: true
                                })
                            }}>
                                <Text
                                    style={styles.text}>
                                    Logout
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object
};

export default DrawerScreen;