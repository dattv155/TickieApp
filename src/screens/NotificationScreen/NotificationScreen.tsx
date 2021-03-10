import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './NotificationScreen.scss';

/**
 * File: NotificationScreen.tsx
 * @created 2021-03-09 17:09:49
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<NotificationScreenProps>>}
 */
const NotificationScreen: FC<PropsWithChildren<NotificationScreenProps>> = (
  props: PropsWithChildren<NotificationScreenProps>,
): ReactElement => {
  return <>{props.children}</>;
};

export interface NotificationScreenProps {
  //
}

NotificationScreen.defaultProps = {
  //
};

NotificationScreen.propTypes = {
  //
};

NotificationScreen.displayName = nameof(NotificationScreen);

export default NotificationScreen;
