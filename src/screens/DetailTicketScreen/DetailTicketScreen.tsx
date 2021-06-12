import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './DetailTicketScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {StatusBar, Text, ScrollView} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next/';
import TicketDetail from 'src/components/morecules/TicketDetail/TicketDetail';

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

  const {movieTicket} = route?.params;

  const [translate] = useTranslation();

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
              styles.textStyle,
              atomicStyles.mt16px,
            ]}>
            {translate('movieDetail.header')}
          </Text>
        }
        gradient={false}
        customHeader={false}>
        <ScrollView
          style={styles.screenContainer}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <TicketDetail movieBooking={movieTicket} />
        </ScrollView>
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
