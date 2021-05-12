import React, { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import nameof from 'ts-nameof.macro';
import styles from './RateStar.scss';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {
  Text,
  View,
} from 'react-native';
/**
 * File: RateStar.tsx
 * @created 2021-05-11 22:02:56
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<RateStarProps>>}
 */

const RateStar: FC<PropsWithChildren<RateStarProps>> = (
  props: PropsWithChildren<RateStarProps>,
): ReactElement => {
  const {rate}= props;
  const [star, setStar]= React.useState([]);
  useEffect(() => {
    var exp=[];
    for(let i=0; i<rate; i++)
      exp.push(<SvgIcon key={i} component={require('assets/icons/star.svg')} />);
    for(let i=rate; i< 5; i++)
      exp.push(<SvgIcon key={i} component={require('assets/icons/stargray.svg')} />);
    setStar(exp);
  },[rate]);
  return (
    <>
    <View style={styles.star}>
    {star}
    </View>
    </>
  );
};

export interface RateStarProps {
  //
}

RateStar.defaultProps = {
  //
};

RateStar.propTypes = {
  //
};

RateStar.displayName = nameof(RateStar);

export default React.memo(RateStar);
