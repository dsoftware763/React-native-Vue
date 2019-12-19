import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../styles/FilterStyles';
import { onRefineUser } from '../../actions/users';
import { onRefineConnects } from '../../actions/activities';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Singleton from '../../utils/Singleton';

const singleton = Singleton.getInstance();
class FilterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderMen: true,
            genderWomen: false,
            genderAll: false,
            gender: 'male',

            age1: true,
            age2: false,
            age3: false,
            age4: false,
            age: '18-25',

            time1: true,
            time2: false,
            time3: false,
            time4: false,
            time5: false,
            time: '1',

            search: ''
        }
    }

    renderSeekDots(gender) {
        if (gender) {
            return (
                <View>
                    <Image
                        source={require('../../assets/icons/seekbar_marker.png')}
                        style={styles.seekbarWhiteImage}
                    />
                </View>
            );
        }
        return (
            <View style={styles.seekbarBlackDotView} />
        );
    }

    renderTimeSeek() {
        return (
            <View style={styles.seekbarContainer}>
                <View style={styles.seekbarSmallCircle} />
                <View style={styles.seekbarSmallView} />
                {this.renderSeekDots(this.state.time1)}
                <View style={styles.seekbarTimeLargeView} />
                {this.renderSeekDots(this.state.time2)}
                <View style={styles.seekbarTimeLargeView} />
                {this.renderSeekDots(this.state.time3)}
                <View style={styles.seekbarTimeLargeView} />
                {this.renderSeekDots(this.state.time4)}
                <View style={styles.seekbarTimeLargeView} />
                {this.renderSeekDots(this.state.time5)}
                <View style={styles.seekbarSmallView} />
                <View style={styles.seekbarSmallCircle} />
            </View>
        );
    }

    onTimePress = (time) => {
        switch (time) {
            case 1:
                this.setState({ time1: true, time2: false, time3: false, time4: false, time5: false, time: '1' });
                return;
            case 2:
                this.setState({ time1: false, time2: true, time3: false, time4: false, time5: false, time: '6' })
                return;
            case 3:
                this.setState({ time1: false, time2: false, time3: true, time4: false, time5: false, time: '12' })
                return;
            case 4:
                this.setState({ time1: false, time2: false, time3: false, time4: true, time5: false, time: '18' })
                return;
            case 5:
                this.setState({ time1: false, time2: false, time3: false, time4: false, time5: true, time: '24' })
                return;
            default:
                return
        }
    }

    renderTimeText() {
        return (
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={this.onTimePress.bind(this, 1)}>
                    <Text style={[styles.timeText]}>
                        1 hr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onTimePress.bind(this, 2)}>
                    <Text style={[styles.timeText]}>
                        6 hr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onTimePress.bind(this, 3)}>
                    <Text style={styles.timeText}>
                        12 hr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onTimePress.bind(this, 4)}>
                    <Text style={styles.timeText}>
                        18 hr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onTimePress.bind(this, 5)}>
                    <Text style={styles.timeText}>
                        24 hr
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderAgeSeek() {
        return (
            <View style={styles.seekbarContainer}>
                <View style={styles.seekbarSmallCircle} />
                <View style={styles.seekbarSmallView} />
                {this.renderSeekDots(this.state.age1)}
                <View style={styles.seekbarAgeLargeView} />
                {this.renderSeekDots(this.state.age2)}
                <View style={styles.seekbarAgeLargeView} />
                {this.renderSeekDots(this.state.age3)}
                <View style={styles.seekbarAgeLargeView} />
                {this.renderSeekDots(this.state.age4)}
                <View style={styles.seekbarSmallView} />
                <View style={styles.seekbarSmallCircle} />
            </View>
        );
    }

    onAgePress = (gender) => {
        switch (gender) {
            case 1:
                this.setState({ age1: true, age2: false, age3: false, age4: false, age: '18-25' });
                return;
            case 2:
                this.setState({ age1: false, age2: true, age3: false, age4: false, age: '25-35' })
                return;
            case 3:
                this.setState({ age1: false, age2: false, age3: true, age4: false, age: '35-45' })
                return;
            case 4:
                this.setState({ age1: false, age2: false, age3: false, age4: true, age: 'All' })
                return;
            default:
                return
        }
    }

    renderAgeText() {
        return (
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={this.onAgePress.bind(this, 1)}>
                    <Text style={[styles.ageText]}>
                        18-25
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onAgePress.bind(this, 2)}>
                    <Text style={[styles.ageText]}>
                        25-35
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onAgePress.bind(this, 3)}>
                    <Text style={styles.ageText}>
                        35-45
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onAgePress.bind(this, 4)}>
                    <Text style={styles.ageText}>
                        All
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderGenderSeek() {
        return (
            <View style={styles.seekbarContainer}>
                <View style={styles.seekbarSmallCircle} />
                <View style={styles.seekbarSmallView} />
                {this.renderSeekDots(this.state.genderMen)}
                <View style={styles.seekbarGenderLargeView} />
                {this.renderSeekDots(this.state.genderWomen)}
                <View style={styles.seekbarGenderLargeView} />
                {this.renderSeekDots(this.state.genderAll)}
                <View style={styles.seekbarSmallView} />
                <View style={styles.seekbarSmallCircle} />
            </View>
        );
    }

    onGenderPress = (gender) => {
        switch (gender) {
            case 'men':
                this.setState({ genderMen: true, genderAll: false, genderWomen: false, gender: 'male' });
                return;
            case 'women':
                this.setState({ genderMen: false, genderAll: false, genderWomen: true, gender: 'female' })
                return;
            case 'all':
                this.setState({ genderMen: false, genderAll: true, genderWomen: false, gender: 'All' })
                return;
            default:
                return
        }
    }

    renderGenderText() {
        return (
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={this.onGenderPress.bind(this, 'men')}>
                    <Text style={[styles.genderText]}>
                        Men
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onGenderPress.bind(this, 'women')}>
                    <Text style={[styles.genderText]}>
                        Women
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onGenderPress.bind(this, 'all')}>
                    <Text style={styles.genderText2}>
                        All
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    onSearchChangeText = (text) => {
        this.setState({
            search: text
        });
    }

    onUpdate = () => {
        const { gender, age, time, search } = this.state;
        AsyncStorage.getItem('user_token', (err, result) => {
            if (result !== null) {
                if (this.props.self.state.filterFrom === 'users') {
                    this.props.onRefineUser(age, gender, time, search, this.props.self, result);
                } else {
                    this.props.onRefineConnects(age, gender, time, search, this.props.self, singleton.getUserId(), result);
                }

            }
        });
    }

    renderLoader() {
        return (
            <ProgressDialog
                visible={this.props.users.loading || this.props.activities.loading}
                message="Please, wait..."
            />
        );
    }

    onPressBack = () => {
        if (this.props.self.state.filterFrom === 'users') {
            this.props.self.setState({ screen: 'UserLocations' })
            this.props.self.open();
        } else {
            this.props.self.setState({ screen: 'Activities', selectedTab: 3 });
        }
    }

    render() {
        return (

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#572BD9', '#4840E3', '#3559EF']} style={styles.gradientContainer}>

                <View style={styles.headerContainer}>
                    {this.renderLoader()}
                    <View style={styles.headerSubContainer}>
                        <TouchableOpacity onPress={this.onPressBack}>
                            <Image
                                style={styles.headerImage}
                                source={require('../../assets/icons/back_arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressBack}>
                            <Text style={styles.headerText}>
                                Back To Results
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.text}>
                            REFINE SEARCH
                    </Text>

                        <View style={[styles.searchContainer, (Platform.OS === 'android') ? styles.searchContainerAndroid : {}]}>

                            <Image
                                style={[styles.searchIcon]}
                                source={require('../../assets/icons/search.png')}
                            />
                            <View style={[styles.searchInputContainer]}>
                                <TextInput
                                    style={[styles.searchInput]}
                                    placeholder='Search by name'
                                    placeholderTextColor='white'
                                    returnKeyType='done'
                                    value={this.state.search}
                                    onChangeText={this.onSearchChangeText}
                                />

                                <Image
                                    style={[styles.searchArrow]}
                                    source={require('../../assets/icons/arrow_forward.png')}
                                />
                            </View>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>
                                GENDER
                    </Text>
                        </View>

                        {this.renderGenderSeek()}

                        {this.renderGenderText()}

                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>
                                AGE
                    </Text>
                        </View>

                        {this.renderAgeSeek()}

                        {this.renderAgeText()}

                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>
                                TIME PERIOD
                    </Text>
                        </View>

                        {this.renderTimeSeek()}

                        {this.renderTimeText()}

                        <TouchableOpacity onPress={this.onUpdate}>
                            <View style={styles.createTextContainer}>
                                <Text style={styles.createText}>
                                    UPDATE RESULTS
                            </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onPressBack}>
                            <Text style={styles.cancelText}>
                                Cancel
                    </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>

        );
    }

}

const mapStateToProps = ({ users, activities }) => {
    return { users, activities };
};
export default connect(mapStateToProps, {
    onRefineUser,
    onRefineConnects
})(FilterScreen);
