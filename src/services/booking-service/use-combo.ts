import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {ComboSet} from 'src/models/ComboSet';
import {ComboInfo} from 'src/models/ComboInfo';
import {useNavigation} from '@react-navigation/native';

export function useCombo(): [
  ComboInfo[],
  ComboSet[],
  (comboSelected: ComboSet) => void,
  number,
] {
  const navigation = useNavigation();

  const [comboList, setComboList] = React.useState<ComboInfo[]>([]);

  const [listSelectCombo, setListSelectCombo] = React.useState<ComboSet[]>([]);

  const [comboCost, setComboCost] = React.useState<number>(0);

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('combos')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  const handleSelectCombo = React.useCallback(
    (comboSelected: ComboSet) => {
      const list = listSelectCombo.findIndex(
        (selectedCombo) => selectedCombo.comboID === comboSelected.comboID,
      );

      if (list > -1) {
        if (comboSelected.count === 0) {
          setListSelectCombo((list) =>
            list.filter(
              (item: ComboSet) => item.comboID !== comboSelected.comboID,
            ),
          );
        } else {
          setListSelectCombo((prevs) =>
            prevs.map((prev) => {
              return prev.comboID === comboSelected.comboID
                ? {...prev, count: comboSelected.count}
                : prev;
            }),
          );
        }
      } else {
        setListSelectCombo((prev) => [...prev, comboSelected]);
      }
    },
    [listSelectCombo],
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const combo = (await handleGetData()) as ComboInfo[];
      setComboList(combo);
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [handleGetData, navigation]);

  React.useEffect(() => {
    let cost = 0;
    listSelectCombo.map((select) => {
      cost = cost + select.count * select.amount;
    });
    setComboCost(cost);
  }, [listSelectCombo]);

  return [comboList, listSelectCombo, handleSelectCombo, comboCost];
}
