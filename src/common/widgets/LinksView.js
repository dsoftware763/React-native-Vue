import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import LinearGradient from 'react-native-linear-gradient';

const LinksView = ({ text, icon, tick, onAddPress, type }) => {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={(tick) ? ['#5617AC', '#4639C7', '#2A5CD1'] : ['#000', '#000', '#000']} style={{ opacity: 0.9 }}>
            <View style={[styles.linksView1, (tick) ? {} : styles.linksView2]}>
                <View style={styles.linksView6}>

                    <Image
                        source={icon}
                        style={styles.linksImage1}
                    />

                    <Text style={[styles.linksText1, (text === 'not linked') ? styles.linksText2 : {}]}>
                        {text}
                    </Text>
                </View>

                {addView(tick, onAddPress, type)}

            </View>
        </LinearGradient>
    );
};

const addView = (tick, onAddPress, type) => {
    if (!tick) {
        return (
            <View style={styles.linksView3}>
                <TouchableOpacity onPress={onAddPress}>
                    <View style={styles.linksView4}>
                        <Text style={styles.linksText3}>
                            {(type === 'gmail') ? 'send' : (type === 'website') ? 'visit' : 'add'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    } else {
        return (
            <View style={styles.linksView5}>
                <Image
                    source={require('../../assets/icons/tick.png')}
                    style={styles.linksImage2}
                />
            </View>
        );
    }
}

export { LinksView };