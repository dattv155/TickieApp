import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './GeneralSettingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {SafeAreaView, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next/';

/**
 * File: GeneralSettingScreen.tsx
 * @created 2021-03-16 16:16:30
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<GeneralSettingScreenProps>>}
 */
const GeneralSettingScreen: FC<PropsWithChildren<GeneralSettingScreenProps>> = (
  props: PropsWithChildren<GeneralSettingScreenProps>,
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
          {translate('setting.header')}
        </Text>
      }
      gradient={false}
      customHeader={false}>
      <SafeAreaView
        style={[atomicStyles.alignItemsCenter, styles.containerAll]}>
        <View style={[styles.contentContainer, atomicStyles.flexRow]}>
          <View style={styles.infoContainer}>
            <View>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textBlue,
                  styles.textStyle,
                ]}>
                {translate('setting.changeLanguage')}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface GeneralSettingScreenProps extends StackScreenProps<any> {
  //
}

GeneralSettingScreen.defaultProps = {
  //
};

GeneralSettingScreen.propTypes = {
  //
};

GeneralSettingScreen.displayName = nameof(GeneralSettingScreen);

export default GeneralSettingScreen;
