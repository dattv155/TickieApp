import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './GradientTitle.scss';
import {TextProps, StyleSheet} from 'react-native';
import {atomicStyles} from 'src/styles';
import TextGradient from '../TextGradient/TextGradient';

/**
 * File: GradientTitle.tsx
 * @created 2021-05-25 03:09:26
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<GradientTitleProps>>}
 */
const GradientTitle: FC<PropsWithChildren<GradientTitleProps>> = (
  props: PropsWithChildren<GradientTitleProps>,
): ReactElement => {
  const {children, style, ...restProps} = props;

  return (
    <TextGradient
      style={[atomicStyles.bold, styles.text, StyleSheet.flatten(style)]}
      {...restProps}>
      {children}
    </TextGradient>
  );
};

export interface GradientTitleProps extends TextProps {
  //
}

GradientTitle.defaultProps = {
  //
};

GradientTitle.propTypes = {
  //
};

GradientTitle.displayName = nameof(GradientTitle);

export default React.memo(GradientTitle);
