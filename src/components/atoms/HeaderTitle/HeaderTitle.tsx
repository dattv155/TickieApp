import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
// @ts-ignore
import {atomicStyles} from 'src/styles';
import {Text, TextProps} from 'react-native';

/**
 * File: HeaderTitle.tsx
 * @created 2021-03-08 17:03:42
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<DefaultLayoutProps>>}
 */
const HeaderTitle: FC<PropsWithChildren<HeaderTitleProps & TextProps>> = (
  props: PropsWithChildren<HeaderTitleProps>,
): ReactElement => {
  return (
    <Text
      style={[
        atomicStyles.flexGrow,
        atomicStyles.text,
        atomicStyles.textBold,
        atomicStyles.textWhite,
        atomicStyles.textCenter,
        atomicStyles.h3,
      ]}>
      {props.children}
    </Text>
  );
};

export interface HeaderTitleProps {
  //
}

HeaderTitle.defaultProps = {
  //
};

HeaderTitle.propTypes = {
  //
};

HeaderTitle.displayName = nameof(HeaderTitle);

export default React.memo(HeaderTitle);
