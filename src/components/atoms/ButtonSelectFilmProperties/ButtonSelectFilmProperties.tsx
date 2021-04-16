import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ButtonSelectFilmProperties.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: ButtonSelectFilmProperties.tsx
 * @created 2021-04-06 08:24:51
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ButtonSelectFilmPropertiesProps>>}
 */
const ButtonSelectFilmProperties: FC<
  PropsWithChildren<ButtonSelectFilmPropertiesProps>
> = (
  props: PropsWithChildren<ButtonSelectFilmPropertiesProps>,
): ReactElement => {
  const {item} = props;

  const [picked, setPicked] = React.useState(false);

  const handlePicker = React.useCallback(() => {
    setPicked(!picked);
  }, [picked]);
  return (
    <>
      <TouchableOpacity
        style={[styles.buttonContainer, picked && styles.pickedButton]}
        onPress={handlePicker}>
        <Text
          style={[
            atomicStyles.bold,
            atomicStyles.h4,
            picked ? styles.pickedText : styles.unPickedText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export interface ButtonSelectFilmPropertiesProps {
  //
  item?: any;
}

ButtonSelectFilmProperties.defaultProps = {
  //
};

ButtonSelectFilmProperties.propTypes = {
  //
};

ButtonSelectFilmProperties.displayName = nameof(ButtonSelectFilmProperties);

export default React.memo(ButtonSelectFilmProperties);
