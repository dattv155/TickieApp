import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

/**
 * File: CategoryComponentSkeleton.tsx
 * @created 2021-05-16 02:28:44
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<CategoryComponentSkeletonProps>>}
 */
const CategoryComponentSkeleton: FC<
  PropsWithChildren<CategoryComponentSkeletonProps>
> = (
  props: PropsWithChildren<CategoryComponentSkeletonProps>,
): ReactElement => {
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const SLIDER_HEIGHT = Dimensions.get('window').height;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.672);
  const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

  return (
    <SkeletonPlaceholder>
      <View
        style={{
          height: 336,
          width: 252,
          borderRadius: 39,
        }}
      />
    </SkeletonPlaceholder>
  );
};

export interface CategoryComponentSkeletonProps {
  //
}

CategoryComponentSkeleton.defaultProps = {
  //
};

CategoryComponentSkeleton.propTypes = {
  //
};

CategoryComponentSkeleton.displayName = nameof(CategoryComponentSkeleton);

export default React.memo(CategoryComponentSkeleton);
