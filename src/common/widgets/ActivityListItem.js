import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../../utils/ApiConstants';

const ActivityListItem = ({ item, showRightView, smallIcon, gradient, onAccept, onReject }) => {

    var image_uri = BASE_URL + item.profilePicturePath;

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={(gradient) ? ['#5617AC', '#4639C7', '#2A5CD1'] : ['#000', '#000', '#000']} style={{ opacity: 0.9 }}>
            <View style={styles.acivityListItemView1}>
                <View style={styles.acivityListItemView2}>
                    <Image
                        source={(item.profilePicturePath !== null && item.profilePicturePath !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                        style={styles.acivityListItemImage1}
                    />
                    {renderPrivateIcon(smallIcon)}
                </View>

                <View style={styles.acivityListItemView3}>
                    <Text style={styles.acivityListItemText1}>
                        {item.text}
                    </Text>

                    <View style={styles.acivityListItemView4}>
                        <Image
                            source={require('../../assets/icons/location_colored.png')}
                            style={styles.acivityListItemImage2}
                        />
                        <Text style={styles.acivityListItemText2}>
                            {/* {item.address + ' | ' + item.time} */}
                            {'undefined' + ' | ' + item.time}
                        </Text>
                    </View>
                </View>

                <View style={[styles.acivityListItemView5]}>
                    {renderRightView(showRightView, onAccept, onReject)}
                </View>

            </View>
        </LinearGradient>
    );
};

const renderRightView = (showRightView, onAccept, onReject) => {
    if (showRightView) {
        return (
            <View style={styles.acivityListItemView6}>
                <TouchableOpacity onPress={onAccept}>
                    <Image
                        source={require('../../assets/icons/check_circle.png')}
                        style={styles.acivityListItemImage3}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onReject}>
                    <Image
                        source={require('../../assets/icons/cross_circle.png')}
                        style={styles.acivityListItemImage4}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const renderPrivateIcon = (smallIcon) => {
    return (
        <Image
            source={smallIcon}
            style={styles.acivityListItemImage5}
        />
    );
}

export { ActivityListItem };