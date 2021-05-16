import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TitleComponent.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';

/**
 * File: TitleComponent.tsx
 * @created 2021-03-24 14:43:42
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<TitleComponentProps>>}
 */
const TitleComponent: FC<PropsWithChildren<TitleComponentProps>> = (
  props: PropsWithChildren<TitleComponentProps>,
): ReactElement => {
  const {title, isReviewArea} = props;

  const handleGotoDetailTitle = React.useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      {!isReviewArea ? (
        <>
          <Text style={[atomicStyles.h4, atomicStyles.bold, styles.title]}>
            {title}
          </Text>
          <TouchableOpacity onPress={handleGotoDetailTitle}>
            <Text style={[atomicStyles.bold, styles.more]}>Xem thêm</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.reviewTitleView}>
            <View>
              <Text style={[atomicStyles.h4, atomicStyles.bold, styles.title]}>
                {title}
              </Text>
  
            </View>

          </View>

        </>
      )}
    </View>
  );
};

export interface TitleComponentProps {
  //
  title?: string;
  isReviewArea?: boolean;
  rate?: number;
  numOfReview?: number;
  handleDisplay?: () => void;
}

TitleComponent.defaultProps = {
  //
};

TitleComponent.propTypes = {
  //
};

TitleComponent.displayName = nameof(TitleComponent);

export default React.memo(TitleComponent);
