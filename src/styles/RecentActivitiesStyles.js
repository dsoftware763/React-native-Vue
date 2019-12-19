import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    mainContainer: { 
        flex: 1, 
        backgroundColor: '#000000', 
        opacity: 0.9 
    },

    tabContainer: { 
        flexDirection: 'row', 
        flex: 0.07
    },

    gradientContainer: { 
        opacity: 0.9, 
        paddingTop: 8,
        paddingBottom: 8 
    },

    tabTextContainer: { 
        alignItems: 'center' 
    }, 
    
    tabContainer2: { 
        backgroundColor: '#000000', 
        opacity: 0.9 
    },

    tabText: { 
        color: 'white' 
    },

    listContainer: { 
        paddingTop: 4, 
        flex:0.90 
    },

    filterContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        flex:0.04 
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

    filterContainerText: { 
        color: 'white', 
        flex: 0.8, 
        fontSize: 10, 
        fontWeight: '500', 
        textAlign: 'right', 
        paddingRight: 12 
    }


});