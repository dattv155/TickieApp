// @ts-ignore
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification: string) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = () => {
  PushNotification.localNotification({
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
    title: 'Thanh toán thành công',
    message: 'Kéo để xem thêm',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    // actions: '["Yes", "No"]',
  });
};
