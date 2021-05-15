import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';
import {CinemaLayout} from 'src/sample/cinemaLayout';

export interface Combo {
  name: string;
  amount: number;
  detail: {
    type: string;
    quantity: number;
  }[];
}

export interface SelectedCombo {
  name: string;
  count: number;
  amount: number;
}

export function useCombo(
  navigation: StackScreenProps<any>['navigation'],
): [Combo[]] {
  const [comboList, setComboList] = React.useState<Combo[]>([]);
  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('combos')
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const combo = (await handleGetData()) as Combo[];
      setComboList(combo);
    });
  }, [handleGetData, navigation]);

  return [comboList];
}
