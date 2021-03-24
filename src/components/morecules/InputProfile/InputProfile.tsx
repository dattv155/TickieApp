import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './InputProfile.scss';
import {TextInput, View, Text, Pressable} from 'react-native';
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
  const {label, placeholder, keyboardType, secureTextEntry} = props;

  const [input, setInput] = React.useState(placeholder);

  const [show, setShow] = React.useState(true);

  const handleHideClearButton = React.useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleShowClearButton = React.useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleChangeText = React.useCallback(
    (text) => {
      setInput(text);
      handleShowClearButton();
    },
    [handleShowClearButton, setInput],
  );

  const handleDeleteInput = React.useCallback(() => {
    setInput('');
    handleHideClearButton();
  }, [handleHideClearButton, setInput]);

  return (
    <View style={[atomicStyles.mb16px]}>
      <Text style={[atomicStyles.h5, atomicStyles.bold, styles.textStyle]}>
        {label}
      </Text>
      <View style={[atomicStyles.flexRow, atomicStyles.alignItemsCenter]}>
        <TextInput
          keyboardType={keyboardType}
          defaultValue={input}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry}
          style={[
            atomicStyles.h5,
            styles.textStyle,
            styles.textInput,
            atomicStyles.textGray,
          ]}
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

export interface InputProfileProps {
  //
  label?: string;
  placeholder?: string;
  keyboardType?: string;
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
