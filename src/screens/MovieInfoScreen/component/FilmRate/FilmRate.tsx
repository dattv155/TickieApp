import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './FilmRate.scss';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {Comment} from 'src/models/Comment';
import {useNavigation} from '@react-navigation/native';

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

  const [showData, setShowData] = React.useState<boolean>(false);

  const exp = [...rate];

  React.useEffect(() => {
    if (data) {
      setShowData(true);
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      const listExp = exp.map(
        (item, index) =>
          (data.filter((items) => items.rate === 5 - index).length /
            data.length) *
          100,
      );
      if (showData) {
        setRate([...listExp]);
      }
    }

    return function cleanup() {
      setShowData(false);
    };
  }, [data, exp, showData]);
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
  data?: Array<Comment>;
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
