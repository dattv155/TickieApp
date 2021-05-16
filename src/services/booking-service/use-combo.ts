import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';

export interface Combo {
  comboID: number;
  name: string;
  amount: number;
  detail: {
    type: string;
    quantity: number;
  }[];
}

export interface SelectedCombo {
  comboID: number;
  name: string;
  count: number;
  amount: number;
}

export function useCombo(
  navigation: StackScreenProps<any>['navigation'],
): [
  Combo[],
  (listComboSelected: SelectedCombo[], currentCombo: SelectedCombo) => number,
] {
  const [comboList, setComboList] = React.useState<Combo[]>([]);
  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('combos')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  const handleDeleteDuplicate = React.useCallback(
    (
      listComboSelected: SelectedCombo[],
      currentCombo: SelectedCombo,
    ): number => {
      let index = listComboSelected.findIndex(function (selectedCombo) {
        return selectedCombo.comboID === currentCombo.comboID;
      });
      return index;
      // if (index > -1) {
      //   let list = listComboSelected.splice(index, 1);
      //   return [...list];
      // }
      // return [...listComboSelected];
    },
    [],
  );

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const combo = (await handleGetData()) as Combo[];
      setComboList(combo);
    });
  }, [handleGetData, navigation]);

  return [comboList, handleDeleteDuplicate];
}
