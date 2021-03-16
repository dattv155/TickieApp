import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import './ABCXYZ.scss';

/**
 * File: ABCXYZ.tsx
 * @created 2021-03-16 20:30:56
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<ABCXYZProps>>}
 */
const ABCXYZ: FC<PropsWithChildren<ABCXYZProps>> = (
  props: PropsWithChildren<ABCXYZProps>,
): ReactElement => {
  return (
    <>
      {props.children}
    </>
  );
};

export interface ABCXYZProps {
  //
}

ABCXYZ.defaultProps = {
  //
};

ABCXYZ.propTypes = {
  //
};

ABCXYZ.displayName = nameof(ABCXYZ);

export default React.memo(ABCXYZ);
