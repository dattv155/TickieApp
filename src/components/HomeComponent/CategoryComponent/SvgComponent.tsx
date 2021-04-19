import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.094 16.32l5 5.005a.626.626 0 01-.025.864l-.875.876a.624.624 0 01-.888 0l-5-5.006a3.26 3.26 0 01-.375-.45l-.937-1.252a8.743 8.743 0 01-5.463 1.915 8.752 8.752 0 01-8.559-6.803 8.764 8.764 0 014.744-9.857 8.743 8.743 0 0110.648 2.465 8.769 8.769 0 01-.058 10.94l1.25.864c.195.125.376.272.538.438zM3.28 9.51a6.254 6.254 0 006.25 6.258c1.658 0 3.248-.66 4.42-1.833a6.262 6.262 0 001.83-4.425 6.254 6.254 0 00-6.25-6.257 6.254 6.254 0 00-6.25 6.257z"
        fill="#000"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
