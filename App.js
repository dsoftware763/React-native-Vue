/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { createAppContainer } from 'react-navigation';
import reducers from './src/reducers';
import { rootNavigator, HomeStack } from './src/router/Router';

import { View, ImageBackground } from 'react-native';
import Drawer from 'react-native-drawer';
import Header from './src/common/components/Header';
import Footer from './src/common/components/Footer';
import DrawerScreen from './src/components/others/DrawerScreen';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

const AuthContainer = createAppContainer(rootNavigator);

const HomeContainer = createAppContainer(HomeStack);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      container: 'auth'
    }
    store.subscribe(() => this.setState({ container: store.getState().container.container }))
  }

  toggleDrawer = () => {
    if (this.state.toggle) {
      this._drawer.close();
    } else {
      this._drawer.open();
    }
    this.setState({
      toggle: !(this.state.toggle)
    })
  }

  renderContainer() {
    if (this.state.container === 'auth') {
      return <AuthContainer />;
    } else {
      return (
        <ImageBackground source={require('./src/assets/images/background1.png')}
          style={{
            width: '100%',
            height: '100%'
          }}>

          <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-start', flex: 0.1 }}>
              <Header openDrawer={this.toggleDrawer} onProfilePress={this._toggleSubview} />
            </View>
            <View style={{ flex: 0.83, marginTop: 8 }} >
              <Drawer
                ref={(ref) => this._drawer = ref}
                content={<DrawerScreen navigationProps={this.props.navigation} toggleDrawer={this.toggleDrawer} />}
              >
                <HomeContainer />
              </Drawer>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 0.07, marginTop: 12 }}>
              <Footer navigationProps={this.props.navigation} />
            </View>
          </View>

        </ImageBackground>

      );
    }
  }

  render() {

    return (
      <Provider store={store}>
        {this.renderContainer()}
      </Provider>
    );
  }
};

