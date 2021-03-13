import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LoginHeader.scss';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: LoginHeader.tsx
 * @created 2021-03-13 23:14:07
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginHeaderProps>>}
 */
const LoginHeader: FC<PropsWithChildren<LoginHeaderProps>> = (
  props: PropsWithChildren<LoginHeaderProps>,
): ReactElement => {
  const {title, subtitle} = props;
  return (
    <View style={[styles.headerArea]}>
      <Text
        style={[
          styles.title,
          atomicStyles.h2,
          atomicStyles.bold,
          atomicStyles.mb8px,
          {
            fontSize: 30,
            fontWeight: '100',
          },
        ]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, atomicStyles.h6, atomicStyles.textGray]}>
        {subtitle}
      </Text>
    </View>
  );
};

export interface LoginHeaderProps {
  //
  title?: string;
  subtitle?: string;
}

LoginHeader.defaultProps = {
  //
};

LoginHeader.propTypes = {
  //
};

LoginHeader.displayName = nameof(LoginHeader);

export default React.memo(LoginHeader);
