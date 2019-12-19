import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    swipeableContainer: {
        alignItems: 'center',
        flex: 1,
        alignContent: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#F0F8FF30', 
        marginVertical: 8
    },

    rightText: { 
        color: 'white', 
        textAlign: 'center',
        paddingLeft: 12, 
        fontSize: 12 
    },

    rowContainer: {
        backgroundColor: '#000000'
    },

    view1: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },

    image1: { width: 20, height: 20 },

    text1: { fontSize: 16, color: 'white', marginLeft: 8 },

    view2: { flex: 1, justifyContent: 'center' }


});