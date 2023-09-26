import React from 'react';
import SignInScreen from './features/authentication/screens/SignInScreen';
import CreateAccountScreen from './features/authentication/screens/CreateAccountScreen';
import AboutYouScreen from './features/authentication/screens/AboutYouScreen';
import FinishAccountCreationScreen from './features/authentication/screens/FinishAccountCreationScreen';
import AddServicesScreen from './features/authentication/screens/AddServicesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './features/home/screens/HomeScreen';
import SplashScreen from './features/splash/screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  CreateAccount: undefined;
  AboutYou: undefined;
  AddServices: undefined;
  FinishAccountCreation: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
        />
        <Stack.Screen
          name='SignIn'
          component={SignInScreen}
        />
        <Stack.Screen
          name='CreateAccount'
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name='AboutYou'
          component={AboutYouScreen}
        />
        <Stack.Screen
          name='AddServices'
          component={AddServicesScreen}
        />
        <Stack.Screen
          name='FinishAccountCreation'
          component={FinishAccountCreationScreen}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
