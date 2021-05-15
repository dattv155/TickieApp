import {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SelectComboScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {
  StatusBar,
  View,
  ListRenderItem,
  FlatList,
  ListRenderItemInfo,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import ComboComponent from 'src/screens/SelectComboScreen/component/ComboComponent/ComboComponent';
import {atomicStyles} from 'src/styles';
import SummaryComponent from 'src/screens/SelectComboScreen/component/SummaryComponent/SummaryComponent';
import PaymentScreen from 'src/screens/PaymentScreen/PaymentScreen';
import {bookingService} from 'src/services/booking-service';
import {SelectedCombo} from 'src/services/booking-service/use-combo';
import {formatToCurrency} from 'src/helpers/string-helper';

/**
 * File: SelectComboScreen.tsx
 * @created 2021-04-11 17:32:52
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SelectComboScreenProps>>}
 */
const SelectComboScreen: FC<PropsWithChildren<SelectComboScreenProps>> = (
  props: PropsWithChildren<SelectComboScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {
    movieName,
    cinemaName,
    movieDate,
    showTime,
    pickingSeats,
    listLabel,
    seatCost,
  } = route?.params;

  const [inputVoucher, setInputVoucher] = React.useState('');

  const [listSelectCombo, setListSelectCombo] = React.useState<SelectedCombo[]>(
    [],
  );

  const [comboCost, setComboCost] = React.useState<number>(0);

  const [comboList] = bookingService.useCombo(navigation);

  const handleCombo = React.useCallback(
    (listCombo: SelectedCombo[]) => {
      console.log(listSelectCombo);
      let cost = 0;
      listSelectCombo.map((select) => {
        cost = cost + select.count * select.amount;
      });
      setComboCost(cost);
    },
    [listSelectCombo],
  );

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <ComboComponent
          combo={item}
          key={index}
          handleCombo={handleCombo}
          listCombo={listSelectCombo}
        />
      );
    },
    [handleCombo, listSelectCombo],
  );

  const handleGotoPaymentScreen = React.useCallback(() => {
    navigation.navigate(PaymentScreen.displayName, {
      movieName,
      cinemaName,
      movieDate,
      showTime,
      pickingSeats,
      listLabel,
      seatCost,
      listSelectCombo,
      comboCost,
    });
  }, [
    cinemaName,
    comboCost,
    listLabel,
    listSelectCombo,
    movieDate,
    movieName,
    navigation,
    pickingSeats,
    seatCost,
    showTime,
  ]);
  return (
    <>
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        // right={<HeaderIconPlaceholder />}
        gradient={false}
        customHeader={false}
        bgWhite={true}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.containerView}>
          <View style={styles.listComboArea}>
            <FlatList
              data={comboList}
              renderItem={renderItem}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.voucherContainer}>
            <TextInput
              style={[atomicStyles.light, styles.voucherTitle]}
              onChangeText={(text) => {
                setInputVoucher(text);
              }}
              placeholder={'Nhập mã khuyến mãi'}
            />
            <View style={styles.line} />
            <Text style={[atomicStyles.h7, styles.text]}>
              Không có mã khuyễn mãi?
              <Text style={[atomicStyles.bold]}> Hãy lấy ngay</Text>
            </Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text
            style={[atomicStyles.h1, atomicStyles.bold, styles.sumaryTitle]}>
            Chọn Set Combo
          </Text>
          <View style={styles.comboArea}>
            <Text style={[atomicStyles.h4, styles.comboText]}>Set Combo</Text>
            <View>
              {listSelectCombo.map((selectedCombo) => {
                return (
                  <SummaryComponent
                    count={selectedCombo.count}
                    nameCombo={selectedCombo.name}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.summaryTotal}>
            <View style={styles.costSummary}>
              <Text style={[atomicStyles.h5, styles.costTitle]}>Tạm tính</Text>
              <Text style={[atomicStyles.h1, atomicStyles.bold, styles.cost]}>
                {formatToCurrency(comboCost)} VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={handleGotoPaymentScreen}>
              <Text style={[atomicStyles.h5, styles.buttonText]}>
                Đặt Combo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface SelectComboScreenProps extends StackScreenProps<any> {
  //
}

SelectComboScreen.defaultProps = {
  //
};

SelectComboScreen.propTypes = {
  //
};

SelectComboScreen.displayName = nameof(SelectComboScreen);

export default SelectComboScreen;
