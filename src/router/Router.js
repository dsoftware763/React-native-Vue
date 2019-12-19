import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
//import screens
import LoginScreen from '../components/authentication/LoginScreen';
import SignupScreen from '../components/authentication/SignupScreen';
import AddProfileScreen from '../components/authentication/AddProfileScreen';
import SplashScreen from '../components/others/SplashScreen';
import UserLocationsScreen from '../components/others/UserLocationsScreen';
import UserProfileScreen from '../components/others/UserProfileScreen';
import MyProfileScreen from '../components/others/MyProfileScreen';
import HomeScreen from '../components/others/HomeScreen';
import RecentActivitiesScreen from '../components/others/RecentActivitiesScreen';
import FilterScreen from '../components/others/FilterScreen';
import MessageScreen from '../components/others/MessageScreen';

export const rootNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    SignupScreen: {
        screen: SignupScreen
    },
    AddProfileScreen: {
        screen: AddProfileScreen
    },
    SplashScreen: {
        screen: SplashScreen
    },
    HomeScreen: {
        screen: HomeScreen
    }
},
    {
        initialRouteName: 'SplashScreen',
        headerMode: 'none',
    }
);

export const HomeStack = createStackNavigator({
    UserLocationsScreen: {
        screen: UserLocationsScreen
    },
    UserProfileScreen: {
        screen: UserProfileScreen
    },
    MyProfileScreen: {
        screen: MyProfileScreen
    },
    RecentActivitiesScreen: {
        screen: RecentActivitiesScreen
    },
    FilterScreen: {
        screen: FilterScreen
    },
    MessageScreen: {
        screen: MessageScreen
    },
}, {
        headerMode: 'none',
        initialRouteName: 'RecentActivitiesScreen'
    }
);