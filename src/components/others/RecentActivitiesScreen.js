import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActivityScreen from './ActivityScreen';
import InboxScreen from './InboxScreen';
import ConnectsScreen from './ConnectsScreen';
import { styles } from '../../styles/RecentActivitiesStyles';
class RecentActivitiesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false
        }
        if (this.props.self.state.selectedTab === 3) {
            this.state = {
                tab1: false,
                tab2: false,
                tab3: true
            }
        }else if(this.props.self.state.selectedTab === 2){
            this.state = {
                tab1: false,
                tab2: true,
                tab3: false
            }
        }
    }

    onTab1Press = () => {
        this.props.self.setState({
            selectedTab: 1
        });
        this.setState({
            tab1: true, tab2: false, tab3: false
        });
    }

    onTab2Press = () => {
        this.props.self.setState({
            selectedTab: 2
        });
        this.setState({
            tab2: true, tab1: false, tab3: false
        });
    }

    onTab3Press = () => {
        this.setState({
            tab3: true, tab1: false, tab2: false
        })
    }

    renderList() {
        if (this.state.tab1) {
            return (
                <ActivityScreen />
            );
        } else if (this.state.tab2) {
            return (
                <InboxScreen self={this.props.self} />
            );
        } else {
            return (
                <ConnectsScreen self={this.props.self} />
            );
        }
    }

    renderFilter() {
        if (this.state.tab3) {
            return (
                <View style={styles.filterContainer}>
                    <View style={styles.filterImageContainer}>
                        <TouchableOpacity onPress={() => {
                            this.props.self.setState({ screen: 'Filter', filterFrom: 'connects' })
                        }}>
                            <Image
                                source={require('../../assets/icons/filter.png')}
                                style={styles.filterImage}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.filterContainerText}>
                        Refine Search
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>

                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={this.onTab1Press} style={{ flex: 1 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={(this.state.tab1) ? ['#5617AC', '#4639C7', '#2A5CD1'] : ['#000', '#000', '#000']} style={styles.gradientContainer}>
                            <View style={[styles.tabTextContainer, (this.state.tab1) ? {} : styles.tabContainer2]}>
                                <Text style={styles.tabText}>
                                    Activity
                            </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onTab2Press} style={{ flex: 1 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={(this.state.tab2) ? ['#5617AC', '#4639C7', '#2A5CD1'] : ['#000', '#000', '#000']} style={styles.gradientContainer}>
                            <View style={[styles.tabTextContainer, (this.state.tab2) ? {} : styles.tabContainer2]}>
                                <Text style={styles.tabText}>
                                    Inbox
                            </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onTab3Press} style={{ flex: 1 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={(this.state.tab3) ? ['#5617AC', '#4639C7', '#2A5CD1'] : ['#000', '#000', '#000']} style={styles.gradientContainer}>
                            <View style={[styles.tabTextContainer, (this.state.tab3) ? {} : styles.tabContainer2]}>
                                <Text style={styles.tabText}>
                                    Connects
                            </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.listContainer}>
                    {this.renderList()}
                </View>
                {this.renderFilter()}

            </View>
        );
    }

}

export default RecentActivitiesScreen;