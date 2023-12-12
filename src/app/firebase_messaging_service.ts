import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import ReactMoE from 'react-native-moengage'

const getToken = async () => {
  try {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();
    if (token) return token;
  } catch (e) {
      console.log(e);
  }
};

const checkNotificationPermission = async () => {
  let authStatus = await messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

const requestNotificationPermission = async () => {
  let en = await checkNotificationPermission();
  if (!en) {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    en = await checkNotificationPermission();
  }
  if (!en) {
    ReactMoE.navigateToSettingsAndroid();
  } else {
    ReactMoE.setupNotificationChannelsAndroid() 
  }
  console.log('Notification permission :', en);
  return en
}

const getFCMToken = async () => {
  try {
    const hasPermission = await requestNotificationPermission();
    const fcmToken = await getToken();
    return fcmToken;
  } catch (e) {
      console.log(e);
  }
};

const initForegroundMessageHandler = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Remote Message:', remoteMessage);
  });

  return unsubscribe;
}

const initBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

export { getFCMToken, requestNotificationPermission, checkNotificationPermission, initForegroundMessageHandler, initBackgroundMessageHandler}