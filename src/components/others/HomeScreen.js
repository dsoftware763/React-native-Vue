import React, { Component } from 'react';
import { View, Modal, Animated, PanResponder, TouchableOpacity, Platform, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';
import Drawer from 'react-native-drawer';
import DrawerScreen from './DrawerScreen';
import UserLocationsScreen from './UserLocationsScreen';
import MyProfileScreen from './MyProfileScreen';
import UserProfileScreen from './UserProfileScreen';
import RecentActivitiesScreen from './RecentActivitiesScreen';
import MessageScreen from './MessageScreen';
import FilterScreen from './FilterScreen';
import { styles } from '../../styles/HomeStyles';
import PropTypes from "prop-types";
import { NavigationActions, StackActions } from 'react-navigation';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import { mapStyle1, mapStyle2 } from '../../utils/Helper';

import { getUsers } from '../../actions/users';
import { sendNotification } from '../../actions/notification';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SocketIOClient from 'socket.io-client';
import { SOCKET_BASE_URL } from '../../utils/ApiConstants';
import Moment from 'moment';

import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            screen: '',
            selectedUserMail: '',
            messageFrom: '',
            switch: false,
            filterFrom: '',
            selectedTab: 1,
            lat: 0,
            lng: 0,
            loading: false,

            modalVisible: false,
            modal: false,
            animatedHeight: new Animated.Value(0),
            pan: new Animated.ValueXY()
        };
        this.interval = null;
        this.socket = SocketIOClient(SOCKET_BASE_URL);
        this.createPanResponder(props);
        this.saveUserId();
    }

    componentWillUnmount() {
        this.socket.disconnect();
        if (this.interval !== null)
            clearInterval(this.interval);
    }

    saveUserId() {
        AsyncStorage.getItem('user_id', (err, id) => {
            if (id !== null) {
                singleton.setUserId(id);
                this.socket.emit("getId", { 'id': id });
                this.socket.on("/" + singleton.getUserId(), (data) => {
                    console.log('count: ', data);
                    singleton.setNotificationCount(data.count);
                    this.props.sendNotification(data.count);
                });
            }
        });
    }

    setModalVisible = (visible) => {
        const { height, minClosingHeight, duration, onClose } = this.props;
        const { animatedHeight, pan } = this.state;
        if (visible) {
            this.setState({ modalVisible: visible, sliderHeight: 'half' });
            Animated.timing(animatedHeight, {
                toValue: height,
                duration
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                toValue: minClosingHeight,
                duration
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new Animated.Value(0),
                    sliderHeight: 'half'
                });

                if (typeof onClose === "function") onClose();
            });
        }
    }

    setModal = (visible) => {
        const { heightFull, minClosingHeight, duration, onClose } = this.props;
        const { animatedHeight, pan } = this.state;
        if (visible) {
            this.setState({ modal: visible, sliderHeight: 'full' });
            Animated.timing(animatedHeight, {
                toValue: heightFull,
                duration
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                toValue: minClosingHeight,
                duration
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                this.setState({
                    modal: visible,
                    animatedHeight: new Animated.Value(0),
                    sliderHeight: 'full'
                });

                if (typeof onClose === "function") onClose();
            });
        }
    }

    createPanResponder(props) {
        const { closeOnDragDown, height } = props;
        const { pan } = this.state;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.y }])(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    this.setModal(false);
                } else {
                    Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
                }
            }
        });
    }
    open = () => {
        this.setModalVisible(true);
    }
    close = () => {
        this.setModalVisible(false);
    }
    openfull = () => {
        this.setModal(true);
    }

    componentDidMount() {
        var self = this;
        // Geolocation.getCurrentPosition(info => {

        //     let tempCoords = {
        //         latitude: Number(info.coords.latitude),
        //         longitude: Number(info.coords.longitude)
        //     }
        //     self._map.animateToCoordinate(tempCoords, 1);
        //     self.setState({
        //         lat: info.coords.latitude,
        //         lng: info.coords.longitude
        //     })
        //     self.fetchUsers(info.coords.latitude, info.coords.longitude);
        //     // self.fetchUsers(30.718948, 76.748931);
        // });

        Geolocation.watchPosition(info => {
            let tempCoords = {
                latitude: Number(info.coords.latitude),
                longitude: Number(info.coords.longitude)
            }
            self._map.animateToCoordinate(tempCoords, 1);
            self.setState({
                lat: info.coords.latitude,
                lng: info.coords.longitude
            })
            // self.fetchUsers(info.coords.latitude, info.coords.longitude);
            // self.fetchUsers(30.718948, 76.748931);
        });
        self.fetchUsers();

    }

    fetchUsers() {
        var today = new Date();
        var self = this;
        // var currentDate = Moment(today).format('YYYY-MM-DD HH:mm:ss');
        // console.log('date:', currentDate);
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                this.props.getUsers(self.state.lat, self.state.lng, singleton.getUserId(), result, self.props.navigation, NavigationActions, StackActions);
                this.interval = setInterval(() => {
                    self.props.getUsers(self.state.lat, self.state.lng, singleton.getUserId(), result, self.props.navigation, NavigationActions, StackActions);
                }, 15000);
            }
        });
    }

    toggleDrawer = () => {
        if (this.state.toggle) {
            this._drawer.close();
            this.setState({
                toggle: !(this.state.toggle),
                // screen: ''
            });
        } else {
            this._drawer.open();
            this.setState({
                toggle: !(this.state.toggle),
                // screen: 'drawer'
            });
        }
    }

    onProfilePress = () => {
        this.setState({
            screen: 'MyProfile'
        });
    }

    onLocationPress = () => {
        this.setState({
            screen: 'Activities'
        });
    }

    onSwitchChange = () => {
        if (this.state.switch) {
            this.setState({
                switch: !this.state.switch,
            });
        } else {
            this.setState({
                switch: !this.state.switch,
            });
        }

    }

    slideDown = () => {
        this.setState({
            screen: ''
        });
    }

    renderScreen() {
        switch (this.state.screen) {
            case 'MyProfile':
                return <MyProfileScreen self={this} />;
            case 'UserProfile':
                return <UserProfileScreen self={this} selectedUserMail={this.state.selectedUserMail} />;
            case 'Activities':
                return <RecentActivitiesScreen self={this} />;
            case 'Filter':
                return <FilterScreen self={this} />;
            case 'Message':
                return <MessageScreen self={this} socket={this.socket} />;
            default:
                return <View />;
        }
    }

    _renderOutsideTouchable(onTouch) {
        const view = <View style={styles.view1} />

        if (!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={styles.view1}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    onTouchOutside = () => {
        this.setModalVisible(false);
    }

    renderModal() {

        const { animationType, closeOnPressMask, customStyles } = this.props;
        const { animatedHeight, pan, modalVisible } = this.state;
        const panStyle = {
            transform: pan.getTranslateTransform()
        };
        return (
            <Modal
                transparent
                animationType={animationType}
                visible={modalVisible}
                supportedOrientations={SUPPORTED_ORIENTATIONS}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}
            >

                <View style={[styless.wrapper, customStyles.wrapper,]}>
                    {this._renderOutsideTouchable(this.onTouchOutside)}
                    <TouchableOpacity
                        style={styless.mask}
                        activeOpacity={1}
                        onPress={() => (closeOnPressMask ? this.close : {})}
                    />
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[panStyle, styless.container, customStyles.container, { height: animatedHeight }, (Platform.OS === 'ios') ? { marginBottom: 80 } : { marginBottom: 80 }]}
                    >
                        <UserLocationsScreen self={this} sliderHeight={this.state.sliderHeight} slideDown={this.close} slideUp={this.openfull} usersList={this.props.users.usersList} />
                    </Animated.View>
                </View>
            </Modal>
        );
    }

    // renderLoader() {
    //     return (
    //         <ProgressDialog
    //             visible={this.props.users.loading}
    //             message="Please, wait..."
    //         />
    //     );
    // }

    render() {
        // if(this.props.users.unAuthenticated){
        //     clearInterval(this.interval);
        // }

        return (

            <View style={styles.mainContainer}>
                {this.renderModal()}
                {/* {this.renderLoader()} */}
                <MapView
                    ref={component => this._map = component}
                    provider="google"
                    style={styles.mapView}
                    // followsUserLocation={true}
                    // showsUserLocation={true}
                    showsMyLocationButton={false}
                    camera={{
                        center: {
                            latitude: this.state.lat,
                            longitude: this.state.lng,
                        },
                        zoom: 18,
                        pitch: 0,
                        heading: 0,
                        altitude: 0
                    }}
                    customMapStyle={(this.state.switch) ? mapStyle1 : mapStyle2}
                >
                    {this.props.users.usersList.map(marker => (
                        <Marker
                            coordinate={marker.location}
                            image={require('../../assets/icons/seekbar_marker.png')}
                        // onPress={this.open}
                        />
                    ))}
                    <Marker
                        coordinate={{
                            latitude: this.state.lat,
                            longitude: this.state.lng,
                        }}
                        image={require('../../assets/icons/user_location.png')}
                        onPress={this.open}
                    />
                </MapView>

                <View style={styles.subContainer}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({ screen: '', selectedTab: 1 });
                    }}>
                        <View style={[styles.headerContainer, (Platform.OS === 'android') ? styles.headerContainerAndroid : {}]}>
                            <Header openDrawer={this.toggleDrawer} onProfilePress={this.onProfilePress} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.drawerContainer, (this.state.screen === '' && this.state.toggle) ? { height: heightPercentageToDP('80%') } : (this.state.screen === '') ? { height: heightPercentageToDP('0%') } : { height: heightPercentageToDP('80%') }]}>
                        <Drawer
                            ref={(ref) => this._drawer = ref}
                            content={<DrawerScreen self={this} toggleDrawer={this.toggleDrawer} open={this.open} navigation={this.props.navigation} />}
                        >
                            {this.renderScreen()}
                        </Drawer>
                    </View>
                    <View style={[styles.footerContainer, (this.state.screen === '' && !this.state.toggle) ? { top: heightPercentageToDP('80%') } : (this.state.screen === '') ? { height: heightPercentageToDP('10%'), top: heightPercentageToDP('0%') } : { height: heightPercentageToDP('10%'), top: heightPercentageToDP('0%') }]}>
                        <Footer navigationProps={this.props.navigation} onLocationPress={this.onLocationPress} switch={this.state.switch} onSwitchChange={this.onSwitchChange} />
                    </View>
                </View>
            </View >

        );
    }

}

HomeScreen.propTypes = {
    animationType: PropTypes.oneOf(["none", "slide", "fade"]),
    height: PropTypes.number,
    heightFull: PropTypes.number,
    minClosingHeight: PropTypes.number,
    duration: PropTypes.number,
    closeOnDragDown: PropTypes.bool,
    closeOnPressMask: PropTypes.bool,
    customStyles: PropTypes.objectOf(PropTypes.object),
    onClose: PropTypes.func,
    children: PropTypes.node,
    provider: ProviderPropType,
};

HomeScreen.defaultProps = {
    animationType: "fade",
    height: heightPercentageToDP('50%'),
    heightFull: heightPercentageToDP('75%'),
    minClosingHeight: 0,
    HalfClosingHeight: 0,
    duration: 300,
    closeOnDragDown: false,
    closeOnPressMask: true,
    customStyles: {},
    onClose: null,
    children: <View />
};

const styless = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#00000077"
    },
    mask: {
        flex: 1,
        backgroundColor: "transparent"
    },
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: 0,
        overflow: "hidden"
    }
});

const mapStateToProps = ({ users }) => {
    return { users };
};
export default connect(mapStateToProps, {
    getUsers,
    sendNotification
})(HomeScreen);