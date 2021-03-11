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
import NotificationScreen from 'src/screens/NotificationScreen/NotificationScreen';

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

  // const [translate] = useTranslation();

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
        icon: require('/assets/MainTabBar/Home.svg'),
        activeIcon: require('/assets/MainTabBar/HomeW.svg'),
        onPress: () => {
          navigation.navigate(HomeScreen.displayName);
        },
        // iconName: translate('tab.home'),
        iconName: 'Home',
      },
      {
        routeName: NotificationScreen.displayName,
        icon: require('assets/MainTabBar/Notification.svg'),
        activeIcon: require('assets/MainTabBar/NotificationW.svg'),
        onPress: () => {
          navigation.navigate(NotificationScreen.displayName);
        },
        // iconName: translate('tab.notification'),
        iconName: 'Notification',
      },
      // {
      //   routeName: HomeScreen.displayName,
      //   icon: require('assets/MainTabBar/Profile.svg'),
      //   activeIcon: require('assets/MainTabBar/ProfileW.svg'),
      //   onPress: () => {
      //     navigation.navigate(HomeScreen.displayName);
      //   },
      //   iconName: translate('tab.profile'),
      // },
    ];
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.bottomTabContainer]}>
      <View
        style={[
          styles.bottomTabs,
          atomicStyles.flexRow,
          atomicStyles.justifyContentAround,
          atomicStyles.alignItemsCenter,
        ]}>
        {tabs.map((tab, index: number) => (
          <TabBarIcon
            key={index}
            onPress={tab.onPress}
            icon={tab.icon}
            iconName={tab.iconName}
            activeIcon={tab.activeIcon}
            isActive={route?.name === tab.routeName}
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
