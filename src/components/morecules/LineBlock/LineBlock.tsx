import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './LineBlock.scss';
import {Pressable, Text, View} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles, Colors} from 'src/styles';
import Dash from 'react-native-dash';
import {SvgProps} from 'react-native-svg';

/**
 * File: LineBlock.tsx
 * @created 2021-03-14 20:43:44
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LineBlockProps>>}
 */
const LineBlock: FC<PropsWithChildren<LineBlockProps>> = (
  props: PropsWithChildren<LineBlockProps>,
): ReactElement => {
  const {label, icon, hasDash, onPress, isHideRight, right} = props;
  return (
    <>
      <Pressable
        onPress={onPress}
        style={[atomicStyles.flexRow, atomicStyles.w100, atomicStyles.py16px]}>
        {!!icon && (
          <View style={styles.iconView}>
            <SvgIcon component={icon} />
          </View>
        )}

        <View style={styles.label}>
          <Text style={[atomicStyles.h6, atomicStyles.bold, styles.textStyle]}>
            {label}
          </Text>
        </View>
        {!isHideRight && (
          <View style={styles.rightIcon}>
            <Text style={[atomicStyles.h6, styles.textStyle]}>{right}</Text>
            <SvgIcon
              component={require('assets/icons/Profile/BlackRight.svg')}
            />
          </View>
        )}
      </Pressable>
      {hasDash && (
        <Dash
          dashGap={0}
          dashLength={3}
          dashThickness={1}
          style={styles.dash}
          dashColor={Colors.Gray}
        />
      )}
    </>
  );
};

export interface LineBlockProps {
  //
  label?: string;

  icon?: {
    default: FC<SvgProps>;
  };

  hasDash?: boolean;

  onPress?: () => void;

  isHideRight?: boolean;

  right?: string;
}

LineBlock.defaultProps = {
  //
};

LineBlock.propTypes = {
  //
};

LineBlock.displayName = nameof(LineBlock);

export default React.memo(LineBlock);
