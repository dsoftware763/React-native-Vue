import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { UserLocationListItem } from '../../common/widgets';
import { styles } from '../../styles/UserLocationStyles';
import { onRequestUser } from '../../actions/users';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';

class UserLocationsScreen extends Component {

    renderListItem(item) {
        return (
            <TouchableOpacity onPress={() => {
                if (item.item.publicAccount) {
                    var self = this;
                    this.props.slideDown();
                    setTimeout(function () { self.props.self.setState({ screen: 'UserProfile', selectedUserMail: item.item.emailAddress }) }, 1000);

                }
            }}>
                <UserLocationListItem
                    privateView={false}
                    smallIcon={require('../../assets/icons/lock_purple.png')}
                    rightView='tap'
                    item={item}
                    onRequest={this.onRequestUser.bind(this, item.item)}
                />
            </TouchableOpacity>
        );
    }

    onRequestUser = (item) => {
        AsyncStorage.getItem('user_token', (err, token) => {
            if (token !== null) {
                AsyncStorage.getItem('user_id', (err, id) => {
                    if (id !== null) {
                        this.props.onRequestUser(id, item.id, token);
                    }
                });
            }
        });
    }

    // renderLoader() {
    //     return (
    //         <ProgressDialog
    //             visible={this.props.users.loading}
    //             message="Please, wait..."
    //         />
    //     );
    // }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/* {this.renderLoader()} */}
                <TouchableOpacity onPress={(this.props.sliderHeight === 'full') ? this.props.slideDown : this.props.slideUp}>
                    <Image
                        source={(this.props.sliderHeight === 'full') ? require('../../assets/icons/arrow_down.png') : require('../../assets/icons/arrow_up.png')}
                        style={styles.arrowUpImage}
                    />
                </TouchableOpacity>
                <FlatList
                    style={[styles.list]}
                    data={this.props.usersList}
                    renderItem={this.renderListItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={false}
                />
                <View style={styles.filterContainer}>
                    <View style={styles.filterImageContainer}>
                        <TouchableOpacity onPress={() => {
                            this.props.slideDown();
                            this.props.self.setState({ screen: 'Filter', filterFrom: 'users' })
                        }}>
                            <Image
                                source={require('../../assets/icons/filter.png')}
                                style={styles.filterImage}
                            />
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.filterText}>
                        Refine Search
                    </Text>
                </View>

            </View >
        );
    }

}

const mapStateToProps = ({ users }) => {
    return { users };
};
export default connect(mapStateToProps, {
    onRequestUser
})(UserLocationsScreen);