import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginInput.scss';
import {Text, TextInput, View, ViewStyle} from 'react-native';
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
  const {
    style,
    onChange,
    title,
    placeholder,
    keyboardType,
    ...restProps
  } = props;
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
        style={[atomicStyles.h5, styles.textStyle]}
        placeholder={placeholder}
        onChange={onChange}
        keyboardType={keyboardType}
        {...restProps}
      />
      <View style={styles.bottomInputStyle} />
    </View>
  );
};

export interface LoginInputProps {
  //
  onChange?: () => void;
  title?: string;
  style?: ViewStyle;
  restProps?: JSX.Element;
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
