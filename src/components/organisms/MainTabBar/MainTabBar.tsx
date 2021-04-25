import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './MainTabBar.scss';
import {SvgComponent} from 'react-native-svg-types';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import {atomicStyles} from 'src/styles';
import TabBarIcon from 'src/components/organisms/MainTabBar/TabBarIcon/TabBarIcon';
import ProfilePage from 'src/screens/ProfilePage/ProfilePage';
import NotificationScreen from 'src/screens/NotificationScreen/NotificationScreen';
import { Text } from 'react-native-svg';
import { result } from 'lodash';

/**
 * File: MainTabBar.tsx
 * @created 2021-03-10 09:16:47
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<MainTabBarProps>>}
 */
const MainTabBar: FC<PropsWithChildren<MainTabBarProps>> = (
  props: PropsWithChildren<MainTabBarProps>,
): ReactElement => {
  const {navigation, route} = props;
  const [translate] = useTranslation();

 
  const tabs: {
    routeName: string;
    icon?: {
      default: SvgComponent;
    };
    activeIcon?: {
      default: SvgComponent;
    };
    iconName?: string;
    onPress(): void;
  }[] = React.useMemo(() => {
    return [
      {
        routeName: HomeScreen.displayName,
        icon: require('/assets/TabBarIcon/Home.svg'),
        activeIcon: require('/assets/TabBarIcon/HomeW.svg'),
        onPress: () => {
          navigation.navigate(HomeScreen.displayName);
        },
        iconName: translate('tab.home'),
      },
      {
        routeName: NotificationScreen.displayName,
        icon: require('assets/TabBarIcon/Notification.svg'),
        activeIcon: require('assets/TabBarIcon/NotificationW.svg'),
        onPress: () => {
          navigation.navigate(NotificationScreen.displayName);
        },
        iconName: translate('tab.notification'),
      },
      {
        routeName: ProfilePage.displayName,
        icon: require('assets/TabBarIcon/Profile.svg'),
        activeIcon: require('assets/TabBarIcon/ProfileW.svg'),
        onPress: ()=> {
          navigation.navigate(ProfilePage.displayName);
        },
        iconName: translate('tab.profile'),
      },
    ];
  }, [navigation, translate]);

  return (
    <SafeAreaView style={[styles.bottomTabContainer]}>
      <View
        style={[
          styles.bottomTabs,
          atomicStyles.flexRow,
          atomicStyles.justifyContentAround,
          atomicStyles.alignItemsCenter,
          {
            borderTopWidth: 0,
            elevation: 10,
          },
        ]}>      
        {tabs.map((tab, index: number) => (
          <TabBarIcon
            key={index}
            onPress={() => tab.onPress(index)}
            icon={tab.icon}
            iconName={tab.iconName}
            activeIcon={tab.activeIcon}
            isActive={route?.name === tab.routeName}
            hand
          />
        ))}

      </View>
      {props.children}
    </SafeAreaView>
  );
};

export interface MainTabBarProps extends StackScreenProps<any> {
  //
}

MainTabBar.defaultProps = {
  //
};

MainTabBar.propTypes = {
  //
};

MainTabBar.displayName = nameof(MainTabBar);

export default React.memo(MainTabBar);
