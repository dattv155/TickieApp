import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';

import {atomicStyles} from 'src/styles';
import nameof from 'ts-nameof.macro';

/**
 * File: HeaderIconButton.tsx
 * @created 2021-03-08 17:03:42
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<HeaderIconProps>>}
 */
const HeaderIconButton: FC<PropsWithChildren<HeaderIconProps>> = (
  props: PropsWithChildren<HeaderIconProps>,
): ReactElement => {
  const {style, children, ...restProps} = props;
  return (
    <Pressable
      style={[atomicStyles.p8px, StyleSheet.flatten(style)]}
      {...restProps}>
      {children}
    </Pressable>
  );
};

export interface HeaderIconProps extends PressableProps {
  //
}

HeaderIconButton.defaultProps = {
  //
};

HeaderIconButton.propTypes = {
  //
};

HeaderIconButton.displayName = nameof(HeaderIconButton);

export default React.memo(HeaderIconButton);
