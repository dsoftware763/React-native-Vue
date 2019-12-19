import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { styles } from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../../utils/ApiConstants';

const ProfileHeader = ({ onRightPress, onPrivacyPress, myProfile, saveView, privacy }) => {

    var image_uri = BASE_URL + myProfile.profilePicturePath;

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5617AC', '#4639C7', '#2A5CD1']} style={{ opacity: 0.9 }}>
            <View style={styles.profileHeaderView1}>
                <View style={styles.profileHeaderView2}>
                    <Image
                        style={styles.profileHeaderImage1}
                        source={(myProfile.profilePicturePath !== null && myProfile.profilePicturePath !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                    />
                </View>
                <View style={styles.profileHeaderView3}>
                    <Text style={styles.profileHeaderText1}>
                        {myProfile.firstName + ' ' + myProfile.lastName}
                    </Text>
                    <Text style={styles.profileHeaderText2}>
                        {myProfile.age + ' | ' + myProfile.address}
                    </Text>
                    <Text style={styles.profileHeaderText3}>
                        {myProfile.profession}
                    </Text>
                    <Text style={[styles.profileHeaderText4, (Platform.OS === 'android') ? styles.profileHeaderText5 : {}]}>
                        {myProfile.emailAddress}
                    </Text>
                </View>
            </View>

            <View style={styles.profileHeaderView4}>
                <TouchableOpacity onPress={onPrivacyPress}
                    style={{ flex: 1 }}>
                    <View style={styles.profileHeaderView5}>
                        <Image
                            style={styles.profileHeaderImage2}
                            source={(privacy === 'Public') ? require('../../assets/icons/unlock.png') : require('../../assets/icons/lock.png')}
                        />
                        <Text style={styles.profileHeaderText6}>
                            {privacy}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRightPress}
                    style={{ flex: 1 }}>
                    <View style={styles.profileHeaderView6}>
                        <Text style={styles.profileHeaderText7}>
                            {(saveView === 'save') ? 'Edit Profile' : (saveView === 'edit') ? 'Save Profile' : 'Message'}
                        </Text>
                        <Image
                            style={[styles.profileHeaderImage3, (saveView === 'edit' || saveView === 'save') ? {} : styles.profileHeaderImage4]}
                            source={(saveView === 'edit' || saveView === 'save') ? require('../../assets/icons/settings.png') : require('../../assets/icons/message.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};


export { ProfileHeader };