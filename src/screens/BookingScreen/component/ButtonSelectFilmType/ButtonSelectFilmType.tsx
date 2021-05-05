import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ButtonSelectFilmType.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: ButtonSelectFilmType.tsx
 * @created 2021-04-06 08:24:51
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ButtonSelectFilmTypeProps>>}
 */
const ButtonSelectFilmType: FC<PropsWithChildren<ButtonSelectFilmTypeProps>> = (
  props: PropsWithChildren<ButtonSelectFilmTypeProps>,
): ReactElement => {
  const {item, selected} = props;

  const [picked, setPicked] = React.useState(false);

  const handlePicker = React.useCallback(() => {
    selected ? setPicked(true) : setPicked(false);
  }, [selected]);
  return (
    <>
      <View style={[styles.buttonContainer, selected && styles.pickedButton]}>
        <Text
          style={[
            atomicStyles.bold,
            atomicStyles.h4,
            selected ? styles.pickedText : styles.unPickedText,
          ]}>
          {item}
        </Text>
      </View>
    </>
  );
};

export interface ButtonSelectFilmTypeProps {
  //
  item?: any;

  selected?: boolean;
}

ButtonSelectFilmType.defaultProps = {
  //
};

ButtonSelectFilmType.propTypes = {
  //
};

ButtonSelectFilmType.displayName = nameof(ButtonSelectFilmType);

export default React.memo(ButtonSelectFilmType);
