import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';
import { BASE_URL } from '../../utils/ApiConstants';

const InboxListItem = ({ item }) => {

    var image_uri = BASE_URL + item.profilePicturePath;

    return (
        <View style={styles.inboxListItemView1}>
            <View style={styles.inboxListItemView2}>
                <Image
                    source={(item.profilePicturePath !== null && item.profilePicturePath !== '') ? { uri: image_uri } : require('../../assets/icons/profile.png')}
                    style={styles.inboxListItemImage1}
                />
            </View>

            <View style={[styles.inboxListItemView3, (item.readMessage) ? styles.inboxListItemView4 : {}]}>
                <View style={styles.inboxListItemView5}>
                    {renderNameImageLeft(item)}
                    <Text style={styles.inboxListItemText1}>
                        {item.firstName}
                    </Text>
                    {renderNameImageRight(item)}
                </View>
                <Text style={styles.inboxListItemText2}>
                    {item.message}
                </Text>
            </View>

            <View style={[styles.inboxListItemView6]}>
                {renderRightView()}
            </View>

        </View>
    );
};

const renderNameImageLeft = (item) => {
    if (item.readMessage && !item.sentBysender)
        return (
            <Image
                source={require('../../assets/icons/arrow_forward_msg.png')}
                style={styles.inboxListItemImage2}
            />
        );
}

const renderNameImageRight = (item) => {
    if (item.readMessage && item.sentBysender)
        return (
            <Image
                source={require('../../assets/icons/reply_msg.png')}
                style={styles.inboxListItemImage2}
            />
        );
}

const renderRightView = () => {
    return (
        <Image
            source={require('../../assets/icons/arrow_forward.png')}
            style={styles.inboxListItemImage3}
        />
    );
}

export { InboxListItem };