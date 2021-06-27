/**
 * @format
 */

import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import './src';
import './i18n';
import {AppRegistry} from 'react-native';
import {name as appName} from 'app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);
