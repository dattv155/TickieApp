import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AvailableFilm.scss';
import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import {atomicStyles} from '../../../styles';
import {useTranslation} from 'react-i18next/';
/**
 * File: AvailableFilm.tsx
 * @created 2021-03-16 20:30:56
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<AvailableFilmProps>>}
 */

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

const AvailableFilm: FC<PropsWithChildren<AvailableFilmProps>> = (
  props: PropsWithChildren<AvailableFilmProps>,
): ReactElement => {
  const {list, display} = props;
  const [translate] = useTranslation();
  return (
    <View style={{...styles.mainComponent, display: display}}>
      <View>
        <Text style={[atomicStyles.bold, styles.header]}>
          {translate('homeScreen.available')}
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <View
            style={{alignItems: 'center', marginRight: SLIDER_WIDTH * 0.051}}>
            <Image
              style={{
                width: SLIDER_WIDTH * 0.4,
                height: SLIDER_HEIGHT * 0.32,
                borderRadius: 22,
              }}
              source={{
                uri: item.img,
              }}
            />
            <Text style={[atomicStyles.bold, styles.text1]}>{item.name}</Text>
            <Text style={[atomicStyles.regular, styles.text2]}>
              {item.release}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />
      <View style={styles.line} />
    </View>
  );
};

export interface AvailableFilmProps {
  //
  list?: any[];
  display?: string;
}

AvailableFilm.defaultProps = {
  //
};

AvailableFilm.propTypes = {
  //
};

AvailableFilm.displayName = nameof(AvailableFilm);

export default React.memo(AvailableFilm);
