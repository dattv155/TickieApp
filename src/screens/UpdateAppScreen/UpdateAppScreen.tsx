import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './UpdateAppScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next/';
import {showWarning} from 'src/helpers/toast';

/**
 * File: UpdateAppScreen.tsx
 * @created 2021-03-16 16:16:44
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<UpdateAppScreenProps>>}
 */
const UpdateAppScreen: FC<PropsWithChildren<UpdateAppScreenProps>> = (
  props: PropsWithChildren<UpdateAppScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const [translate] = useTranslation();

  const handlePressUpdate = React.useCallback(() => {
    showWarning(translate('update.developing'));
  }, [translate]);

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
          {translate('update.header')}
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
                {translate('update.appName')}
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt10px,
                ]}>
                {translate('update.version')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>1.0.0</Text>{' '}
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt4px,
                ]}>
                {translate('update.time')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>
                  01/06/2021
                </Text>
              </Text>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.textGray,
                  atomicStyles.mt4px,
                ]}>
                {translate('update.info')}{' '}
                <Text style={[atomicStyles.bold, styles.textStyle]}>
                  {translate('update.fixInfo')}
                </Text>
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.buttonUpdate}
                onPress={handlePressUpdate}>
                <Text
                  style={[
                    atomicStyles.h7,
                    atomicStyles.bold,
                    atomicStyles.textWhite,
                    styles.textStyle,
                  ]}>
                  {translate('update.update')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DefaultLayout>
  );
};

export interface UpdateAppScreenProps extends StackScreenProps<any> {
  //
}

UpdateAppScreen.defaultProps = {
  //
};

UpdateAppScreen.propTypes = {
  //
};

UpdateAppScreen.displayName = nameof(UpdateAppScreen);

export default UpdateAppScreen;
