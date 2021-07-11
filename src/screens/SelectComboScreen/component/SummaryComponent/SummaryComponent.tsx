import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SummaryComponent.scss';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ComboSet} from 'src/models/ComboSet';

/**
 * File: SummaryComponent.tsx
 * @created 2021-04-12 12:43:43
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SummaryComponentProps>>}
 */
const SummaryComponent: FC<PropsWithChildren<SummaryComponentProps>> = (
  props: PropsWithChildren<SummaryComponentProps>,
): ReactElement => {
  const {combo} = props;

  return (
    <>
      <View style={styles.container}>
        <Text style={[atomicStyles.h5, styles.text]}>
          {combo.count} {combo.name}
        </Text>
        {/*<TouchableOpacity*/}
        {/*  style={styles.clearButton}*/}
        {/*  onPress={handleClearButton}>*/}
        {/*  <SvgIcon component={require('assets/icons/Clear.svg')} />*/}
        {/*</TouchableOpacity>*/}
      </View>
    </>
  );
};

export interface SummaryComponentProps {
  //
  combo?: ComboSet;
}

SummaryComponent.defaultProps = {
  //
};

SummaryComponent.propTypes = {
  //
};

SummaryComponent.displayName = nameof(SummaryComponent);

export default React.memo(SummaryComponent);
