import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './LoginInputPassword.scss';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {atomicStyles} from 'src/styles';
import styles from 'src/components/atoms/LoginInput/LoginInput.scss';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: LoginInputPassword.tsx
 * @created 2021-06-07 15:37:28
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginInputPasswordProps>>}
 */
const LoginInputPassword: FC<PropsWithChildren<LoginInputPasswordProps>> = (
  props: PropsWithChildren<LoginInputPasswordProps>,
): ReactElement => {
  const {style, title, placeholder, ...restProps} = props;

  const [isHide, setHide] = React.useState<boolean>(true);

  const handleToggleHide = React.useCallback(() => {
    setHide(!isHide);
  }, [isHide]);

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
      <View style={styles.textInput}>
        <TextInput
          style={[atomicStyles.h5, styles.textStyle]}
          placeholder={placeholder}
          keyboardType={'default'}
          secureTextEntry={isHide}
          {...restProps}
        />
        <Pressable onPress={handleToggleHide}>
          {isHide ? (
            <SvgIcon
              style={styles.icon}
              component={require('assets/icons/Lock.svg')}
            />
          ) : (
            <SvgIcon
              style={styles.icon}
              component={require('assets/icons/Unlock.svg')}
            />
          )}
        </Pressable>
      </View>

      <View style={styles.bottomInputStyle} />
    </View>
  );
};

export interface LoginInputPasswordProps extends TextInputProps {
  //
  title?: string;
  style?: ViewStyle;
  placeholder?: string;
}

LoginInputPassword.defaultProps = {
  //
};

LoginInputPassword.propTypes = {
  //
};

LoginInputPassword.displayName = nameof(LoginInputPassword);

export default React.memo(LoginInputPassword);
