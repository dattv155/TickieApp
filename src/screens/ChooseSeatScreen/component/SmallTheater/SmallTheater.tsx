import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SmallTheater.scss';
import Seat from 'src/screens/ChooseSeatScreen/component/Seat/Seat';
import {View, Text, ListRenderItem, ListRenderItemInfo} from 'react-native';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: SmallTheater.tsx
 * @created 2021-04-10 22:35:47
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SmallTheaterProps>>}
 */
const SmallTheater: FC<PropsWithChildren<SmallTheaterProps>> = (
  props: PropsWithChildren<SmallTheaterProps>,
): ReactElement => {
  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return <Seat state={item} key={index} />;
    },
    [],
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.labelLeft}>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            A
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            B
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            C
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            D
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            E
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            F
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            G
          </Text>
        </View>
        <View style={styles.seatArea}>
          <View style={styles.rowA}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
            <Seat />
          </View>
          <View style={styles.rowBF}>
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
            <SvgIcon component={require('assets/icons/seat/CoupleSeat.svg')} />
          </View>
        </View>

        <View style={styles.labelRight}>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            A
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            B
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            C
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            D
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            E
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            F
          </Text>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.labelText]}>
            G
          </Text>
        </View>
      </View>
    </>
  );
};

export interface SmallTheaterProps {
  //
}

SmallTheater.defaultProps = {
  //
};

SmallTheater.propTypes = {
  //
};

SmallTheater.displayName = nameof(SmallTheater);

export default React.memo(SmallTheater);
