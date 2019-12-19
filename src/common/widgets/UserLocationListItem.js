import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { BASE_URL } from '../../utils/ApiConstants';

const UserLocationListItem = ({ privateView, item, onRequest }) => {

    var image_uri = BASE_URL + item.item.profilePicture;

    return (
        <View style={styles.userLocationListItemView1}>
            <View style={styles.userLocationListItemView2}>
                <Image
                    source={(item.item.profilePicture !== null && item.item.profilePicture !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                    style={styles.userLocationListItemImage1}
                />
                {renderPrivateIcon(item.item)}
            </View>

            <View style={styles.userLocationListItemView3}>
                <Text style={styles.userLocationListItemText1}>
                    {item.item.firstName + ' ' + item.item.lastName}
                </Text>

                <View style={styles.userLocationListItemView4}>
                    <Image
                        source={require('../../assets/icons/location_colored.png')}
                        style={styles.userLocationListItemImage2}
                    />
                    <Text style={styles.userLocationListItemText2}>
                        {item.item.address}  |  {item.item.time}
                    </Text>
                </View>
            </View>

            <View style={[styles.userLocationListItemView5, (privateView) ? styles.userLocationListItemView6 : styles.userLocationListItemView7]}>
                {renderTapView(item.item, onRequest)}
            </View>

        </View>
    );
};

const renderTapView = (privateView, onRequest) => {
    if (!privateView.publicAccount) {
        return (
            <TouchableOpacity onPress={onRequest}>
                <View style={styles.userLocationListItemView8}>
                    <Text style={styles.userLocationListItemText3}>
                        tap
                    </Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <Image
                source={require('../../assets/icons/arrow_forward.png')}
                style={styles.userLocationListItemImage3}
            />
        );
    }
}

const renderPrivateIcon = (item) => {
    if (!item.publicAccount)
        return (
            <Image
                source={require('../../assets/icons/lock_purple.png')}
                style={styles.userLocationListItemImage4}
            />
        );
}

export { UserLocationListItem };