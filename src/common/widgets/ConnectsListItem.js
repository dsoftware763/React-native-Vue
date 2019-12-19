import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { BASE_URL } from '../../utils/ApiConstants';
import Moment from 'moment';

const ConnectsListItem = ({ privateView, item }) => {

    var image_uri = BASE_URL + item.profilePicture;
    var time = Moment(item.time).format('HH:mm a');

    return (
        <View style={styles.connectsListItemView1}>
            <View style={styles.connectsListItemView8}>
                <Image
                    source={(item.profilePicture !== null && item.profilePicture !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                    style={styles.connectsListItemImage1}
                />
                {renderPrivateIcon(privateView)}
            </View>

            <View style={styles.connectsListItemView2}>
                <Text style={styles.connectsListItemText1}>
                    {item.firstName}
                </Text>

                <View style={styles.connectsListItemView3}>
                    <Image
                        source={require('../../assets/icons/location_colored.png')}
                        style={styles.connectsListItemImage2}
                    />
                    <Text style={styles.connectsListItemText2}>
                        {item.address} | {time}
                    </Text>
                </View>
            </View>

            <View style={[styles.connectsListItemView4, (privateView) ? styles.connectsListItemView6 : styles.connectsListItemView7]}>
                {renderTapView(privateView)}
            </View>

        </View>
    );
};

const renderTapView = (privateView) => {
    if (privateView) {
        return (
            <TouchableOpacity>
                <View style={styles.connectsListItemView5}>
                    <Text style={styles.connectsListItemText3}>
                        tap
                    </Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <Image
                source={require('../../assets/icons/arrow_forward.png')}
                style={styles.connectsListItemImage3}
            />
        );
    }
}

const renderPrivateIcon = (privateView) => {
    if (privateView)
        return (
            <Image
                source={require('../../assets/icons/lock_purple.png')}
                style={styles.connectsListItemImage4}
            />
        );
}

export { ConnectsListItem };