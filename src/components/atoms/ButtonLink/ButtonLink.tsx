import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ButtonLink.scss';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {SvgProps} from 'react-native-svg';

/**
 * File: ButtonLink.tsx
 * @created 2021-03-13 22:25:15
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<ButtonLinkProps>>}
 */
const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = (
  props: PropsWithChildren<ButtonLinkProps>,
): ReactElement => {
  const {label, icon, onPress} = props;
  return (
    <TouchableOpacity style={styles.buttonIconStyle} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon ? <SvgIcon component={icon} /> : <View style={styles.none} />}
      </View>

      <View style={styles.labelContainer}>
        <Text
          style={[
            atomicStyles.h5,
            atomicStyles.text,
            styles.textStyle,
            atomicStyles.textGray,
            icon ? styles.none : styles.noIcon,
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export interface ButtonLinkProps {
  //
  label?: string;
  icon?: {
    default: FC<SvgProps>;
  };
  onPress?: () => void;
}

ButtonLink.defaultProps = {
  //
};

ButtonLink.propTypes = {
  //
};

ButtonLink.displayName = nameof(ButtonLink);

export default React.memo(ButtonLink);
