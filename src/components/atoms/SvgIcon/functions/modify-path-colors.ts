import React, {ReactNode} from 'react';
import {PathProps} from 'react-native-svg';

export function modifyPathColor(
  child: ReactNode,
  solid: boolean,
  props: Pick<PathProps, 'fill' | 'stroke'>,
): ReactNode {
  const {fill, stroke} = props;

  if (React.isValidElement<any>(child)) {
    return React.cloneElement(
      child,
      child?.props?.fill || child?.props?.stroke
        ? {
            fill: solid ? fill : child.props.fill,
            stroke: solid ? stroke : child.props.stroke,
          }
        : {},
      child.props?.children
        ? React.Children.toArray(child.props.children).map((child: ReactNode) =>
            modifyPathColor(child, solid, props),
          )
        : [],
    );
  }
  return null;
}
