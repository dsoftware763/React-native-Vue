import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    imageBackground: {
        width: '100%',
        height: '100%'
    },

    mainContainer: {
        flex: 1,
    },

    subContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        // height: '100%'
    },

    headerContainer: {
        alignItems: 'flex-start',
        height: hp('10%')
    },

    headerContainerAndroid: {
        height: hp('6%')
    },

    drawerContainer: {
        height: hp('0%'),
        marginTop: 8
    },

    footerContainer: {
        alignItems: 'flex-end',
        top: hp('80%'),
    },

    view1: { flex: 1, width: '100%' },

    mapView: { height: '125%', width: '100%' }


});