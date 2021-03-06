import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ButtonMain.scss';
import {ActivityIndicator, Pressable, PressableProps, Text} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: ButtonMain.tsx
 * @created 2021-03-13 22:31:55
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ButtonMainProps>>}
 */
const ButtonMain: FC<PropsWithChildren<ButtonMainProps>> = (
  props: PropsWithChildren<ButtonMainProps>,
): ReactElement => {
  const {label, loading, ...restProps} = props;

  return (
    <Pressable style={styles.buttonStyle} {...restProps}>
      {loading && (
        <ActivityIndicator color={'#ffffff'} style={[styles.spinner]} />
      )}
      <Text
        style={[
          atomicStyles.h5,
          atomicStyles.bold,
          styles.textStyle,
          atomicStyles.textWhite,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

export interface ButtonMainProps extends PressableProps {
  //
  label?: string;

  loading?: boolean;
}

ButtonMain.defaultProps = {
  //
};

ButtonMain.propTypes = {
  //
};

ButtonMain.displayName = nameof(ButtonMain);

export default React.memo(ButtonMain);
