import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import './MovieInfoScreen.scss';

/**
 * File: MovieInfoScreen.tsx
 * @created 2021-03-09 17:22:26
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<MovieInfoScreenProps>>}
 */
const MovieInfoScreen: FC<PropsWithChildren<MovieInfoScreenProps>> = (
  props: PropsWithChildren<MovieInfoScreenProps>,
): ReactElement => {
  return (
    <>
      {props.children}
    </>
  );
};

export interface MovieInfoScreenProps {
  //
}

MovieInfoScreen.defaultProps = {
  //
};

MovieInfoScreen.propTypes = {
  //
};

MovieInfoScreen.displayName = nameof(MovieInfoScreen);

export default React.memo(MovieInfoScreen);
