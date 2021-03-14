import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import 'src/components/atoms/HeaderBackButton/HeaderBackButton.scss';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import HeaderIconButton from 'src/components/atoms/HeaderIconButton/HeaderIconButton';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: HeaderBackButton.tsx
 * @created 2021-03-08 17:03:42
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<HeaderBackButtonProps>>}
 */
const HeaderBackButton: FC<PropsWithChildren<HeaderBackButtonProps>> = (
  props: PropsWithChildren<HeaderBackButtonProps>,
): ReactElement => {
  const {navigation} = props;

  return (
    <HeaderIconButton onPress={navigation.goBack}>
      <SvgIcon component={require('assets/icons/backIconRound.svg')} />
    </HeaderIconButton>
  );
};

export interface HeaderBackButtonProps {
  navigation?: StackNavigationProp<any>;
}

HeaderBackButton.defaultProps = {
  //
};

HeaderBackButton.propTypes = {
  //
};

HeaderBackButton.displayName = nameof(HeaderBackButton);

export default React.memo(HeaderBackButton);
