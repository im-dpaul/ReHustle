/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux/es/exports';
import { store } from './src/app/store';
import { initBackgroundMessageHandler } from './src/app/firebase_messaging_service';

initBackgroundMessageHandler();

const AppRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => AppRedux);
