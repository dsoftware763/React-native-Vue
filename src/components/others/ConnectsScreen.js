import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { ConnectsListItem } from '../../common/widgets';
import { styles } from '../../styles/ConnectsStyles';
import { fetchConnections, removeConnection } from '../../actions/activities';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();

class ConnectsScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                if (this.props.self.state.selectedTab !== 3)
                    this.props.fetchConnections(singleton.getUserId(), token);
            }
        });
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.activities.rejectedId !== null) {
            if (nextProps.activities.connectionsList.length) {
                nextProps.activities.connectionsList = nextProps.activities.connectionsList.filter(function (user) {
                    return user.id !== nextProps.activities.rejectedId
                })
            }
        }
        // Return null to indicate no change to state.
        return null;
    }

    onItemPress = (item) => {
        this.props.self.setState({ screen: 'UserProfile', selectedUserMail: item.emailAddress })
    }

    onRemovePress = (item) => {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                this.props.removeConnection(item.id, token);
            }
        });
    }

    renderListView(item) {
        return (
            <TouchableOpacity onPress={this.onItemPress.bind(this, item.item)}>
                <ConnectsListItem
                    privateView={false}
                    item={item.item}
                />
            </TouchableOpacity>
        );
    }

    renderListItem(item) {
        return (
            <SwipeRow
                leftOpenValue={85}
                disableRightSwipe={false}
                disableLeftSwipe={true}
            >

                {/* Swipeable Views */}
                <View style={styles.swipeableContainer}>
                    {/* View Left */}
                    <TouchableOpacity onPress={this.onRemovePress.bind(this, item.item)}>
                        <Text style={styles.rightText}>Remove</Text>
                    </TouchableOpacity>
                    {/* View Right */}
                    <View />
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
        if (this.props.activities.connectionsList.length === 0) {
            return (
                <View style={styles.view1}>
                    <Image
                        source={require('../../assets/icons/ic_nodata.png')}
                        style={styles.image1}
                    />
                    <Text style={styles.text1}>
                        There are no Connections!
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={this.props.activities.connectionsList}
                    renderItem={this.renderListItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={false}
                    extraData={this.props}
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
    fetchConnections,
    removeConnection
})(ConnectsScreen);