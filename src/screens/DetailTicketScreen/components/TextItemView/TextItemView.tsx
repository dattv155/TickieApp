import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TextItemView.scss';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {numberOfLines} from 'src/helpers/string-helper';

/**
 * File: TextItemView.tsx
 * @created 2021-03-15 23:56:03
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<TextItemViewProps>>}
 */
const TextItemView: FC<PropsWithChildren<TextItemViewProps>> = (
  props: PropsWithChildren<TextItemViewProps>,
): ReactElement => {
  const {label, value} = props;
  return (
    <View style={[styles.textItem]}>
      <Text
        style={[
          atomicStyles.textWhite,
          atomicStyles.h6,
          atomicStyles.bold,
          styles.textStyle,
        ]}>
        {label}
      </Text>
      <Text
        style={[atomicStyles.textWhite, atomicStyles.h6, styles.textWidth]}
        numberOfLines={2}>
        {`${numberOfLines(value, 20)}`}
      </Text>
    </View>
  );
};

export interface TextItemViewProps {
  //
  label?: string;
  value?: string;
}

TextItemView.defaultProps = {
  //
};

TextItemView.propTypes = {
  //
};

TextItemView.displayName = nameof(TextItemView);

export default React.memo(TextItemView);
