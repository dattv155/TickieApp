import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './InputProfile.scss';
import {
  KeyboardTypeOptions,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import Dash from 'react-native-dash';

/**
 * File: InputProfile.tsx
 * @created 2021-03-14 21:37:20
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<InputProfileProps>>}
 */
const InputProfile: FC<PropsWithChildren<InputProfileProps>> = (
  props: PropsWithChildren<InputProfileProps>,
): ReactElement => {
  const {
    label,
    placeholder,
    keyboardType,
    secureTextEntry,
    ...restProps
  } = props;

  const [show, setShow] = React.useState(true);

  const handleHideClearButton = React.useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleDeleteInput = React.useCallback(() => {
    handleHideClearButton();
  }, [handleHideClearButton]);

  return (
    <View style={[atomicStyles.mb16px]}>
      <Text style={[atomicStyles.h5, atomicStyles.bold, styles.textStyle]}>
        {label}
      </Text>
      <View style={[atomicStyles.flexRow, atomicStyles.alignItemsCenter]}>
        <TextInput
          keyboardType={keyboardType}
          defaultValue={show ? placeholder : ''}
          secureTextEntry={secureTextEntry}
          style={[
            atomicStyles.h5,
            atomicStyles.bold,
            styles.textStyle,
            styles.textInput,
            atomicStyles.textGray,
          ]}
          {...restProps}
        />
        {show ? (
          <Pressable onPress={handleDeleteInput}>
            <SvgIcon component={require('assets/icons/SmallRemoveIcon.svg')} />
          </Pressable>
        ) : (
          <View />
        )}
      </View>

      <Dash
        dashGap={0}
        dashLength={3}
        dashThickness={1}
        style={styles.dash}
        dashColor={Colors.Gray}
      />
    </View>
  );
};

export interface InputProfileProps extends TextInputProps {
  //
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

InputProfile.defaultProps = {
  //
};

InputProfile.propTypes = {
  //
};

InputProfile.displayName = nameof(InputProfile);

export default React.memo(InputProfile);
