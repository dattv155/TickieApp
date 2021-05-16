import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AccountInfoSkeleton.scss';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';

/**
 * File: AccountInfoSkeleton.tsx
 * @created 2021-05-16 01:58:24
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<AccountInfoSkeletonProps>>}
 */
const AccountInfoSkeleton: FC<PropsWithChildren<AccountInfoSkeletonProps>> = (
  props: PropsWithChildren<AccountInfoSkeletonProps>,
): ReactElement => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container} />
    </SkeletonPlaceholder>
  );
};

export interface AccountInfoSkeletonProps {
  //
}

AccountInfoSkeleton.defaultProps = {
  //
};

AccountInfoSkeleton.propTypes = {
  //
};

AccountInfoSkeleton.displayName = nameof(AccountInfoSkeleton);

export default AccountInfoSkeleton;
