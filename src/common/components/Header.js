import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import Singleton from '../../utils/Singleton';
import { BASE_URL } from '../../utils/ApiConstants';
import ImageLoad from '../../common/components/ImageLoad';

const singleton = Singleton.getInstance();
class Header extends Component {

    render() {

        let imageUri = BASE_URL + singleton.getProfilePic();

        return (
            <View style={[{ flexDirection: 'row', height: 70, alignItems: 'center', marginBottom: 8, backgroundColor: '#F0F8FF01' }, (Platform.OS === 'android') ? { height: 45 } : {}]}>
                <View style={{ alignSelf: 'flex-end', flex: 0.1, paddingLeft: 10 }}>
                    <TouchableOpacity onPress={this.props.openDrawer}>
                        <Image
                            source={require('../../assets/icons/drawer.png')}
                            style={{ width: 25, height: 25, padding: 16 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.8 }}></View>
                <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'flex-end', flex: 0.1, paddingRight: 10 }}>
                    <TouchableOpacity onPress={this.props.onProfilePress}>
                        <ImageLoad
                            source={(singleton.getProfilePic() !== null && singleton.getProfilePic() !== '') ? { uri: imageUri } : require('../../assets/icons/profile.png')}
                            style={{ width: 25, height: 25, alignSelf: 'flex-end', padding: 16 }}
                            borderRadius={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default Header;