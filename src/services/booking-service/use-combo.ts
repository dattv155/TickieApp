import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';
import {ComboSet} from 'src/models/ComboSet';
import {ComboInfo} from 'src/models/ComboInfo';

export function useCombo(
  navigation: StackScreenProps<any>['navigation'],
): [
  ComboInfo[],
  (listComboSelected: ComboSet[], currentCombo: ComboSet) => number,
] {
  const [comboList, setComboList] = React.useState<ComboInfo[]>([]);
  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('combos')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  const handleDeleteDuplicate = React.useCallback(
    (listComboSelected: ComboSet[], currentCombo: ComboSet): number => {
      return listComboSelected.findIndex(function (selectedCombo) {
        return selectedCombo.comboID === currentCombo.comboID;
      });
      // if (index > -1) {
      //   let list = listComboSelected.splice(index, 1);
      //   return [...list];
      // }
      // return [...listComboSelected];
    },
    [],
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

  return [comboList, handleDeleteDuplicate];
}
