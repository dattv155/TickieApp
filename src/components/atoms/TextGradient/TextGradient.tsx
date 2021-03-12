import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './TextGradient.scss';
import {atomicStyles, Colors} from 'src/styles';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import {LinearTextGradient} from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';
import MaskedViewIOS from '@react-native-community/masked-view';

/**
 * File: TextGradient.tsx
 * @created 2021-03-09 17:22:26
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<TextGradientProps>>}
 */
const TextGradient: FC<PropsWithChildren<TextGradientProps>> = (
  props: PropsWithChildren<TextGradientProps>,
): ReactElement => {
  const {children, style, defaultColor} = props;

  return (
    <>
      <LinearTextGradient
        style={[atomicStyles.h4, atomicStyles.bold, style]}
        locations={[0, 0.4]}
        colors={defaultColor}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Text style={[style]}>{children}</Text>
      </LinearTextGradient>
    </>
  );
};

export const TextGradientIOS: FC<PropsWithChildren<TextGradientProps>> = (
  props: PropsWithChildren<TextGradientProps>,
) => {
  const {children, style, defaultColor, ...restProps} = props;

  return (
    <MaskedViewIOS
      maskElement={
        <Text style={[atomicStyles.text, StyleSheet.flatten(style)]}>
          {children}{' '}
        </Text>
      }>
      <LinearGradient
        colors={defaultColor}
        style={[]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text
          style={[
            atomicStyles.text,
            atomicStyles.opacity0,
            StyleSheet.flatten(style),
          ]}
          {...restProps}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedViewIOS>
  );
};

export interface TextGradientProps extends TextProps {
  style?: StyleProp<TextStyle>;

  defaultColor?: string[];
}

TextGradient.defaultProps = {
  defaultColor: [Colors.Blue, Colors.RobinsEggBlue],
};

TextGradientIOS.defaultProps = TextGradient.defaultProps;

TextGradientIOS.displayName = nameof(TextGradientIOS);

TextGradient.propTypes = {
  //
};

TextGradient.displayName = nameof(TextGradient);

export default React.memo(
  Platform.select({
    ios: TextGradientIOS,
    android: TextGradient,
  }),
);
