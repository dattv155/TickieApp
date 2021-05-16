import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ProfilePageSkeleton.scss';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';

/**
 * File: ProfilePageSkeleton.tsx
 * @created 2021-05-16 01:25:15
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ProfilePageSkeletonProps>>}
 */
const ProfilePageSkeleton: FC<PropsWithChildren<ProfilePageSkeletonProps>> = (
  props: PropsWithChildren<ProfilePageSkeletonProps>,
): ReactElement => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.item}>
        <View style={styles.avatarFrame} />
        <View style={styles.info}>
          <View style={styles.name} />
          <View style={styles.member} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export interface ProfilePageSkeletonProps {
  //
}

ProfilePageSkeleton.defaultProps = {
  //
};

ProfilePageSkeleton.propTypes = {
  //
};

ProfilePageSkeleton.displayName = nameof(ProfilePageSkeleton);

export default ProfilePageSkeleton;
