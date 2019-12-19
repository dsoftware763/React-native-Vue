import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import Singleton from '../../utils/Singleton';
import DeviceInfo from 'react-native-device-info';

const singleton = Singleton.getInstance();

class SplashScreen extends Component {

    componentDidMount() {
        const self = this;
        setTimeout(function () { self.navigate() }, 3000);
        // console.log('getModel:', DeviceInfo.getModel());
    }
    
    navigate() {
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                AsyncStorage.getItem('user_image', (err, image) => {
                    if (image !== null) {
                        singleton.setProfilePic(image);
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'HomeScreen' })
                            ]
                        }));
                    } else {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'LoginScreen' })
                            ]
                        }));
                    }
                });
            } else {
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LoginScreen' })
                    ]
                }));
            }
        });
    }

    render() {
        var device = (DeviceInfo.getModel().includes('X') ||DeviceInfo.getModel().includes('11'));
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={(device)? require('../../assets/images/splash.jpeg'): require('../../assets/images/splash_5s.png')}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        );
    }

}

export default SplashScreen;