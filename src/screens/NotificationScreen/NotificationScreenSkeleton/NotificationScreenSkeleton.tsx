import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './NotificationScreenSkeleton.scss';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';

/**
 * File: NotificationScreenSkeleton.tsx
 * @created 2021-06-07 20:11:01
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<NotificationScreenSkeletonProps>>}
 */
const NotificationScreenSkeleton: FC<
  PropsWithChildren<NotificationScreenSkeletonProps>
> = (
  props: PropsWithChildren<NotificationScreenSkeletonProps>,
): ReactElement => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.text} />
      <View style={styles.item} />
    </SkeletonPlaceholder>
  );
};

export interface NotificationScreenSkeletonProps {
  //
}

NotificationScreenSkeleton.defaultProps = {
  //
};

NotificationScreenSkeleton.propTypes = {
  //
};

NotificationScreenSkeleton.displayName = nameof(NotificationScreenSkeleton);

export default React.memo(NotificationScreenSkeleton);
