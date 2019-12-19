import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: { 
        backgroundColor: '#000000', 
        opacity: 0.9, 
        width: '100%', 
        height: '100%', 
        padding: 32 
    },

    text: { 
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500' 
    }

});