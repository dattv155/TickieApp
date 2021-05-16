import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import TabNavigator from '../TabNavigator/TabNavigator';
import ProfilePage from 'src/screens/ProfilePage/ProfilePage';
import NotificationScreen from 'src/screens/NotificationScreen/NotificationScreen';
import AccountInfoScreen from 'src/screens/AccountInfoScreen/AccountInfoScreen';
import ChangePasswordProfileScreen from 'src/screens/ChangePasswordProfileScreen/ChangePasswordProfileScreen';
import MyTicketScreen from 'src/screens/MyTicketScreen/MyTicketScreen';
import {StackCardInterpolatedStyle} from '@react-navigation/stack/src/types';
import DetailTicketScreen from 'src/screens/DetailTicketScreen/DetailTicketScreen';
import MovieInfoScreen from 'src/screens/MovieInfoScreen/MovieInfoScreen';
import GeneralSettingScreen from 'src/screens/GeneralSettingScreen/GeneralSettingScreen';
import HelperScreen from 'src/screens/HelperScreen/HelperScreen';
import UpdateAppScreen from 'src/screens/UpdateAppScreen/UpdateAppScreen';
import InformationScreen from 'src/screens/InformationScreen/InformationScreen';
import BookingScreen from 'src/screens/BookingScreen/BookingScreen';
import ChooseSeatScreen from 'src/screens/ChooseSeatScreen/ChooseSeatScreen';
import SelectComboScreen from 'src/screens/SelectComboScreen/SelectComboScreen';
import PaymentScreen from 'src/screens/PaymentScreen/PaymentScreen';
import SuccessBookingScreen from 'src/screens/SuccessBookingScreen/SuccessBookingScreen';
import CommentScreen from 'src/screens/CommentScreen/CommentScreen';
import ActorDetailScreen from 'src/screens/ActorDetailScreen/ActorDetailScreen';

const {Navigator, Screen} = createStackNavigator();

function forNoAnimation(): StackCardInterpolatedStyle {
  return {};
}

const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <Navigator
      initialRouteName={HomeScreen.displayName}
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        animationEnabled: true,
        // gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen
        name={HomeScreen.displayName}
        component={HomeScreen}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={TabNavigator.displayName}
        component={TabNavigator}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={ProfilePage.displayName}
        component={ProfilePage}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={NotificationScreen.displayName}
        component={NotificationScreen}
        initialParams={{}}
        options={{cardStyleInterpolator: forNoAnimation}}
      />
      <Screen
        name={AccountInfoScreen.displayName}
        component={AccountInfoScreen}
        initialParams={{}}
      />
      <Screen
        name={ChangePasswordProfileScreen.displayName}
        component={ChangePasswordProfileScreen}
        initialParams={{}}
      />
      <Screen
        name={MyTicketScreen.displayName}
        component={MyTicketScreen}
        initialParams={{}}
      />
      <Screen
        name={DetailTicketScreen.displayName}
        component={DetailTicketScreen}
        initialParams={{}}
      />
      <Screen
        name={MovieInfoScreen.displayName}
        component={MovieInfoScreen}
        initialParams={{}}
      />
      <Screen
        name={GeneralSettingScreen.displayName}
        component={GeneralSettingScreen}
        initialParams={{}}
      />
      <Screen
        name={HelperScreen.displayName}
        component={HelperScreen}
        initialParams={{}}
      />
      <Screen
        name={UpdateAppScreen.displayName}
        component={UpdateAppScreen}
        initialParams={{}}
      />
      <Screen
        name={InformationScreen.displayName}
        component={InformationScreen}
        initialParams={{}}
      />
      <Screen
        name={BookingScreen.displayName}
        component={BookingScreen}
        initialParams={{}}
      />
      <Screen
        name={ChooseSeatScreen.displayName}
        component={ChooseSeatScreen}
        initialParams={{}}
      />
      <Screen
        name={SelectComboScreen.displayName}
        component={SelectComboScreen}
        initialParams={{}}
      />
      <Screen
        name={PaymentScreen.displayName}
        component={PaymentScreen}
        initialParams={{}}
      />
      <Screen
        name={SuccessBookingScreen.displayName}
        component={SuccessBookingScreen}
        initialParams={{}}
      />
      <Screen
        name={CommentScreen.displayName}
        component={CommentScreen}
        initialParams={{}}
      />
      <Screen
        name={ActorDetailScreen.displayName}
        component={ActorDetailScreen}
        initialParams={{}}
      />
    </Navigator>
  );
};

export interface RootNavigatorProps {
  //
}

RootNavigator.defaultProps = {
  //
};

RootNavigator.propTypes = {
  //
};

RootNavigator.displayName = nameof(RootNavigator);

export default React.memo(RootNavigator);
