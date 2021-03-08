declare module 'react-native-svg-types' {
  import {SvgProps} from 'react-native-svg';
  import {PropsWithChildren, ReactElement} from 'react';
  export type SvgFunction = (
    props?: SvgProps,
  ) => ReactElement<PropsWithChildren<SvgProps>>;
}
