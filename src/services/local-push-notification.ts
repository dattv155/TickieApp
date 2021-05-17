// @ts-ignore
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification: string) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export const LocalNotification = (movie: string) => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    autoCancel: true,
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl:
      'https://drive.google.com/uc?export=view&id=1if-L7JO9I1guUmeKRZd-BQ4O1XybiV4c', // (optional) default: undefined
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    bigLargeIconUrl:
      'https://drive.google.com/uc?export=view&id=1if-L7JO9I1guUmeKRZd-BQ4O1XybiV4c', // (optional) default: undefined
    bigText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum molestie ipsum eu lacinia. Quisque egestas, sem at ornare gravida, velit nibh laoreet leo, eu tincidunt ex metus vel lectus. Sed eget nibh viverra, imperdiet erat nec, molestie arcu. Curabitur in odio a urna ornare efficitur.',
    subText: 'Thanh toán và đặt phim thành công',
    title: 'Thanh toán thành công phim ' + movie,
    message: 'Kéo để xem thêm',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    // actions: '["Yes", "No"]',
  });
};
