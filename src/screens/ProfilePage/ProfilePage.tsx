import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {Text, View} from 'react-native';
import styles from './ProfilePage.scss';

/**
 * File: ProfilePage.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ProfilePageProps>>}
 */
const ProfilePage: FC<PropsWithChildren<ProfilePageProps>> = (
  props: PropsWithChildren<ProfilePageProps>,
): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
    </View>
  );
};

export interface ProfilePageProps {
  //
}

ProfilePage.defaultProps = {
  //
};

ProfilePage.propTypes = {
  //
};

ProfilePage.displayName = nameof(ProfilePage);

export default ProfilePage;
