import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({

    acivityListItemView1: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },

    acivityListItemView2: { flex: 0.2, alignItems: 'center' },
    
    acivityListItemView3: { flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' },

    acivityListItemView4: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },

    acivityListItemView5: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },

    acivityListItemView6: { flexDirection: 'row', paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4 },

    acivityListItemImage1: { width: 50, height: 50, borderRadius: 50 },

    acivityListItemImage2: { width: 8, height: 10 },

    acivityListItemImage3: { width: 25, height: 25, opacity: 0.8 },

    acivityListItemImage4: { width: 25, height: 25, marginLeft: 6, opacity: 0.8 },

    acivityListItemImage5: { width: 20, height: 20, marginTop: -20, marginLeft: 40, borderRadius: 20 },

    acivityListItemText1: { color: 'white', fontSize: 16, fontWeight: '700' },

    acivityListItemText2: { color: 'white', fontSize: 10, fontWeight: '500', paddingLeft: 4 },

    connectsListItemView1: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },

    connectsListItemView2: { flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' },

    connectsListItemView3: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },

    connectsListItemView4: { flex: 0.2, justifyContent: 'center' },

    connectsListItemView5: { borderColor: 'white', borderRadius: 15, borderWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4 },

    connectsListItemView6: { alignItems: 'center' },

    connectsListItemView7: { alignItems: 'flex-end', paddingRight: 16 },

    connectsListItemView8: { flex: 0.2, alignItems: 'center' },

    connectsListItemImage1: { width: 50, height: 50, borderRadius: 50 },

    connectsListItemImage2: { width: 8, height: 10 },

    connectsListItemImage3: { width: 10, height: 10 },

    connectsListItemImage4: { width: 20, height: 20, marginTop: -20, marginLeft: 40 },

    connectsListItemText1: { color: 'white', fontSize: 16, fontWeight: '700' },

    connectsListItemText2: { color: 'white', fontSize: 10, fontWeight: '500', paddingLeft: 4 },

    connectsListItemText3: { color: 'white', fontSize: 10, fontWeight: '800' },

    edittextView1: { backgroundColor: '#F0F8FF30', borderRadius: 30, width: wp('84%'), flexDirection: 'row', alignItems: 'center' },

    edittextTextInput1: { flex: 0.85, fontSize: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 13, color: 'white' },

    edittextImage1: { width: 12, height: 12, flex: 0.1 },

    edittextImage2: { opacity: 0.5 },

    edittextImage3: { width: 11, height: 17 },

    inboxListItemView1: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },

    inboxListItemView2: { flex: 0.2, alignItems: 'center' },

    inboxListItemView3: { flex: 0.6, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 8 },

    inboxListItemView4: { opacity: 0.5 },

    inboxListItemView5: { flexDirection: 'row', alignItems: 'center' },

    inboxListItemView6: { flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 16 },

    inboxListItemImage1: { width: 50, height: 50, borderRadius: 50 },

    inboxListItemImage2: { width: 12, height: 10 },

    inboxListItemImage3: { width: 10, height: 10 },

    inboxListItemText1: { color: 'white', fontSize: 16, fontWeight: '700', paddingLeft: 4, paddingRight: 4 },

    inboxListItemText2: { color: 'white', fontSize: 12, fontWeight: '500', paddingLeft: 4 },

    linkAccountView1: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#000000' },

    linkAccountView2: { opacity: 0.9 },

    linkAccountView3: { backgroundColor: '#F0F8FF30' },

    linkAccountView4: { flex: 0.95, flexDirection: 'row', alignItems: 'center' },

    linkAccountImage1: { width: 30, height: 30, marginLeft: 12 },

    linkAccountImage2: { width: 15, height: 15, marginTop: 8 },

    linkAccountImage3: { width: 12, height: 12, marginTop: 0, opacity: 0.6 },

    linkAccountImage4: { width: 13, height: 13, flex: 0.05 },

    linkAccountImage5: { opacity: 0.4 },

    linkAccountText1: { color: 'white', fontSize: 12, fontWeight: '500', marginLeft: 12 },

    linkAccountText2: { opacity: 0.4, fontFamily: 'ProximaNova-RegularIt' },

    linksView1: { flexDirection: 'row', alignItems: 'center', padding: 12 },

    linksView2: { backgroundColor: '#000000', opacity: 0.9 },

    linksView3: { flex: 0.15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' },

    linksView4: { borderColor: 'white', borderRadius: 20, borderWidth: 1, alignItems: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12, justifyContent: 'center' },

    linksView5: { flex: 0.15, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    linksView6: { flex: 0.82, flexDirection: 'row', alignItems: 'center' },

    linksImage1: { width: 30, height: 30, marginLeft: 12 },

    linksImage2: { width: 30, height: 30 },

    linksText1: { color: 'white', fontSize: 12, fontWeight: '500', marginLeft: 12 },

    linksText2: {opacity: 0.4, fontFamily: 'ProximaNova-RegularIt' },

    linksText3: { color: 'white', fontSize: 10, fontWeight: '700' },

    messageListItemView1: { flex: 1, flexDirection: 'row', margin: 8 },

    messageListItemView2: { justifyContent: 'flex-start' },

    messageListItemView3: { justifyContent: 'flex-end' },

    messageListItemView4: { backgroundColor: '#F0F8FF30', borderColor: '#F0F8FF30', borderRadius: 10, padding: 12 },

    messageListItemText1: { color: 'white', fontSize: 12, fontWeight: '500' },

    messageListItemText2: { textAlign: 'left' },

    messageListItemText3: { textAlign: 'right' },

    messageListItemText4: { color: 'white', fontSize: 8, fontWeight: '300', marginTop: 2 },

    profileHeaderView1: { flexDirection: 'row', padding: 12 },

    profileHeaderView2: { flex: 0.3, alignItems: 'center' },

    profileHeaderView3: { flex: 0.7, alignContent: 'center', justifyContent: 'center', marginLeft: 16 },

    profileHeaderView4: { flexDirection: 'row', paddingLeft: 14, paddingRight: 12, paddingTop: 8, paddingBottom: 8, backgroundColor: '#F0F8FF30' },

    profileHeaderView5: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 8 },

    profileHeaderView6: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 8, justifyContent: 'flex-end' },

    profileHeaderImage1: { width: 100, height: 100, borderRadius: 100 },

    profileHeaderImage2: { width: 8, height: 10 },

    profileHeaderImage3: { width: 10, height: 10 },

    profileHeaderImage4: { width: 12 },

    profileHeaderText1: { color: 'white', fontSize: 18, fontWeight: '700' },

    profileHeaderText2: { color: 'white', fontSize: 10, marginTop: 4 },

    profileHeaderText3: { color: 'white', fontSize: 12, fontWeight: '500', marginTop: 4 },

    profileHeaderText4: { color: 'white', fontSize: 10, marginTop: 4, fontFamily: 'ProximaNova-RegularIt' },

    profileHeaderText5: { fontFamily: 'Proxima-Nova-Reg-It' },

    profileHeaderText6: { color: 'white', paddingLeft: 4, fontSize: 10 },

    profileHeaderText7: { color: 'white', fontSize: 12, paddingRight: 6 },

    userLocationListItemView1: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },

    userLocationListItemView2: { flex: 0.2 },

    userLocationListItemView3: { flex: 0.6, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 8 },

    userLocationListItemView4: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },

    userLocationListItemView5: { flex: 0.2, justifyContent: 'center' },

    userLocationListItemView6: { alignItems: 'center' },

    userLocationListItemView7: { alignItems: 'flex-end', paddingRight: 16 },

    userLocationListItemView8: { borderColor: 'white', borderRadius: 15, borderWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4 },

    userLocationListItemImage1: { width: 60, height: 60, borderRadius: 60 },

    userLocationListItemImage2: { width: 8, height: 10 },

    userLocationListItemImage3: { width: 10, height: 10 },

    userLocationListItemImage4: { width: 20, height: 20, marginTop: -20, marginLeft: 40 },

    userLocationListItemText1: { color: 'white', fontSize: 16, fontWeight: '700' },

    userLocationListItemText2: { color: 'white', fontSize: 10, fontWeight: '500', paddingLeft: 4 },

    userLocationListItemText3: { color: 'white', fontSize: 10, fontWeight: '800' },
   
});