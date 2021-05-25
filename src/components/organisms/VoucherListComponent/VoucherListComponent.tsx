import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './VoucherListComponent.scss';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles, Colors} from 'src/styles';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import LeftIcon from 'assets/icons/LeftIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {selectOneService} from 'src/services/select-one-service';
import VoucherBlock from 'src/components/morecules/VoucherBlock/VoucherBlock';
import {Voucher} from 'src/models/Voucher';
import {ListVoucher} from 'src/sample/listVoucher';
/**
 * File: VoucherListComponent.tsx
 * @created 2021-05-25 03:02:48
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<VoucherListComponentProps>>}
 */
const list: Array<number> = [1, 5, 10, 20, 30];

const VoucherListComponent: FC<PropsWithChildren<VoucherListComponentProps>> = (
  props: PropsWithChildren<VoucherListComponentProps>,
): ReactElement => {
  const {visible, navigation, route, onClose, handleSelectVoucher} = props;

  const [idFilter, handleChange] = selectOneService.useIdFilter({
    equal: -1,
  });

  const handleSelectItem = React.useCallback(
    (voucher: Voucher) => {
      handleSelectVoucher(voucher);
    },
    [handleSelectVoucher],
  );

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <DefaultLayout
        navigation={navigation}
        route={route}
        left={
          <Pressable onPress={onClose} style={[atomicStyles.pl8px]}>
            <LeftIcon color={Colors.Blue} />
          </Pressable>
        }
        right={<HeaderIconPlaceholder />}
        title={
          <Text
            style={[atomicStyles.textDark, atomicStyles.h3, atomicStyles.bold]}>
            Chọn voucher
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <ScrollView horizontal={false}>
          <View style={styles.scrollView}>
            {ListVoucher.map((item, index) => (
              <VoucherBlock
                key={index}
                item={item}
                index={index}
                onChange={handleChange}
                onSelected={handleSelectItem}
                currentValue={idFilter?.equal}
              />
            ))}
          </View>
        </ScrollView>
      </DefaultLayout>
    </Modal>
  );
};

export interface VoucherListComponentProps extends StackScreenProps<any> {
  //
  onClose?: () => void;

  visible?: boolean;

  handleSelectVoucher?: (voucher: Voucher) => void;
}

VoucherListComponent.defaultProps = {
  //
};

VoucherListComponent.propTypes = {
  //
};

VoucherListComponent.displayName = nameof(VoucherListComponent);

export default React.memo(VoucherListComponent);
