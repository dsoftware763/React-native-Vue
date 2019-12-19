import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    gradientContainer: { 
        flex: 1 
    },

    headerContainer: { 
        flexDirection: 'row', 
        backgroundColor: '#000000', 
        opacity: 0.9, 
        width: '100%', 
        padding: 12 
    },

    headerImageContainer: { 
        flex: 0.1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 8 
    },

    headerImage: { 
        width: 10, 
        height: 15, 
        opacity: 0.7 
    },

    headerTextContainer: { 
        flex: 0.8, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    headerText: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '700' 
    },

    profileContainer: { 
        padding: 8, 
        alignItems: 'center' 
    },

    profileImage: { 
        width: 40, 
        height: 40,
        borderRadius: 40
    },

    profileText: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '600' 
    },

    profileLocationContainer: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    locationIcon: { 
        width: 7, 
        height: 10 
    },

    locationText: { 
        color: 'white', 
        fontSize: 10, 
        paddingLeft: 4 
    },

    bottomViewContainer: { 
        backgroundColor: '#F0F8FF50', 
        borderRadius: 30, 
        margin: 8, 
        flexDirection: 'row' 
    },

    messageInput: { 
        flex: 0.9, 
        padding: 16, 
        color: 'white' 
    },

    messageInputAndroid: {
        padding: 12, 
    },

    sendIconContainer: { 
        flex: 0.1, 
        justifyContent: 'space-evenly' 
    },

    sendIcon: { 
        width: 25, 
        height: 25 
    },

    listStyle: { flex: 1, width: '100%' }


});