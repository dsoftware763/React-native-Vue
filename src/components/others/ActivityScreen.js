import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SwipeRow } from 'react-native-swipe-list-view';
import { ActivityListItem } from '../../common/widgets';
import { styles } from '../../styles/ActivityStyles';
import { acceptRequest, removeConnection, fetchActivities } from '../../actions/activities';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();
class ActivityScreen extends Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                this.props.fetchActivities(singleton.getUserId(), result);
            }
        });
    }

    onAcceptRequestPress = (id) => {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                this.props.acceptRequest(singleton.getUserId(), id, token);
            }
        });
    }

    onRejectRequestPress = (id) => {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                this.props.removeConnection(id, token);
            }
        });
    }

    fetchIcons = (type) => {
        switch (type) {
            case 'view':
                return require('../../assets/icons/search_colored.png');
            case 'facebook':
                return require('../../assets/icons/facebook_colored.png');
            case 'snapchat':
                return require('../../assets/icons/snapchat_colored.png');
            case 'instagram':
                return require('../../assets/icons/insta_colored.png');
            case 'twitter':
                return require('../../assets/icons/twitter_colored.png');
            case 'youtube':
                return require('../../assets/icons/youtube_colored.png');
            case 'linkedIn':
                return require('../../assets/icons/linkedin_colored.png');
            case 'message':
                return require('../../assets/icons/mail_colored.png');
            default:
                return null;
        }
    }

    renderListView(item) {
        return (
            <ActivityListItem
                item={item.item}
                showRightView={(item.item.type === 'friendRequest') ? true : false}
                smallIcon={this.fetchIcons(item.item.type)}
                gradient={(item.item.type === 'connection') ? true : false}
                onAccept={this.onAcceptRequestPress.bind(this, item.item.id)}
                onReject={this.onRejectRequestPress.bind(this, item.item.id)}
            />
        );

    }

    renderListItem(item) {
        return (
            <SwipeRow
                rightOpenValue={-85}
                disableRightSwipe={true}
                disableLeftSwipe={(item.item === 3) ? false : true}
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
        if (this.props.activities.activitesList.length === 0) {
            return (
                <View style={styles.view1}>
                    <Image
                        source={require('../../assets/icons/ic_nodata.png')}
                        style={styles.image1}
                    />
                    <Text style={styles.text1}>
                        There are no Activities!
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.activities.activitesList}
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
    acceptRequest, removeConnection, fetchActivities
})(ActivityScreen);