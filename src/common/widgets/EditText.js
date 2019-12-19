import React from 'react';
import { View, TextInput, Image, Platform } from 'react-native';
import { styles } from '../styles';

const EditText = ({ placeholder, onChangeText, value, secureTextEntry, keyboardType, tick, autoCapitalize, maxLength, focusNext, reference, nextType, currentType }) => {

    return (
        <View style={styles.edittextView1}>
            <TextInput
                ref={(input) => reference(input, currentType)}
                style={styles.edittextTextInput1}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid='transparent'
                placeholder={placeholder}
                placeholderTextColor='#F0F8FF70'
                // color='#ffffff'
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                returnKeyType={(currentType === "phone") ? "done" : "next"}
                onSubmitEditing={() => { (focusNext !== undefined) ? focusNext(nextType) : null }}
                value={value}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
            >
            </TextInput>

            {renderImage(tick, value)}

        </View>
    );
};

const renderImage = (tick, value) => {
    if (tick)
        return (
            <Image
                source={require('../../assets/icons/tick.png')}
                style={[styles.edittextImage1, (value.length > 0) ? {} : styles.edittextImage2, (Platform.OS === 'android') ? styles.edittextImage3 : {}]}
            />
        );
}

export { EditText };