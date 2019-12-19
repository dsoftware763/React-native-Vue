import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { Switch } from 'react-native-switch';
import Moment from 'moment';
import { Dialog } from 'react-native-simple-dialogs';
import Singleton from '../../utils/Singleton';
import { connect } from 'react-redux';
import { sendNotification } from '../../actions/notification';

const minus = require('../../assets/icons/minus.png')
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            notificationCount: 0,
            currentTime: '00:00 am'
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: Moment(new Date()).format('hh:mm a')
            })
        }, 1000)
    }

    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    setTime = () => {

    }

    render() {

        return (
            <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#F0F8FF01' }, (Platform.OS === 'android') ? { marginTop: 16 } : {}]}>

                <View style={{ flex: 0.2 }}>
                    <TouchableOpacity onPress={this.props.onLocationPress}>
                        <View style={{ marginTop: -8 }}>
                            <Image
                                source={require('../../assets/icons/location.png')}
                                style={[{ width: 20, height: 30, marginLeft: 16 }, (Platform.OS === 'android') ? { width: 22, height: 32 } : {}]}
                            />
                            <Text style={{ color: 'white', backgroundColor: '#4840E3', borderRadius: 8, padding: 3, alignSelf: 'center', fontSize: 8, textAlign: 'center', marginTop: -30, marginLeft: 2 }}>
                                {this.props.notification.count}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <View style={{ borderColor: 'white', borderRadius: 20, borderWidth: 1, alignItems: 'center' }}>
                        <Switch
                            circleSize={22}
                            barHeight={24}
                            backgroundActive={'#F0F8FF01'}
                            backgroundInactive={'#F0F8FF01'}
                            circleActiveColor={'#1E70F1'}
                            circleInActiveColor={'#ffffff'}
                            circleBorderWidth={0}
                            switchWidthMultiplier={2.5}
                            value={this.props.switch}
                            onValueChange={this.props.onSwitchChange}
                        />
                    </View>
                </View>

                <View style={{ flex: 0.2, paddingRight: 8 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                            {this.state.currentTime}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
                            <TouchableOpacity onPress={this.setTime} >
                                <View style={{ backgroundColor: '#00000030', borderRadius: 20, alignItems: 'center' }}>
                                    <Image source={require('../../assets/icons/minus.png')}
                                        style={{ width: 20, height: 20 }} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderColor: '#00000030', borderWidth: 2, alignItems: 'center', marginLeft: 8, padding: 4 }}>
                                <Text>{this.state.currentTime}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={{ alignItems: "center", backgroundColor: '#00000030', paddingLeft: 34, paddingRight: 34, paddingTop: 4, paddingBottom: 4, marginTop: 12 }} >
                                <Text>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </View>
        );
    }

}


const mapStateToProps = ({ notification }) => {
    return { notification };
};
export default connect(mapStateToProps, {
    sendNotification
})(Footer);
