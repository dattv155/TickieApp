import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ButtonSelectFilmTime.scss';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {atomicStyles} from 'src/styles';

/**
 * File: ButtonSelectFilmTime.tsx
 * @created 2021-04-27 23:22:45
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ButtonSelectFilmTimeProps>>}
 */
const ButtonSelectFilmTime: FC<PropsWithChildren<ButtonSelectFilmTimeProps>> = (
  props: PropsWithChildren<ButtonSelectFilmTimeProps>,
): ReactElement => {
  const {data} = props;

  const [selectedTypeID, setSelectedTypeID] = React.useState<number>(null);

  const handleSelection = React.useCallback(
    (id) => {
      selectedTypeID !== id && setSelectedTypeID(id);
    },
    [selectedTypeID],
  );

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      let selected = false;
      if (selectedTypeID === index) {
        selected = true;
      }
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleSelection(index);
          }}
          style={styles.press}>
          <View
            style={[styles.buttonContainer, selected && styles.pickedButton]}>
            <Text
              style={[
                atomicStyles.bold,
                atomicStyles.h4,
                selected ? styles.pickedText : styles.unPickedText,
              ]}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [handleSelection, selectedTypeID],
  );

  return (
    <>
      <View style={styles.containerView}>
        <Text style={[atomicStyles.bold, atomicStyles.h1, styles.textStyle]}>
          {data.cinemaName}
        </Text>
        <View>
          <FlatList
            key={'#'}
            data={data.showTime}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => '#' + item}
            contentContainerStyle={styles.listTime}
            numColumns={3}
          />
        </View>
      </View>
      {/*<View style={[styles.buttonContainer, selected && styles.pickedButton]}>*/}
      {/*  <Text*/}
      {/*    style={[*/}
      {/*      atomicStyles.bold,*/}
      {/*      atomicStyles.h4,*/}
      {/*      selected ? styles.pickedText : styles.unPickedText,*/}
      {/*    ]}>*/}
      {/*    {item}*/}
      {/*  </Text>*/}
      {/*</View>*/}
    </>
  );
};

export interface ButtonSelectFilmTimeProps {
  //
  data?: any;
}

ButtonSelectFilmTime.defaultProps = {
  //
};

ButtonSelectFilmTime.propTypes = {
  //
};

ButtonSelectFilmTime.displayName = nameof(ButtonSelectFilmTime);

export default React.memo(ButtonSelectFilmTime);
