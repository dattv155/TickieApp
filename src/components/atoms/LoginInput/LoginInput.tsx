import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginInput.scss';
import {Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import {atomicStyles} from 'src/styles';
/**
 * File: LoginInput.tsx
 * @created 2021-03-13 22:49:02
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginInputProps>>}
 */
const LoginInput: FC<PropsWithChildren<LoginInputProps>> = (
  props: PropsWithChildren<LoginInputProps>,
): ReactElement => {
  const {style, title, placeholder, keyboardType, ...restProps} = props;
  return (
    <View style={style}>
      <Text
        style={[
          atomicStyles.h5,
          atomicStyles.bold,
          atomicStyles.mb8px,
          styles.textStyle,
        ]}>
        {title}
      </Text>
      <TextInput
        {...restProps}
        style={[atomicStyles.h5, styles.textStyle]}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      <View style={styles.bottomInputStyle} />
    </View>
  );
};

export interface LoginInputProps extends TextInputProps {
  //
  title?: string;
  style?: ViewStyle;
  placeholder?: string;
  keyboardType: any;
  secureTextEntry?: boolean;
}

LoginInput.defaultProps = {
  //
};

LoginInput.propTypes = {
  //
};

LoginInput.displayName = nameof(LoginInput);

export default React.memo(LoginInput);
