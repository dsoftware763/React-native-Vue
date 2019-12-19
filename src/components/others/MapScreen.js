import React, { Component } from 'react';
import { View, ImageBackground, Text, Dimensions, Animated } from 'react-native';
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';
import Drawer from 'react-native-drawer';
import DrawerScreen from './DrawerScreen';
import UserLocationsScreen from './UserLocationsScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';


class MapScreen extends Component {

    constructor(props) {
        super(props)
        this.sliderHeight = heightPercentageToDP('50%');
        this.bounceValue = new Animated.Value(1000);
        this.state = {
            toggle: false,
            showSlider: false,
            sliderHeight: heightPercentageToDP('50%'),
            openedFull: false
        }
    }

    componentDidMount() {
    }

    toggleDrawer = () => {
        if (this.state.toggle) {
            this._drawer.close();
        } else {
            this._drawer.open();
        }
        this.setState({
            toggle: !(this.state.toggle)
        })
    }

    onProfilePress = () => {
        this.setState({
            showSlider: true,
            animatedValue: new Animated.Value(heightPercentageToDP('50%')),
        });

    }

    _toggleSubview = () => {
        // this.setState({
        //     showSlider: !(this.state.showSlider) ? true : false
        // });

        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(
            this.bounceValue,
            {
                toValue: 0,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        
    }

    sliderUp = () => {

        if(this.state.openedFull){
            this.setState({
                sliderHeight: heightPercentageToDP('0%'),
                openedFull: false
            })
            //this.sliderHeight= heightPercentageToDP('80%');
            this.bounceValue = new Animated.Value(1000);
            Animated.spring(
                this.bounceValue,
                {
                    toValue: 0,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }else{
            this.setState({
                sliderHeight: heightPercentageToDP('80%'),
                openedFull: true
            })
            //this.sliderHeight= heightPercentageToDP('80%');
            this.bounceValue = new Animated.Value(2000);
            Animated.spring(
                this.bounceValue,
                {
                    toValue: 0,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

    }

    renderSlider() {

        return (
            <Animated.View
                style={[{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#FFFFFF",
                    height: this.state.sliderHeight,
                },
                { transform: [{ translateY: this.bounceValue }] }]}
            >
                <UserLocationsScreen
                    sliderUp={this.sliderUp}
                />
            </Animated.View>


        );

    }

    render() {
        return (

            <ImageBackground source={require('../../assets/images/background1.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}>

                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'flex-start', flex: 0.1 }}>
                        <Header openDrawer={this.toggleDrawer} onProfilePress={this._toggleSubview} />
                    </View>
                    <View style={{ flex: 0.83, marginTop: 8 }} >
                        <Drawer
                            ref={(ref) => this._drawer = ref}
                            content={<DrawerScreen navigationProps={this.props.navigation} toggleDrawer={this.toggleDrawer} />}
                        >
                            {this.renderSlider()}
                        </Drawer>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 0.07, marginTop: 12 }}>
                        <Footer navigationProps={this.props.navigation} />
                    </View>
                </View>

            </ImageBackground>

        );
    }

}

export default MapScreen;