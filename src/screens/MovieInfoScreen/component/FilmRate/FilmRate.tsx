import React, {FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './FilmRate.scss';
import {Text, View} from 'react-native';
import {Obj} from 'src/screens/MovieInfoScreen/MovieInfoScreen';
import {atomicStyles} from 'src/styles';

/**
 * File: FilmRate.tsx
 * @created 2021-05-10 23:51:19
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<FilmRateProps>>}
 */
const FilmRate: FC<PropsWithChildren<FilmRateProps>> = (
  props: PropsWithChildren<FilmRateProps>,
): ReactElement => {
  const {data} = props;
  const [rate, setRate] = React.useState<number[]>([0, 0, 0, 0, 0]);

  let exp = [...rate];

  useEffect(() => {
    var leng = data.length;
    if (leng === 0) {
      return;
    }

    exp = exp.map(
      (item, index) =>
        (data.filter((items) => items.data().rate === 5 - index).length /
          leng) *
        100,
    );
    setRate(exp);
  }, [data]);
  return (
    <View style={styles.fiveline}>
      <View style={styles.tv}>
        <Text style={[atomicStyles.h6, atomicStyles.textGray]}>Tuyệt vời</Text>
        <View style={styles.outline}>
          <View style={[styles.inline5, {width: `${rate[0]}%`}]} />
        </View>
      </View>
      <View style={styles.tv}>
        <Text style={[atomicStyles.h6, atomicStyles.textGray]}>Tốt</Text>
        <View style={styles.outline}>
          <View style={[styles.inline4, {width: `${rate[1]}%`}]} />
        </View>
      </View>
      <View style={styles.tv}>
        <Text style={[atomicStyles.h6, atomicStyles.textGray]}>Khá</Text>
        <View style={styles.outline}>
          <View style={[styles.inline3, {width: `${rate[2]}%`}]} />
        </View>
      </View>
      <View style={styles.tv}>
        <Text style={[atomicStyles.h6, atomicStyles.textGray]}>Trung bình</Text>
        <View style={styles.outline}>
          <View style={[styles.inline2, {width: `${rate[3]}%`}]} />
        </View>
      </View>
      <View style={styles.tv}>
        <Text style={[atomicStyles.h6, atomicStyles.textGray]}>Dở</Text>
        <View style={styles.outline}>
          <View style={[styles.inline1, {width: `${rate[4]}%`}]} />
        </View>
      </View>
    </View>
  );
};

export interface FilmRateProps {
  //
  data?: Array<Obj>;
}

export interface Obj {
  id?: String;
  data?: Function;
}
FilmRate.defaultProps = {
  //
};

FilmRate.propTypes = {
  //
};

FilmRate.displayName = nameof(FilmRate);

export default React.memo(FilmRate);
