import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SummaryComponent.scss';
import {Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: SummaryComponent.tsx
 * @created 2021-04-12 12:43:43
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SummaryComponentProps>>}
 */
const SummaryComponent: FC<PropsWithChildren<SummaryComponentProps>> = (
  props: PropsWithChildren<SummaryComponentProps>,
): ReactElement => {
  const {content} = props;
  const handleClearButton = React.useCallback(() => {}, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={[atomicStyles.h5, styles.text]}>{content}</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearButton}>
          <SvgIcon component={require('assets/icons/Clear.svg')} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export interface SummaryComponentProps {
  //
  content?: string;
}

SummaryComponent.defaultProps = {
  //
};

SummaryComponent.propTypes = {
  //
};

SummaryComponent.displayName = nameof(SummaryComponent);

export default React.memo(SummaryComponent);
