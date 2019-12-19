import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SwipeRow } from 'react-native-swipe-list-view';
import { InboxListItem } from '../../common/widgets';
import { styles } from '../../styles/InboxStyles';
import { fetchInbox } from '../../actions/activities';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();
class InboxScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                this.props.fetchInbox(singleton.getUserId(), token);
            }
        });
    }

    renderListView(item) {
        return (
            <TouchableOpacity onPress={() => {
                this.props.self.setState({ screen: 'Message', messageFrom: 'inbox' });
                singleton.setFriendId(item.item.recieverId);
                singleton.setFriendProfile(item.item);
            }}>
                <InboxListItem
                    item={item.item}
                />
            </TouchableOpacity>
        );

    }

    renderListItem(item) {
        return (
            <SwipeRow
                rightOpenValue={-85}
                disableRightSwipe={true}
                disableLeftSwipe={true}
            >

                {/* Swipeable Views */}
                <View style={styles.swipeableContainer}>
                    {/* View Left */}
                    <View />
                    {/* View Right */}
                    <Text style={styles.rightText}>1 min ago</Text>
                </View>

                {/* Row View */}
                <View style={styles.rowContainer}>
                    {this.renderListView(item)}
                </View>

            </SwipeRow>
        );
    }

    renderLoader() {
        return (
            <ProgressDialog
                visible={this.props.activities.loading}
                message="Please, wait..."
            />
        );
    }

    renderView() {
        if (this.props.activities.inboxList.length === 0) {
            return (
                <View style={styles.view1}>
                    <Image
                        source={require('../../assets/icons/ic_nodata.png')}
                        style={styles.image1}
                    />
                    <Text style={styles.text1}>
                        There are no Messages!
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.activities.inboxList}
                    renderItem={this.renderListItem.bind(this)}
                    // keyExtractor={(item) => item.id}
                    removeClippedSubviews={false}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.view2}>
                {this.renderLoader()}
                {this.renderView()}
            </View>
        );
    }

}

const mapStateToProps = ({ activities }) => {
    return { activities };
};
export default connect(mapStateToProps, {
    fetchInbox
})(InboxScreen);