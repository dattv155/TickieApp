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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 18.666h10c.92 0 1.667.747 1.667 1.667V34.5a.833.833 0 01-1.275.708l-4.95-3.1a.833.833 0 00-.884 0l-4.95 3.1a.833.833 0 01-1.275-.708V20.333c0-.92.747-1.666 1.667-1.666zm10 14.326V20.333H21v12.659l3.675-2.292a2.5 2.5 0 012.65 0L31 32.992z"
        fill="#828282"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
