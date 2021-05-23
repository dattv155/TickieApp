import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './GeneralSettingScreen.scss';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next/';
import localization from '@react3l/localization';
import {showInfo} from 'src/helpers/toast';
import LineBlock from 'src/components/morecules/LineBlock/LineBlock';

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

  const handleChangeLanguage = React.useCallback(
    (lang: 'en' | 'vi') => async () => {
      await localization.changeLanguage(lang);
      showInfo(translate('setting.languages.success'));
    },
    [translate],
  );

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
      <View style={styles.viewContainer}>
        <Text
          style={[
            atomicStyles.h5,
            atomicStyles.textBlue,
            atomicStyles.bold,
            styles.textStyle,
          ]}>
          {translate('setting.language')}
        </Text>
        <LineBlock
          icon={require('assets/icons/MicIcon.svg')}
          label={translate('setting.languages.vi')}
          hasDash={true}
          isHideRight={true}
          onPress={handleChangeLanguage('vi')}
        />
        <LineBlock
          icon={require('assets/icons/MicIcon.svg')}
          label={translate('setting.languages.en')}
          hasDash={false}
          isHideRight={true}
          onPress={handleChangeLanguage('en')}
        />
      </View>
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
