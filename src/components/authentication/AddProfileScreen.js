import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { create_profile, add_photo, birthday, location, profession, phone_number, save_profile, cancel } from '../../utils/strings';
import { EditText } from '../../common/widgets';
import { styles } from '../../styles/AddProfileStyles';
import { connect } from 'react-redux';
import { createUserProfile, uploadProfilePic } from '../../actions/auth';
import ImagePicker from 'react-native-image-picker';
import { showAlert } from '../../utils/Helper';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { NavigationActions, StackActions } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { TextInputMask } from 'react-native-masked-text';

Geocoder.init("AIzaSyA_WAbw-EegAF8LjxC0L78-emx6Q6sNpOQ"); // use a valid API key

class AddProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image_uri: '',
            dob: '',
            location: '',
            phone: '',
            profession: '',
            listviewDisplayed: false,
            dialogVisible: false,
            locationDialogVisible: false
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

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.auth.profile !== null) {
            nextProps.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeScreen' })
                ]
            }));
        }
        // Return null to indicate no change to state.
        return null;
    }

    onSaveProfilePress = () => {
        const { dob, phone, location, profession } = this.state;

        if (!this.props.auth.profilePic) {
            showAlert('Please select Profile Photo!')
        } else if (dob.length === 0) {
            showAlert('Please enter DateOfBirth!')
        } else if (phone.length === 0) {
            showAlert('Please enter Phone Number!')
        } else if (location.length === 0) {
            showAlert('Please enter your Location!')
        } else if (profession.length === 0) {
            showAlert('Please enter your Profession!')
        } else {
            AsyncStorage.getItem('user_token', (err, result) => {
                if (result !== null) {
                    AsyncStorage.getItem('user_email', (err, result1) => {
                        if (result1 !== null) {
                            this.props.createUserProfile(phone, location, profession, dob, result1, result);
                        }
                    });
                }
            });
        }

    }

    moveToPhotos() {
        const options = {
            title: 'Select From',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                showAlert('User cancelled image picker');
            } else if (response.error) {
                showAlert(response.error);
            } else {
                console.log('image:', response);
                ImageCropPicker.openCropper({
                    path: response.uri,
                    width: 100,
                    height: 100,
                    cropping: true,
                    cropperCircleOverlay: true
                }).then(image => {
                    console.log(image);
                    const source = { uri: image.path };
                    this.setState({ image_uri: image.path });
                    AsyncStorage.getItem('user_token', (err, result) => {
                        if (result !== null) {
                            this.props.uploadProfilePic(source.uri, result);
                        }
                    });
                });
            }
        });
    }

    onAddPhotoPress = () => {
        var self = this;
        if (Platform.OS === 'ios') {
            // can be done in parallel
            Promise.all([
                check(PERMISSIONS.IOS.CAMERA),
                check(PERMISSIONS.IOS.PHOTO_LIBRARY),
                // …
            ]).then(([cameraStatus, phototsStatus]) => {
                console.log({ cameraStatus, phototsStatus });
                var granted = false
                if (cameraStatus === 'granted' && phototsStatus === 'granted') {
                    granted = true;
                }
                if (granted === true) {
                    self.moveToPhotos();
                } else {
                    var permission1 = false;
                    var permission2 = false;
                    request(PERMISSIONS.IOS.CAMERA).then(camera => {
                        console.log(camera);
                        if (camera === 'granted') {
                            permission1 = true
                        } else {
                            permission1 = false
                        }
                        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(photos => {
                            console.log(photos);
                            if (photos === 'granted') {
                                permission2 = true
                            } else {
                                permission2 = false
                            }
                            if (permission1 === true && permission2 === true) {
                                self.moveToPhotos();
                            } else {
                                this.setState({
                                    dialogVisible: true
                                });
                            }
                        });
                    });
                }
            });
        } else {
            // can be done in parallel
            Promise.all([
                check(PERMISSIONS.ANDROID.CAMERA),
                check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
                // …
            ]).then(([cameraStatus, phototsStatus]) => {
                console.log({ cameraStatus, phototsStatus });
                var granted = false
                if (cameraStatus === 'granted' && phototsStatus === 'granted') {
                    granted = true;
                }
                if (granted === true) {
                    self.moveToPhotos();
                } else {
                    var permission1 = false;
                    var permission2 = false;
                    request(PERMISSIONS.ANDROID.CAMERA).then(camera => {
                        console.log(camera);
                        if (camera === 'granted') {
                            permission1 = true
                        } else {
                            permission1 = false
                        }
                    });
                    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(photos => {
                        console.log(photos);
                        if (photos === 'granted') {
                            permission2 = true
                        } else {
                            permission2 = false
                        }
                        if (permission1 === true && permission2 === true) {
                            self.moveToPhotos();
                        } else {
                            this.setState({
                                dialogVisible: true
                            });
                        }
                    });
                }

            });
        }

    }

    renderProfileImage() {
        if (this.state.image_uri === '') {
            return (
                <Image
                    source={require('../../assets/icons/profile.png')}
                    style={styles.logoImage}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: this.state.image_uri }}
                    style={[styles.logoImage, { borderRadius: 60 }]}
                />
            );
        }
    }

    onDobChange = (text) => {
        this.setState({
            dob: text
        });
    }

    onPhoneChange = (text) => {
        if (text.length <= 16) {
            let number = this.formatPhoneNumber(text);
            this.setState({
                phone: number
            });
        }
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = phoneNumberString.replace(/\D/g, '')
        char = { 0: '(', 3: ') ', 6: ' - ' };
        var value = '';
        for (var i = 0; i < cleaned.length; i++) {
            value += (char[i] || '') + cleaned[i];
        }
        return value;
    }

    onProfessionChange = (text) => {
        this.setState({
            profession: text
        });
    }

    onLocationChange = (text) => {
        this.setState({
            location: text
        })
    }

    onCurrentLocation = () => {
        this.setState({
            listviewDisplayed: false
        });
        var self = this;
        if (Platform.OS === 'ios') {
            check(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(location => {
                                console.log(location);
                                if (location === 'granted') {
                                    self.fetchLocation();
                                } else {
                                    showAlert('Location permission is required!');
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            self.fetchLocation();
                            break;
                        case RESULTS.BLOCKED:
                            this.setState({ locationDialogVisible: true });
                            break;
                    }
                })
                .catch(error => {
                    // …
                });
        } else {
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(location => {
                                console.log(location);
                                if (location === 'granted') {
                                    self.fetchLocation();
                                } else {
                                    showAlert('Location permission is required!');
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            self.fetchLocation();
                            break;
                        case RESULTS.BLOCKED:
                            this.setState({ locationDialogVisible: true });
                            break;
                    }
                })
                .catch(error => {
                    // …
                });
        }

    }

    fetchLocation() {
        var self = this;
        Geolocation.getCurrentPosition(info => {
            Geocoder.from(info.coords.latitude, info.coords.longitude)
                .then(json => {
                    var addressComponent = json.results[0].address_components[0];
                    console.log('address:', addressComponent);
                })
                .catch(error => console.warn(error));
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

    renderNoPermissionsDialog() {
        return (
            <ConfirmDialog
                title="Permission Required"
                message="One of Camera or Photos permission is not given!"
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({ dialogVisible: false })}
                positiveButton={{
                    title: "Open Settings",
                    onPress: () => openSettings().catch(() => console.warn('cannot open settings'))
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

    renderLocationPermissionsDialog() {
        return (
            <ConfirmDialog
                title="Permission Required"
                message="Location permission is not given!"
                visible={this.state.locationDialogVisible}
                onTouchOutside={() => this.setState({ locationDialogVisible: false })}
                positiveButton={{
                    title: "Open Settings",
                    onPress: () => openSettings().catch(() => console.warn('cannot open settings'))
                }}
                negativeButton={{
                    title: "NO",
                    onPress: () => this.setState({
                        locationDialogVisible: false
                    })
                }}
            />
        );
    }

    focusNext(next) {
        switch (next) {
            case "places":
                this.secondTextInput.focus();
                break;
            case "phone":
                this.thirdTextInput.focus();
                break;
            case "profession":
                this.fourthTextInput.focus();
                break;
        }
    }

    reference(input, currentType) {
        switch (currentType) {
            case "dob":
                this.firstTextInput = input;
                break;
            case "places":
                this.secondTextInput = input;
                break;
            case "phone":
                this.thirdTextInput = input;
                break;
            case "profession":
                this.fourthTextInput = input;
                break;
        }
    }


    render() {
        var self = this;
        return (
            <ImageBackground
                source={require('../../assets/images/background.png')}
                style={styles.backgroundImage}
            >
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                        <View style={styles.mainContainer}>
                            {this.renderNoPermissionsDialog()}
                            {this.renderLocationPermissionsDialog()}
                            {this.renderLoader()}

                            {/* <KeyboardAvoidingView
                                style={{
                                    alignItems: 'center',
                                    justifyContent: "center"
                                }}
                                behavior="padding"
                                enabled
                                keyboardVerticalOffset={(Platform.OS === 'ios') ? 180 : 40}> */}
                            <Text style={[styles.text2, (Platform.OS === 'android') ? styles.text2Android : {}]}>
                                {create_profile}
                            </Text>

                            {this.renderProfileImage()}

                            <TouchableOpacity onPress={this.onAddPhotoPress}>
                                <Text style={styles.text1}>
                                    {add_photo}
                                </Text>
                            </TouchableOpacity>

                            <View style={{ marginTop: 10 }}>
                                <View style={styles.view1}>
                                    <TextInputMask
                                        ref={(input) => this.reference(input, "dob")}
                                        style={styles.dobStyle}
                                        underlineColorAndroid='transparent'
                                        type={'datetime'}
                                        options={{
                                            format: 'DD/MM/YYYY'
                                        }}
                                        placeholder={birthday}
                                        placeholderTextColor='#F0F8FF70'
                                        // color='#ffffff'
                                        maxLength={10}
                                        autoCapitalize='none'
                                        value={this.state.dob}
                                        keyboardType='numeric'
                                        onChangeText={this.onDobChange}
                                        returnKeyType={"done"}
                                        onSubmitEditing={() => { this.focusNext("places") }}
                                    >
                                    </TextInputMask>
                                </View>
                            </View>

                            <View style={styles.view2}>
                                <GooglePlacesAutocomplete
                                    placeholder={location}
                                    placeholderTextColor='#F0F8FF70'
                                    minLength={2} // minimum length of text to search
                                    autoFocus={false}
                                    fetchDetails={true}
                                    listViewDisplayed={this.state.listviewDisplayed}
                                    text={this.state.location}
                                    onSubmitEditing={() => { this.focusNext("phone") }}
                                    textInputProps={
                                        {
                                            onChangeText: (text) => self.setState({
                                                location: text,
                                                listviewDisplayed: true
                                            }),
                                            ref: (input) => this.reference(input, "places"),
                                            returnKeyType: "next"
                                        }
                                    }
                                    enablePoweredByContainer={false}
                                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                        self.setState({
                                            location: data.description,
                                            listviewDisplayed: false
                                        })
                                        console.log(data);
                                        console.log(details);
                                    }}
                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyA_WAbw-EegAF8LjxC0L78-emx6Q6sNpOQ',
                                        language: 'en', // language of the results
                                        types: '(regions)', // default: 'geocode'
                                    }}
                                    styles={{
                                        textInputContainer: {
                                            backgroundColor: '#F0F8FF30', borderRadius: 30, width: wp('84%'), flexDirection: 'row', alignItems: 'center',
                                            height: null,
                                            borderTopColor: 'null',
                                            borderBottomColor: 'null',
                                            borderTopWidth: null,
                                            borderBottomWidth: null,
                                        },
                                        listView: {
                                            width: wp('84%'),
                                        },
                                        textInput: {
                                            flex: 0.85, fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 13, color: 'white', backgroundColor: 'null',
                                            height: null,
                                            borderRadius: null,
                                            marginTop: null,
                                            marginLeft: null,
                                            marginRight: null,
                                        },
                                        description: {
                                            fontWeight: 'bold',
                                            color: 'white'
                                        },
                                        poweredContainer: {
                                            justifyContent: 'space-around',
                                        }
                                    }}
                                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                    renderRightButton={() => <TouchableOpacity onPress={this.onCurrentLocation} style={{ flex: 0.1 }}>
                                        <Image
                                            source={require('../../assets/icons/my_location.png')}
                                            style={[{ width: 20, height: 20 }]}
                                        />
                                    </TouchableOpacity>}
                                />
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <EditText
                                    currentType="phone"
                                    nextType="profession"
                                    reference={this.reference.bind(this)}
                                    placeholder={phone_number}
                                    secureTextEntry={false}
                                    tick={false}
                                    keyboardType='numeric'
                                    onChangeText={this.onPhoneChange}
                                    value={this.state.phone}
                                    autoCapitalize='none'
                                    focusNext={this.focusNext.bind(this)}
                                />
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <EditText
                                    currentType="profession"
                                    reference={this.reference.bind(this)}
                                    placeholder={profession}
                                    secureTextEntry={false}
                                    tick={false}
                                    onChangeText={this.onProfessionChange}
                                    value={this.state.profession}
                                    autoCapitalize='sentences'
                                />
                            </View>

                            <TouchableOpacity onPress={this.onSaveProfilePress}>
                                <View style={styles.createTextContainer}>
                                    <Text style={styles.createText}>
                                        {save_profile}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={styles.haveAccountText}>
                                    {cancel}
                                </Text>
                            </TouchableOpacity>
                            {/* </KeyboardAvoidingView> */}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </ImageBackground>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth };
};
export default connect(mapStateToProps, {
    createUserProfile,
    uploadProfilePic
})(AddProfileScreen);