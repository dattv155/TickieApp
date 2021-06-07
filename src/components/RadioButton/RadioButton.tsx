import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './RadioButton.scss';
import {RadioButtonPayment} from 'src/models/RadioButtonPayment';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from 'src/styles';

/**
 * File: RadioButton.tsx
 * @created 2021-05-09 17:04:08
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<RadioButtonProps>>}
 */
const RadioButton: FC<PropsWithChildren<RadioButtonProps>> = (
  props: PropsWithChildren<RadioButtonProps>,
): ReactElement => {
  const {values, onSetMethodKey} = props;

  const [value, setValue] = React.useState<string>('');

  return (
    <>
      {values.map((item: RadioButtonPayment) => {
        return (
          <View key={item.key} style={styles.container}>
            <SvgIcon component={require('assets/icons/WalletIcon.svg')} />
            <View style={styles.title}>
              <>
                <Text
                  style={[
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {item.title}
                </Text>
                <Text style={[atomicStyles.h7]}>{item.subtitle}</Text>
              </>
            </View>
            <TouchableOpacity
              style={styles.ticker}
              onPress={() => {
                setValue(item.key);
                onSetMethodKey(item.key);
              }}>
              {value === item.key ? (
                <View style={styles.choice}>
                  <SvgIcon component={require('assets/icons/TickIcon.svg')} />
                </View>
              ) : (
                <View style={styles.choice}>
                  <SvgIcon component={require('assets/icons/UntickIcon.svg')} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

export interface RadioButtonProps {
  //
  values?: RadioButtonPayment[];
  onSetMethodKey?: (value: string) => void;
}

RadioButton.defaultProps = {
  //
};

RadioButton.propTypes = {
  //
};

RadioButton.displayName = nameof(RadioButton);

export default React.memo(RadioButton);
