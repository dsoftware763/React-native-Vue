import React from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';
import {styles} from '../styles';

const MessageListItem = ({ item, userId }) => {

    // var time = Moment(item.date).format('MMM DD, YYYY @ HH:mm a');
    var time = Moment(item.date).format('hh:mm a');
    var messageDate = Moment(item.date).format('MMM DD, YYYY');
    var today = new Date();
    var currentDate = Moment(today).format('MMM DD, YYYY');
    if (!messageDate.match(currentDate)) {
        time = Moment(item.date).format('MMM DD, YYYY hh:mm a');
    }

    return (
        <View style={[styles.messageListItemView1, (item.senderId !== userId) ? styles.messageListItemView2 : styles.messageListItemView3]}>
            <View style={styles.messageListItemView4}>
                <Text style={[styles.messageListItemText1, (item.senderId !== userId) ? styles.messageListItemText2 : styles.messageListItemText3]}>
                    {item.message}
                </Text>
                <Text style={[styles.messageListItemText4, (item.senderId !== userId) ? styles.messageListItemView2 : styles.messageListItemView3]}>
                    {time}
                </Text>
            </View>
        </View>
    );
};

export { MessageListItem };