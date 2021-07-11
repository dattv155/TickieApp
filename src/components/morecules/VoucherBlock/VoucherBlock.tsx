import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './VoucherBlock.scss';
import {TouchableOpacity, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {useTranslation} from 'react-i18next';
import {Voucher} from 'src/models/Voucher';

/**
 * File: VoucherBlock.tsx
 * @created 2021-05-25 03:15:10
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<VoucherBlockProps>>}
 */
const VoucherBlock: FC<PropsWithChildren<VoucherBlockProps>> = (
  props: PropsWithChildren<VoucherBlockProps>,
): ReactElement => {
  const [translate] = useTranslation();

  const {item, index, currentValue, onChange, onSelected} = props;

  const handleSelected = React.useCallback(() => {
    if (typeof onChange === 'function') {
      onChange(index);
      onSelected(item);
    }
  }, [onChange, onSelected, item, index]);

  const selected: boolean = index === currentValue;

  return (
    <>
      <View style={styles.containerView}>
        <View style={styles.leftArea}>
          <Text style={[atomicStyles.text, atomicStyles.h5, atomicStyles.bold]}>
            {item.code}
          </Text>
          <Text
            style={[atomicStyles.h6, atomicStyles.textDark, styles.textDetail]}>
            {item.detail}
          </Text>
          <Text style={[atomicStyles.h6, styles.textDetail]}>
            <Text style={[atomicStyles.bold]}>
              {translate('bookingScreen.paymentScreen.voucherCondition')}
            </Text>
            {item.condition}
          </Text>
        </View>
        {selected ? (
          <TouchableOpacity style={[styles.block, styles.selectedBlock]}>
            <Text
              style={[
                atomicStyles.h6,
                atomicStyles.textDark,
                atomicStyles.textCenter,
              ]}>
              {translate('bookingScreen.paymentScreen.selectedVoucher')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.block} onPress={handleSelected}>
            <Text
              style={[
                atomicStyles.h6,
                atomicStyles.bold,
                atomicStyles.textWhite,
                atomicStyles.textCenter,
              ]}>
              {translate('bookingScreen.paymentScreen.unSelectVoucher')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
export interface VoucherBlockProps {
  //
  item?: Voucher;

  index?: number;

  currentValue?: number;

  onChange?: (index: number) => void;

  onSelected?: (voucher: Voucher) => void;
}

VoucherBlock.defaultProps = {
  //
};

VoucherBlock.propTypes = {
  //
};

VoucherBlock.displayName = nameof(VoucherBlock);

export default React.memo(VoucherBlock);
