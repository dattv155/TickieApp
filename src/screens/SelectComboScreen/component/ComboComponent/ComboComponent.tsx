import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ComboComponent.scss';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: ComboComponent.tsx
 * @created 2021-04-12 00:14:49
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ComboComponentProps>>}
 */
const ComboComponent: FC<PropsWithChildren<ComboComponentProps>> = (
  props: PropsWithChildren<ComboComponentProps>,
): ReactElement => {
  const {item} = props;
  const [numCombo, setNumCombo] = React.useState<number>(0);
  const handleIncreaseNumber = React.useCallback(() => {
    setNumCombo(numCombo + 1);
  }, [numCombo]);
  const handleDecreaseNumber = React.useCallback(() => {
    numCombo > 0 ? setNumCombo(numCombo - 1) : setNumCombo(0);
  }, [numCombo]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoArea}>
          <Text style={[atomicStyles.h4, atomicStyles.bold, styles.nameCombo]}>
            {item.name}
          </Text>
          <Text style={[atomicStyles.h5, styles.detailText]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.countArea}>
          <Text style={[atomicStyles.h5, atomicStyles.bold, styles.costNumber]}>
            {item.cost} VND
          </Text>
          <View style={styles.buttonSelectNumber}>
            <TouchableOpacity
              style={styles.buttonCountMinus}
              onPress={handleDecreaseNumber}>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.textMinus]}>
                -
              </Text>
            </TouchableOpacity>
            <View style={styles.comboNumber}>
              <Text
                style={[
                  atomicStyles.h5,
                  atomicStyles.bold,
                  styles.textComboNumber,
                ]}>
                {numCombo}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonCountPlus}
              onPress={handleIncreaseNumber}>
              <Text
                style={[atomicStyles.h4, atomicStyles.bold, styles.textPlus]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export interface ComboComponentProps {
  //
  item: any;
}

ComboComponent.defaultProps = {
  //
};

ComboComponent.propTypes = {
  //
};

ComboComponent.displayName = nameof(ComboComponent);

export default React.memo(ComboComponent);
