/** @format */
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import React from 'react';

import App from './app/App';
import configureStore from './app/stores/ConfigureStore';
import { name as appName } from './app.json';

const store = configureStore();
const AppContainer = () => (<Provider store={store}><App /></Provider>);

AppRegistry.registerComponent(appName, () => AppContainer);
