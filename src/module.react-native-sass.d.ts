declare module '*.scss' {
  import {StyleProp} from 'react-native';

  declare const styles: Record<string, StyleProp<any>>;

  export default styles;
}
