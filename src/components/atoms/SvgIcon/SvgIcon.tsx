import React, {FC, PropsWithChildren, ReactElement, ReactNode} from 'react';
import nameof from 'ts-nameof.macro';
import './SvgIcon.scss';
import {SvgComponent} from 'react-native-svg-types';
import PropTypes from 'prop-types';
import {SvgProps} from 'react-native-svg';
import {modifyPathColor} from 'src/components/atoms/SvgIcon/functions/modify-path-colors';

/**
 * File: SvgIcon.tsx
 * @created 2021-03-10 09:17:13
 * @author TrongDatVu <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<SvgIconProps>>}
 */
const SvgIcon: FC<PropsWithChildren<SvgIconProps>> = (
  props: PropsWithChildren<SvgIconProps>,
): ReactElement => {
  const {component, fill, stroke, solid, ...svgProps} = props;

  const element: ReactElement<PropsWithChildren<SvgProps>> = component.default(
    svgProps,
  );

  const {children} = element.props;

  const childs: ReactNode[] = React.useMemo(
    () =>
      React.Children.toArray(children).map((child: ReactNode) => {
        return modifyPathColor(child, solid, {
          fill,
          stroke,
        });
      }),
    [children, fill, stroke, solid],
  );

  return React.cloneElement(element, svgProps, childs);
};

export interface SvgIconProps extends SvgProps {
  component: {
    default: SvgComponent;
  };

  solid?: boolean;

  fill?: string;

  stroke?: string;
}

SvgIcon.defaultProps = {
  solid: false,
  fill: null,
  stroke: null,
};

SvgIcon.propTypes = {
  solid: PropTypes.bool,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

SvgIcon.displayName = nameof(SvgIcon);

export default React.memo(SvgIcon);
