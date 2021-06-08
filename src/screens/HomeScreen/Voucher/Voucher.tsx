import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Voucher.scss';
import {Image, Text, View} from 'react-native';
import {atomicStyles} from '../../../styles';

/**
 * File: Voucher.tsx
 * @created 2021-05-16 11:05:28
 * @type {FC<PropsWithChildren<VoucherProps>>}
 */
const Voucher: FC<PropsWithChildren<VoucherProps>> = (
  props: PropsWithChildren<VoucherProps>,
): ReactElement => {
  const listVoucher = [
    {
      title: 'Giảm 20% giá trị đơn hàng',
      subtitle: 'Đi xem phim một mình',
      code: 'Imalone',
    },
    {
      title: 'Tặng bỏng và nước',
      subtitle: 'Áp dụng khi mua 1 vé',
      code: 'Combo1',
    },
    {
      title: 'Giảm 25% giá trị đơn hàng',
      subtitle: 'Đơn hàng trên 200K',
      code: 'FORYOUV',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.viewheader}>
        <Text
          style={[
            atomicStyles.h2,
            atomicStyles.bold,
            atomicStyles.textBlue,
            styles.textStyle,
          ]}>
          Voucher
        </Text>
      </View>

      {listVoucher.map((item, index: number) => (
        <View style={styles.box} key={index}>
          <View style={styles.boxx}>
            <Text style={[atomicStyles.h6]}>{item.title}</Text>
            <Text
              style={[
                atomicStyles.h7,
                atomicStyles.bold,
                styles.textStyle,
                atomicStyles.mt4px,
              ]}>
              Điều kiện:{' '}
            </Text>
            <Text style={[atomicStyles.h7, atomicStyles.mt2px]}>
              {item.subtitle}
            </Text>
          </View>
          <View style={[styles.nameofvou]}>
            <Image
              source={require('assets/images/Untitled2.png')}
              resizeMode="cover"
              style={{width: '100%', height: '100%', opacity: 0.9}}
            />
            <Text
              style={[
                styles.nameVoucher,
                atomicStyles.h5,
                atomicStyles.bold,
                atomicStyles.textDark,
                styles.textStyle,
              ]}>
              {item.code}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export interface VoucherProps {
  //
}

Voucher.defaultProps = {
  //
};

Voucher.propTypes = {
  //
};

Voucher.displayName = nameof(Voucher);

export default React.memo(Voucher);
