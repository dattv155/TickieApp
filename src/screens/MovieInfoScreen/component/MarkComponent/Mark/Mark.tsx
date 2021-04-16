import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={53}
      height={54}
      viewBox="0 0 53 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={53} height={54} rx={11} fill="#F2F2F2" />
      <Path
        d="M32.667 34.5a.833.833 0 01-1.275.708l-4.95-3.1a.833.833 0 00-.884 0l-4.95 3.1a.834.834 0 01-1.275-.708V20.333c0-.92.747-1.666 1.667-1.666h10c.92 0 1.667.746 1.667 1.666V34.5z"
        fill="#0E52E1"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
