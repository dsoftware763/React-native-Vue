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
        // marginTop: 24,
        width: wp('22%'),
        height: wp('22%')
    },

    text1: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500'
    },
    text2: {
        marginTop: hp('20%'),
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        fontWeight: '700'
    },

    text2Android: {
        marginTop: hp('10%'),
    },

    createTextContainer: {
        backgroundColor: '#000000',
        borderRadius: 30,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 28
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
        textAlign: 'center',
        fontWeight: '500'
    },

    view1: { backgroundColor: '#F0F8FF30', borderRadius: 30, width: wp('84%'), flexDirection: 'row', alignItems: 'center' },

    dobStyle: { flex: 0.85, fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 13, color: 'white' },

    view2: { marginTop: 12, flex: 1, alignItems: 'center', flexDirection: 'row', width: wp('84%') }


});