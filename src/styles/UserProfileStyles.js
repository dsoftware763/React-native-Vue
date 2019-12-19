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

    headerSubContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 8 
    },

    headerImage: { 
        width: 10, 
        height: 15 
    },

    headerText: { 
        color: 'white', 
        paddingLeft: 8, 
        fontSize: 13 
    }


});