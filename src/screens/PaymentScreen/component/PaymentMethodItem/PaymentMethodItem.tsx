import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './PaymentMethodItem.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from 'src/styles';

/**
 * File: PaymentMethodItem.tsx
 * @created 2021-04-15 23:59:54
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<PaymentMethodItemProps>>}
 */
const PaymentMethodItem: FC<PropsWithChildren<PaymentMethodItemProps>> = (
  props: PropsWithChildren<PaymentMethodItemProps>,
): ReactElement => {
  const {type} = props;
  const [tick, setTick] = React.useState<boolean>(false);
  const handleTick = React.useCallback(() => {
    setTick(!tick);
  }, [tick]);
  return (
    <>
      <View style={styles.container}>
        <SvgIcon component={require('assets/icons/WalletIcon.svg')} />
        <View style={styles.title}>
          {type === 'credit' ? (
            <>
              <Text style={[atomicStyles.bold]}>Thẻ tín dụng</Text>
              <Text style={[atomicStyles.h7]}>
                Visa, Master Card, Thẻ nội địa
              </Text>
            </>
          ) : type === 'banking' ? (
            <>
              <Text style={[atomicStyles.bold]}>
                Internet Banking (Thẻ ATM)
              </Text>
              <Text style={[atomicStyles.h7]}>
                Visa, Master Card, Thẻ nội địa
              </Text>
            </>
          ) : (
            <>
              <Text style={[atomicStyles.bold]}>E-wallet</Text>
              <Text style={[atomicStyles.h7]}>Momo</Text>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.ticker} onPress={handleTick}>
          {tick ? (
            <SvgIcon component={require('assets/icons/TickIcon.svg')} />
          ) : (
            <SvgIcon component={require('assets/icons/UntickIcon.svg')} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export interface PaymentMethodItemProps {
  //
  type?: string;
}

PaymentMethodItem.defaultProps = {
  //
};

PaymentMethodItem.propTypes = {
  //
};

PaymentMethodItem.displayName = nameof(PaymentMethodItem);

export default React.memo(PaymentMethodItem);
