import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import ScreenHeader from 'src/components/organisms/ScreenHeader/ScreenHeader';
import HeaderTitle from 'src/components/atoms/HeaderTitle/HeaderTitle';
import PropTypes from 'prop-types';
import HeaderIconPlaceholder from 'src/components/atoms/HeaderIconPlaceholder/HeaderIconPlaceholder';
import {StackScreenProps} from '@react-navigation/stack';
import HeaderBackButton from 'src/components/atoms/HeaderBackButton/HeaderBackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {atomicStyles, Colors} from 'src/styles';
import {StatusBar, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './DefaultLayout.scss';

/**
 * File: DefaultLayout.tsx
 * @created 2021-03-08 17:03:42
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<DefaultLayoutProps>>}
 */
const DefaultLayout: FC<
  PropsWithChildren<DefaultLayoutProps & StackScreenProps<any>>
> = (
  props: PropsWithChildren<DefaultLayoutProps & StackScreenProps<any>>,
): ReactElement => {
  const {
    title,
    left,
    right,
    navigation,
    children,
    gradient,
    customHeader,
    header,
    bgWhite,
  } = props;

  const leftChilds = React.Children.toArray(left);

  const rightChilds = React.Children.toArray(right);

  if (leftChilds.length > 2 || rightChilds.length > 2) {
    throw new Error(
      'One header side can not contain more than 2 icon elements',
    );
  }

  const titleIsString: boolean = typeof title === 'string';

  const layout: ReactElement = (
    <View style={[bgWhite && {backgroundColor: Colors.White}]}>
      <SafeAreaView
        style={[
          atomicStyles.pt16px,
          atomicStyles.w100,
          atomicStyles.h100,
          !gradient && !bgWhite && atomicStyles.bgSecondary,
        ]}>
        {customHeader ? (
          header
        ) : (
          <ScreenHeader>
            {typeof left === 'string' && left === 'back-button' ? (
              <HeaderBackButton navigation={navigation} />
            ) : (
              leftChilds
            )}
            {titleIsString && leftChilds.length < 1 && (
              <HeaderIconPlaceholder />
            )}
            {titleIsString && leftChilds.length < 2 && (
              <HeaderIconPlaceholder />
            )}
            {titleIsString ? <HeaderTitle>{title}</HeaderTitle> : title}
            {titleIsString && rightChilds.length < 2 && (
              <HeaderIconPlaceholder />
            )}
            {titleIsString && rightChilds.length < 1 && (
              <HeaderIconPlaceholder />
            )}
            {rightChilds}
          </ScreenHeader>
        )}
        <View
          style={[
            atomicStyles.w100,
            atomicStyles.flexGrow,
            atomicStyles.bgSecondary,
          ]}>
          {children}
        </View>
      </SafeAreaView>
      <View style={[styles.bottom]} />
    </View>
  );

  return (
    <>
      {gradient ? (
        <LinearGradient
          style={[atomicStyles.bgSecondary]}
          colors={[Colors.Blue, Colors.RobinsEggBlue]}
          useAngle={true}
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          angle={90}>
          {layout}
        </LinearGradient>
      ) : (
        <>
          <StatusBar barStyle="dark-content" />
          {layout}
        </>
      )}
    </>
  );
};

export interface DefaultLayoutProps {
  //
  contentScrollable?: boolean;

  title?: string | ReactElement;

  left?: ReactElement[] | ReactElement | 'back-button';

  right?: ReactElement[] | ReactElement;

  gradient?: boolean;

  customHeader?: boolean;

  header?: ReactElement[] | ReactElement;

  bgWhite?: boolean;
}

DefaultLayout.defaultProps = {
  //
  contentScrollable: false,
  gradient: false,
  customHeader: false,
  bgWhite: false,
};

DefaultLayout.propTypes = {
  //
  contentScrollable: PropTypes.bool,
  gradient: PropTypes.bool,
  customHeader: PropTypes.bool,
  bgWhite: PropTypes.bool,
};

DefaultLayout.displayName = nameof(DefaultLayout);

export default React.memo(DefaultLayout);
