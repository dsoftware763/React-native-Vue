import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const LinkAccountView = ({ text, data, icon, saveView, onAddMinusPress, move, moveEnd }) => {

    let linked = false;
    if (data !== undefined)
        linked = data.linked

    return (
        <View style={[styles.linkAccountView1, (linked) ? styles.linkAccountView2 : styles.linkAccountView3]}>
            <View style={styles.linkAccountView4}>

                {renderLeftImage(linked, saveView, onAddMinusPress)}

                <Image
                    source={icon}
                    style={styles.linkAccountImage1}
                />

                <Text style={[styles.linkAccountText1, (linked) ? {} : styles.linkAccountText2]}>
                    {text}
                </Text>
            </View>

            {renderRightImage(linked, saveView, move, moveEnd)}

        </View>
    );
};

const renderLeftImage = (linked, saveView, onAddMinusPress) => {
    if (saveView === 'edit')
        return (
            <TouchableOpacity onPress={onAddMinusPress}>
                <Image
                    source={(linked) ? require('../../assets/icons/minus.png') : require('../../assets/icons/plus.png')}
                    style={[styles.linkAccountImage2, (linked) ? {} : styles.linkAccountImage3]}
                />
            </TouchableOpacity>
        );
}

const renderRightImage = (linked, saveView, move, moveEnd) => {
    if (saveView === 'edit')
        return (
            <TouchableOpacity onLongPress={move}
                onPressOut={moveEnd}>
                <Image
                    source={require('../../assets/icons/drawer.png')}
                    style={[styles.linkAccountImage4, (linked) ? {} : styles.linkAccountImage5]}
                />
            </TouchableOpacity>
        );
}

export { LinkAccountView };