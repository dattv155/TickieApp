import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './Spinner.scss';
import PropTypes from 'prop-types';
import {atomicStyles, Colors} from 'src/styles';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';

/**
 * File: Spinner.tsx
 * @created 2021-03-16 16:47:00
 * @author tannt <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SpinnerProps>>}
 */
const Spinner: FC<PropsWithChildren<SpinnerAtomProps>> = (
  props: PropsWithChildren<SpinnerAtomProps>,
): ReactElement => {
  const {loading, color, style} = props;

  if (loading) {
    return (
      <>
        <ActivityIndicator color={color} style={[atomicStyles.mr8px, style]} />
      </>
    );
  }

  return null;
};

export interface SpinnerAtomProps {
  loading?: boolean;

  color?: string;

  style?: StyleProp<ViewStyle>;
}

Spinner.defaultProps = {
  loading: false,
  color: Colors.White,
};

Spinner.propTypes = {
  loading: PropTypes.bool,
};

Spinner.displayName = nameof(Spinner);

export default Spinner;
