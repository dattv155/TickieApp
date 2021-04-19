import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './DetailTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, SafeAreaView, Image, StatusBar} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import LinearGradient from 'react-native-linear-gradient';
import {atomicStyles, Colors} from 'src/styles';
import TextItemView from 'src/screens/DetailTicketScreen/components/TextItemView/TextItemView';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';

/**
 * File: DetailTicketScreen.tsx
 * @created 2021-03-15 23:09:51
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<DetailTicketScreenProps>>}
 */
const DetailTicketScreen: FC<PropsWithChildren<DetailTicketScreenProps>> = (
  props: PropsWithChildren<DetailTicketScreenProps>,
): ReactElement => {
  const {navigation, route} = props;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Light_Gray} />
      <DefaultLayout
        navigation={navigation}
        route={route}
        left="back-button"
        right={<HeaderIconPlaceholder />}
        title={
          <Text
            style={[
              atomicStyles.h3,
              atomicStyles.bold,
              // styles.textStyle,
              atomicStyles.mt16px,
            ]}>
            Thông tin vé
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.ticketViewContainer}>
            {/*<View style={styles.darkerLayer} />*/}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#2c2c2c', '#000000']}
              style={styles.darkerLayer}
            />
            <Image
              source={require('assets/images/mulan-poster.png')}
              resizeMode="cover"
              style={styles.imageView}
            />
            <View style={styles.infoContainer}>
              <View style={styles.titleTicket}>
                <Text
                  style={[
                    atomicStyles.textWhite,
                    atomicStyles.h3,
                    atomicStyles.bold,
                    styles.textStyle,
                  ]}>
                  Mulan
                </Text>
                <Text
                  style={[
                    atomicStyles.textWhite,
                    atomicStyles.h5,
                    // atomicStyles.bold,
                    styles.textStyle,
                  ]}>
                  180 phút - IMAX
                </Text>
              </View>

              <TextItemView label="Mã vé" value="18022123214" />
              <TextItemView label="Thời gian" value="7:00 PM 10/3" />
              <TextItemView label="Rạp" value="Tickie Giải Phóng" />
              <TextItemView label="Phòng chiếu" value="2B" />
              <TextItemView label="Chỗ ngồi" value="D06, D07" />
              <TextItemView label="Set Combo" value="1 Combo L, 1 Combo M" />
              <TextItemView label="Giá" value="400.000 VND" />
            </View>

            <SvgIcon
              component={require('assets/TicketFrame/TicketFrame.svg')}
              style={styles.ticketFrame}
            />

            <SvgIcon
              component={require('assets/TicketFrame/BarCode.svg')}
              style={styles.barCode}
            />
          </View>
        </SafeAreaView>
      </DefaultLayout>
    </>
  );
};

export interface DetailTicketScreenProps extends StackScreenProps<any> {
  //
}

DetailTicketScreen.defaultProps = {
  //
};

DetailTicketScreen.propTypes = {
  //
};

DetailTicketScreen.displayName = nameof(DetailTicketScreen);

export default DetailTicketScreen;
