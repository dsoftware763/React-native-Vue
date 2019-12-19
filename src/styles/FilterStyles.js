import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    gradientContainer: {
        flex: 1,
        opacity: 0.9,
        alignItems: 'center',
        paddingBottom: 8
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
    },

    text: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginTop: 32
    },

    searchContainer: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        padding: 8,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        alignItems: 'flex-end',
        marginTop: 32,
        width: wp('80%')
    },

    searchContainerAndroid: {
        paddingTop: 4,
        paddingBottom: 4,
    },

    searchIcon: {
        width: hp('2%'),
        height: hp('2%'),
        alignSelf: 'center',
    },

    searchInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginRight: 8,
        marginLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
    },

    searchInput: {
        flex: 1,
        padding: 4,
        color: 'white',
        fontSize: 12,
    },

    searchArrow: {
        justifyContent: 'flex-end',
        width: hp('1.2%'),
        height: hp('1.2%'),
        opacity: 0.7
    },

    textContainer: {
        flexDirection: 'row',
        marginTop: 40,
        paddingLeft: wp('8%')
    },

    text1: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'left',
        flex: 1
    },

    seekbarContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center'
    },

    seekbarSmallCircle: {
        backgroundColor: 'white',
        height: 4,
        width: 4,
        borderRadius: 4
    },

    seekbarSmallView: {
        backgroundColor: 'white',
        height: 1,
        width: wp('5%')
    },

    seekbarGenderLargeView: {
        backgroundColor: 'white',
        height: 1,
        width: wp('28%')
    },

    seekbarAgeLargeView: {
        backgroundColor: 'white',
        height: 1,
        width: wp('18%')
    },

    seekbarTimeLargeView: {
        backgroundColor: 'white',
        height: 1,
        width: wp('13%')
    },

    seekbarBlackDotView: {
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        height: 8,
        width: 8
    },

    seekbarWhiteImage: {
        height: 20,
        width: 20
    },

    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },

    timeText: {
        color: 'white',
        fontSize: 12,
        width: wp('16%'),
        textAlign: 'center',
        fontWeight: '700'
    },

    ageText: {
        color: 'white',
        fontSize: 12,
        width: wp('22%'),
        textAlign: 'center',
        fontWeight: '700'
    },

    genderText: {
        color: 'white',
        fontSize: 12,
        width: wp('31%'),
        textAlign: 'center',
        fontWeight: '700'
    },

    genderText2: {
        color: 'white',
        fontSize: 12,
        width: wp('32%'),
        textAlign: 'center',
        fontWeight: '700'
    },

    createTextContainer: {
        backgroundColor: '#000000', 
        borderRadius: 30, 
        paddingTop: 14, 
        paddingBottom: 14, 
        paddingLeft: 40, 
        paddingRight: 40, 
        marginTop: 40
    },

    createText: { 
        color: 'white',
        fontSize: 12,
        fontWeight:'500'
    },

    cancelText: { 
        color: 'white', 
        fontSize: 12, 
        fontWeight: '500', 
        marginTop: 4 
    }

});