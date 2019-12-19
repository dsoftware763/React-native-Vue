import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: {
        alignItems: 'center',
        padding: 8,
        flex: 1,
        justifyContent: 'center'
    },

    backgroundImage: {
        width: '100%',
        height: '100%'
    },

    logoImage: {
        // marginTop: hp('20%'), 
        width: wp('35%'),
        height: wp('24%')
    },

    text1: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500'
    },

    createTextContainer: {
        backgroundColor: '#000000',
        borderRadius: 30,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 32
    },

    createText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500'
    },

    haveAccountText: {
        marginTop: 8,
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },

    hereText: {
        fontWeight: '700'
    },


});