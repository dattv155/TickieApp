import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './InformationScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next/';

/**
 * File: InformationScreen.tsx
 * @created 2021-03-16 16:17:06
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<InformationScreenProps>>}
 */
const InformationScreen: FC<PropsWithChildren<InformationScreenProps>> = (
  props: PropsWithChildren<InformationScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  return (
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
          {translate('information.header')}
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView
        style={[atomicStyles.alignItemsCenter, styles.containerAll]}>
        <View style={[styles.contentContainer, atomicStyles.flexRow]}>
          <Image
            source={require('assets/logoTickie.png')}
            style={styles.imageContainer}
            resizeMode={'cover'}
          />
          <View style={styles.infoContainer}>
            <View>
              <Text
                style={[
                  atomicStyles.h4,
                  atomicStyles.bold,
                  atomicStyles.textBlue,
                  styles.textStyle,
                ]}>
                {translate('information.appName')}
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt10px,
                ]}>
                {translate('information.info')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>
                  {translate('information.infoMore')}
                </Text>
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt8px,
                ]}>
                {translate('information.version')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>1.0.0</Text>{' '}
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt8px,
                ]}>
                {translate('information.developers')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>
                  Ngô Tiến Tấn, Vũ Trọng Đạt
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface InformationScreenProps extends StackScreenProps<any> {
  //
}

InformationScreen.defaultProps = {
  //
};

InformationScreen.propTypes = {
  //
};

InformationScreen.displayName = nameof(InformationScreen);

export default InformationScreen;
