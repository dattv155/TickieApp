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
import {useTranslation} from 'react-i18next/';

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

  const [translate] = useTranslation();

  const {
    movieName,
    movieType,
    movieFormat,
    cinemaName,
    movieDate,
    showTime,
    pickingSeats,
    listLabel,
    seatCost,
    moviePoster,
  } = route?.params;

  const [inputVoucher, setInputVoucher] = React.useState('');

  const [listSelectCombo, setListSelectCombo] = React.useState<SelectedCombo[]>(
    [],
  );

  const [comboCost, setComboCost] = React.useState<number>(0);

  const [comboList, handleDeleteDuplicate] = bookingService.useCombo(
    navigation,
  );

  const handleListCombo = React.useCallback(
    (comboSelected: SelectedCombo) => {
      const list = handleDeleteDuplicate(listSelectCombo, comboSelected);

      if (list > -1) {
        setListSelectCombo((prevs) =>
          prevs.map((prev) => {
            return prev.comboID === comboSelected.comboID
              ? {...prev, count: comboSelected.count}
              : prev;
          }),
        );
      } else {
        setListSelectCombo((prevs) => [...prevs, comboSelected]);
      }
    },
    [handleDeleteDuplicate, listSelectCombo],
  );

  React.useEffect(() => {
    let cost = 0;
    listSelectCombo.map((select) => {
      cost = cost + select.count * select.amount;
    });
    setComboCost(cost);
  }, [listSelectCombo]);

  const renderComboItem: ListRenderItem<any> = React.useCallback(
    ({item, index}: ListRenderItemInfo<any>) => {
      return (
        <ComboComponent
          combo={item}
          key={index}
          handleCombo={handleListCombo}
        />
      );
    },
    [handleListCombo],
  );

  const handleGotoPaymentScreen = React.useCallback(() => {
    navigation.navigate(PaymentScreen.displayName, {
      movieName,
      movieType,
      movieFormat,
      cinemaName,
      movieDate,
      showTime,
      pickingSeats,
      listLabel,
      seatCost,
      listSelectCombo,
      comboCost,
      moviePoster,
    });
  }, [
    cinemaName,
    comboCost,
    listLabel,
    listSelectCombo,
    movieDate,
    movieFormat,
    movieName,
    moviePoster,
    movieType,
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
              renderItem={renderComboItem}
              keyExtractor={(item) => item.comboID.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/*<View style={styles.voucherContainer}>*/}
          {/*  <TextInput*/}
          {/*    style={[atomicStyles.h6]}*/}
          {/*    onChangeText={(text) => {*/}
          {/*      setInputVoucher(text);*/}
          {/*    }}*/}
          {/*    placeholder={translate('bookingScreen.comboSelect.enterCode')}*/}
          {/*  />*/}
          {/*  <View style={styles.line} />*/}
          {/*  <Text style={[atomicStyles.h7, atomicStyles.textGray]}>*/}
          {/*    {translate('bookingScreen.comboSelect.noVoucher')}*/}
          {/*    <Text style={[atomicStyles.bold, styles.textStyle]}>*/}
          {/*      {' '}*/}
          {/*      {translate('bookingScreen.comboSelect.getNow')}*/}
          {/*    </Text>*/}
          {/*  </Text>*/}
          {/*</View>*/}
        </View>
        <View style={styles.summaryContainer}>
          <Text
            style={[
              atomicStyles.h2,
              atomicStyles.textBlue,
              atomicStyles.bold,
              styles.textStyle,
            ]}>
            {translate('bookingScreen.comboSelect.selectSetCombo')}
          </Text>
          <View style={styles.comboArea}>
            <Text style={[atomicStyles.h4]}>
              {' '}
              {translate('bookingScreen.comboSelect.setCombo')}
            </Text>
            <View>
              {listSelectCombo.map((selectedCombo, index) => {
                return selectedCombo.count > 0 ? (
                  <SummaryComponent
                    key={index + selectedCombo.count}
                    count={selectedCombo.count}
                    nameCombo={selectedCombo.name}
                  />
                ) : (
                  <View />
                );
              })}
            </View>
          </View>
          <View style={styles.summaryTotal}>
            <View style={styles.costSummary}>
              <Text style={[atomicStyles.h5]}>
                {' '}
                {translate('bookingScreen.comboSelect.summary')}
              </Text>
              <Text
                style={[atomicStyles.h1, atomicStyles.bold, styles.textStyle]}>
                {formatToCurrency(comboCost)} VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={handleGotoPaymentScreen}>
              <Text style={[atomicStyles.h5, styles.buttonText]}>
                {translate('bookingScreen.comboSelect.confirmCombo')}
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
