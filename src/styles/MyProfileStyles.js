import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    scrollViewContainer: { 
        backgroundColor: '#000000', 
        opacity: 0.9
    },

    mainContainer: { 
        flex: 1 
    },

    headerContainer: { 
        flexDirection: 'row', 
        backgroundColor: '#000000', 
        opacity: 0.9, 
        width: '100%', 
        padding: 12 
    },

    headerLeftViewContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 8 
    },

    headerLeftImage: { 
        width: 10, 
        height: 15 
    },

    headerLeftText: { 
        color: 'white', 
        paddingLeft: 8, 
        fontSize: 13 
    },

    headerRightViewContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingRight: 8, 
        justifyContent: 'flex-end' 
    },

    headerRightText: { 
        color: 'white', 
        fontSize: 13, 
        paddingRight: 8 
    },

    headerRightImage: { 
        width: 15, 
        height: 15 
    },

    dialogView1: { backgroundColor: '#00000030', borderRadius: 30, flexDirection: 'row', alignItems: 'center', width: '100%' },

    dialogTextInput1: { fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 13, color: 'white' },

    dialogView2: {
        backgroundColor: '#00000050',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 16,
        alignItems: 'center',
        width: '40%'
    },

    dialogText1: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500'
    }


});