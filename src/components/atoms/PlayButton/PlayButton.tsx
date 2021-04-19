import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './PlayButton.scss';
import {TouchableOpacity} from 'react-native';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: PlayButton.tsx
 * @created 2021-03-23 00:06:02
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<PlayButtonProps>>}
 */
const PlayButton: FC<PropsWithChildren<PlayButtonProps>> = (
  props: PropsWithChildren<PlayButtonProps>,
): ReactElement => {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <SvgIcon component={require('assets/icons/Play.svg')} />
      </TouchableOpacity>
    </>
  );
};

export interface PlayButtonProps {
  //
}

PlayButton.defaultProps = {
  //
};

PlayButton.propTypes = {
  //
};

PlayButton.displayName = nameof(PlayButton);

export default React.memo(PlayButton);
