import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ComboComponent.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import {Combo, SelectedCombo} from 'src/services/booking-service/use-combo';

/**
 * File: ComboComponent.tsx
 * @created 2021-04-12 00:14:49
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ComboComponentProps>>}
 */
const ComboComponent: FC<PropsWithChildren<ComboComponentProps>> = (
  props: PropsWithChildren<ComboComponentProps>,
): ReactElement => {
  const {combo, handleCombo, listCombo} = props;

  const [numCombo, setNumCombo] = React.useState<number>(0);

  const countCombo = React.useRef<number>(0);

  const handleDeleteDuplicate = React.useCallback(() => {
    let index = listCombo.findIndex(function (selectedCombo) {
      return selectedCombo.name === combo.name;
    });
    if (index > -1) {
      listCombo.splice(index, 1);
    }
  }, [combo.name, listCombo]);

  const handleIncreaseNumber = React.useCallback(() => {
    // setNumCombo(numCombo + 1);
    countCombo.current += 1;
    setNumCombo(countCombo.current);
    handleCombo({
      comboID: combo.comboID,
      name: combo.name,
      count: countCombo.current,
      amount: combo.amount,
    });
    // handleDeleteDuplicate();
    // listCombo.push({
    //   name: combo.name,
    //   count: countCombo.current,
    //   amount: combo.amount,
    // });
    // handleCombo([]);
  }, [combo.amount, combo.comboID, combo.name, handleCombo]);

  const handleDecreaseNumber = React.useCallback(() => {
    // numCombo > 0 &&
    //   ((countCombo.current -= 1),
    //   handleCombo([]),
    //   setNumCombo(countCombo.current),
    //   handleDeleteDuplicate());
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

  const handleDetail = React.useCallback(
    (details: {type: string; quantity: number}[]): string => {
      let detailText = '';
      details.map((detail) => {
        detailText += detail.type + '(x' + detail.quantity + '); ';
      });
      return detailText;
    },
    [],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoArea}>
          <Text style={[atomicStyles.h4, atomicStyles.bold, styles.nameCombo]}>
            {combo.name}
          </Text>
          <Text style={[atomicStyles.h5, styles.detailText]}>
            {handleDetail(combo.detail)}
          </Text>
        </View>
        <View style={styles.countArea}>
          <Text style={[atomicStyles.h5, atomicStyles.bold, styles.costNumber]}>
            {combo.amount} VND
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
  combo: Combo;

  handleCombo?: (numCombo: SelectedCombo) => void;

  listCombo?: SelectedCombo[];
}

ComboComponent.defaultProps = {
  //
};

ComboComponent.propTypes = {
  //
};

ComboComponent.displayName = nameof(ComboComponent);

export default React.memo(ComboComponent);
