declare module 'react-native-svg-types' {
  import {SvgProps} from 'react-native-svg';
  import {FC} from 'react';

  export type SvgComponent = FC<SvgProps>;
}

declare module '*.svg' {
  import {SvgComponent} from 'react-native-svg-types';

  declare const component: SvgComponent;

  export default component;
}
