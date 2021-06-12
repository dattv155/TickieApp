import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ComboComponent.scss';
import {Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {fomatNumberToMoney} from 'src/helpers/fomat-number-to-money';
import {handleDetailCombo} from 'src/helpers/string-helper';
import {ComboSet} from 'src/models/ComboSet';
import {ComboInfo} from 'src/models/ComboInfo';

/**
 * File: ComboComponent.tsx
 * @created 2021-04-12 00:14:49
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ComboComponentProps>>}
 */
const ComboComponent: FC<PropsWithChildren<ComboComponentProps>> = (
  props: PropsWithChildren<ComboComponentProps>,
): ReactElement => {
  const {combo, handleCombo} = props;

  const [numCombo, setNumCombo] = React.useState<number>(0);

  const countCombo = React.useRef<number>(0);

  const handleIncreaseNumber = React.useCallback(() => {
    countCombo.current += 1;
    setNumCombo(countCombo.current);
    handleCombo({
      comboID: combo.comboID,
      name: combo.name,
      count: countCombo.current,
      amount: combo.amount,
    });
  }, [combo.amount, combo.comboID, combo.name, handleCombo]);

  const handleDecreaseNumber = React.useCallback(() => {
    numCombo > 0 &&
      ((countCombo.current -= 1),
      setNumCombo(countCombo.current),
      handleCombo({
        comboID: combo.comboID,
        name: combo.name,
        count: countCombo.current,
        amount: combo.amount,
      }));
  }, [combo.amount, combo.comboID, combo.name, handleCombo, numCombo]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoArea}>
          <Text
            style={[
              atomicStyles.h4,
              atomicStyles.textBlue,
              atomicStyles.bold,
              styles.textStyle,
            ]}>
            {combo.name}
          </Text>
          <Text style={[atomicStyles.h6, styles.detailText]}>
            {handleDetailCombo(combo)}
          </Text>
        </View>
        <View style={styles.countArea}>
          <Text style={[atomicStyles.h5, atomicStyles.bold, styles.textStyle]}>
            {fomatNumberToMoney(combo.amount, 0, 0)} VND
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
  combo: ComboInfo;

  handleCombo?: (numCombo: ComboSet) => void;
}

ComboComponent.defaultProps = {
  //
};

ComboComponent.propTypes = {
  //
};

ComboComponent.displayName = nameof(ComboComponent);

export default React.memo(ComboComponent);
