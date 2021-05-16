import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Voucher.scss';
import {View, TouchableOpacity, Text} from 'react-native'
import {atomicStyles} from '../../../styles';
import { Image } from 'react-native'; 
/**
 * File: Voucher.tsx
 * @created 2021-05-16 11:05:28
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<VoucherProps>>}
 */
const Voucher: FC<PropsWithChildren<VoucherProps>> = (
  props: PropsWithChildren<VoucherProps>,
): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.viewheader}>
        <Text style={[atomicStyles.bold, styles.header]}>
          Voucher
        </Text>
      </View>
      <View style={styles.box}>

        <View style={styles.boxx}>
            <Text style={[styles.noidung, atomicStyles.regular]}>Giảm 20% giá trị đơn hàng</Text>
              <Text style={[styles.noidung, atomicStyles.bold]}>Điều kiện: </Text>
              <Text style={[styles.noidung, atomicStyles.regular]}>Đi xem phim một mình</Text>
        </View>
        <View style={[styles.nameofvou]}>
        <Image
          source={require("assets/images/Untitled2.png")}
          resizeMode="cover"
          style={{width: '100%', height: '100%', opacity: 0.9}}
          />
          <Text style={[styles.namevoucher, atomicStyles.regular]}>Imalone</Text>
        </View>
      </View>
      <View style={styles.box}>
        
        <View style={styles.boxx}>
            <Text style={[styles.noidung, atomicStyles.regular]}>Giảm 25% giá trị đơn hàng</Text>
              <Text style={[styles.noidung, atomicStyles.bold]}>Điều kiện: </Text>
              <Text style={[styles.noidung, atomicStyles.regular]}>Đơn hàng trên 200K</Text>
        </View>
        <View style={[styles.nameofvou]}>
        <Image
          source={require("assets/images/Untitled2.png")}
          resizeMode="cover"
          style={{width: '100%', height: '100%', opacity: 0.9}}
          />
                 <Text style={[styles.namevoucher, atomicStyles.regular]}>FORYOUV</Text>
        </View>
      </View>
      <View style={styles.box}>
        
        <View style={styles.boxx}>
            <Text style={[styles.noidung, atomicStyles.regular]}>Tặng bỏng và nước</Text>
              <Text style={[styles.noidung, atomicStyles.bold]}>Điều kiện: </Text>
              <Text style={[styles.noidung, atomicStyles.regular]}>Áp dụng khi mua 1 vé</Text>
        </View>
        <View style={[styles.nameofvou]}>
          <Image
          source={require("assets/images/Untitled2.png")}
          resizeMode="cover"
          style={{width: '100%', height: '100%', opacity: 0.9}}
          />
                 <Text style={[styles.namevoucher, atomicStyles.regular]}>Combo1</Text>
        </View>
      </View>

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
