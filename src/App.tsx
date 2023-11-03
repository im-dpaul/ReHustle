import React from 'react';
import SignInScreen from './features/authentication/screens/SignInScreen';
import CreateAccountScreen from './features/authentication/screens/CreateAccountScreen';
import AboutYouScreen from './features/authentication/screens/AboutYouScreen';
import FinishAccountCreationScreen from './features/authentication/screens/FinishAccountCreationScreen';
import AddServicesScreen from './features/authentication/screens/AddServicesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from './features/home/screens/ServicesScreen';
import SplashScreen from './features/splash/screens/SplashScreen';
import GetYourInfoScreen from './features/authentication/screens/GetYourInfoScreen';
import CreateServiceScreen from './features/services/screens/CreateServiceScreen';
import PayoutsScreen from './features/home/screens/PayoutsScreen';
import PreviewScreen from './features/home/screens/PreviewScreen';
import InsightsScreen from './features/home/screens/InsightsScreen';
import ProfileScreen from './features/home/screens/ProfileScreen';
import SettingsScreen from './features/home/screens/SettingsScreen';
import ForgetPasswordScreen from './features/authentication/screens/ForgetPasswordScreen';
import { ServiceModel } from './data';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: any;
  ForgetPassword: any;
  CreateAccount: undefined;
  GetYourInfo: undefined;
  AboutYou: undefined;
  AddServices: any;
  FinishAccountCreation: undefined;
  Services: any;
  CreateService: { serviceType: string, serviceData?: ServiceModel, stack?: string };
  Payouts: undefined;
  Preview: undefined;
  Insights: undefined;
  Profile: undefined;
  Settings: undefined;
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
          name='ForgetPassword'
          component={ForgetPasswordScreen}
        />
        <Stack.Screen
          name='CreateAccount'
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name='GetYourInfo'
          component={GetYourInfoScreen}
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
          name='Preview'
          component={PreviewScreen}
        />
        <Stack.Screen
          name='Insights'
          component={InsightsScreen}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
        />
        <Stack.Screen
          name='Services'
          component={ServicesScreen}
        />
        <Stack.Screen
          name='Payouts'
          component={PayoutsScreen}
        />
        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
        />
        <Stack.Screen
          name='CreateService'
          component={CreateServiceScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
