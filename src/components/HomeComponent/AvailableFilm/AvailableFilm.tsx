import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import styles from './AvailableFilm.scss';
import {useState} from 'react';
import {View, Text, FlatList, Image, Dimensions} from 'react-native';

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
  const [list, setList]= useState([
    {
      id: 1,
      img: 'https://ae01.alicdn.com/kf/HTB1Va5mQXXXXXcnXXXXq6xXFXXXV/La-La-Land-Film-Aquarelle-Tissu-jet-d-encre-affiche-20-X13-07.jpg',
      name: 'La La Land',
      release: '12-12-2021'
    },
    {
      id: 2,
      img: 'https://resizing.flixster.com/JSQhj07oIhsYdTaPu6iZ_ldKJa8=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2RlNzI0MGQyLTQ2ZTktNGMyYi05N2VmLTFjMDhiY2VlMDQ2Ni53ZWJw',
      name: 'Blade Runner 2049',
      release: '12-2-2021'
    },
    {
      id: 3,
      img: 'https://fcine.net/uploads/monthly_2019_06/2pikachu-_vietnamese_poster.jpg.015075262656d06602221295e8ef16cf.jpg',
      name: 'Detective Pikachu',
      release: '12-02-2022'
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/originals/a6/6d/93/a66d93b32698ef7d7f6aea369ab4d196.jpg',
      name: 'Demon Slayer: Infinitive train',
      release: '12-02-2020'
    }
  ]);
  return (
    <View style={styles.mainComponent}> 
        <View>
          <Text style={styles.header}>
            Đang có tại Rạp
          </Text>
        </View>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View>
                <Image
                    style={{width: SLIDER_WIDTH *0.4,
                            height: SLIDER_HEIGHT*0.32,
                            borderRadius: 22,
                            marginRight: SLIDER_WIDTH* 0.051
                            }}
                    source={{
                      uri: item.img
                    }}>
                </Image>
                <Text style={styles.text1}>{item.name}</Text>
                <Text style={styles.text2}>{item.release}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          />
          <View style={styles.line}/>
      </View>
  );
};

export interface AvailableFilmProps {
  //
}

AvailableFilm.defaultProps = {
  //
};

AvailableFilm.propTypes = {
  //
};

AvailableFilm.displayName = nameof(AvailableFilm);

export default React.memo(AvailableFilm);


