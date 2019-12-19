import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: { 
        height:hp('80%'),
        backgroundColor: '#000000', 
        opacity: 0.9, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 8,
        flex: 1
    },

    arrowUpImage: {
        width: 30,
        height: 20
    },

    list: { 
        paddingLeft: 8, 
        paddingBottom: 8, 
        paddingRight: 8, 
        width: '100%'
    },

    filterContainer:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 12 
    },

    filterImageContainer: { 
        alignItems: 'flex-start', 
        flex: 0.2 
    },

    filterImage: { 
        width: 20, 
        height: 20, 
        marginLeft: 4 
    },

    filterText: { 
        color: 'white', 
        flex: 0.8, 
        fontSize: 10, 
        fontWeight: '500', 
        textAlign: 'right', 
        paddingRight: 12 
    }

});