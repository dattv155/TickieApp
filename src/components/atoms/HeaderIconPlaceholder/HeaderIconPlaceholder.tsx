import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {StyleSheet, View, ViewProps} from 'react-native';
import styles from './HeaderIconPlaceholder.scss';

/**
 * File: HeaderIconPlaceholder.tsx
 * @created 2021-03-08 17:03:42
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<HeaderIconPlaceholderProps>>}
 */
const HeaderIconPlaceholder: FC<
  PropsWithChildren<HeaderIconPlaceholderProps>
> = (props: PropsWithChildren<HeaderIconPlaceholderProps>): ReactElement => {
  const {style, ...restProps} = props;
  return (
    <View
      style={[styles.HeaderIconButton, StyleSheet.flatten(style)]}
      {...restProps}
    />
  );
};

export interface HeaderIconPlaceholderProps extends ViewProps {
  //
}

HeaderIconPlaceholder.defaultProps = {
  //
};

HeaderIconPlaceholder.propTypes = {
  //
};

HeaderIconPlaceholder.displayName = nameof(HeaderIconPlaceholder);

export default React.memo(HeaderIconPlaceholder);
