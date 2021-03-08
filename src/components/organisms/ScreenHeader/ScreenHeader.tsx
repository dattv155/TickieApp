import React, {FC, PropsWithChildren, ReactElement, ReactNode} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ScreenHeader.scss';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

/**
 * File: ScreenHeader.tsx
 * @created 2021-03-08 17:15:29
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ScreenHeaderProps>>}
 */
const ScreenHeader: FC<PropsWithChildren<ScreenHeaderProps>> = (
  props: PropsWithChildren<ScreenHeaderProps>,
): ReactElement => {
  const {children, style} = props;

  const childs: ReactNode[] = React.useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  return (
    <View style={[styles.header, StyleSheet.flatten(style)]}>
      <View style={[styles.headerContent]}>{childs}</View>
    </View>
  );
};

export interface ScreenHeaderProps {
  //
  style?: StyleProp<ViewStyle>;
}

ScreenHeader.defaultProps = {
  //
};

ScreenHeader.propTypes = {
  //
};

ScreenHeader.displayName = nameof(ScreenHeader);

export default React.memo(ScreenHeader);
