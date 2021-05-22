import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './HelperScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next/';

/**
 * File: HelperScreen.tsx
 * @created 2021-03-16 16:16:55
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<HelperScreenProps>>}
 */
const HelperScreen: FC<PropsWithChildren<HelperScreenProps>> = (
  props: PropsWithChildren<HelperScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  return (
    <>
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
            {translate('helper.header')}
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
                    atomicStyles.h5,
                    atomicStyles.bold,
                    atomicStyles.textBlue,
                    styles.textStyle,
                  ]}>
                  {translate('helper.appName')}
                </Text>
                <Text
                  style={[
                    atomicStyles.h6,
                    atomicStyles.textGray,
                    atomicStyles.mt10px,
                  ]}>
                  {translate('helper.contact')}{' '}
                </Text>
                <Text
                  style={[
                    atomicStyles.bold,
                    atomicStyles.textGray,
                    styles.textStyle,
                  ]}>
                  {translate('helper.email')}
                </Text>
                <Text
                  style={[
                    atomicStyles.bold,
                    atomicStyles.textGray,
                    styles.textStyle,
                  ]}>
                  {translate('helper.phoneNumber')}
                </Text>
                <Text
                  style={[
                    atomicStyles.h6,
                    atomicStyles.textGray,
                    atomicStyles.mt4px,
                  ]}>
                  {translate('helper.moreInfo')}{' '}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </DefaultLayout>
    </>
  );
};

export interface HelperScreenProps extends StackScreenProps<any> {
  //
}

HelperScreen.defaultProps = {
  //
};

HelperScreen.propTypes = {
  //
};

HelperScreen.displayName = nameof(HelperScreen);

export default HelperScreen;
