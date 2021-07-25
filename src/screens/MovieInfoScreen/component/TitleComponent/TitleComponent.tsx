import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './TitleComponent.scss';
import {View, Text, TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import {useTranslation} from 'react-i18next/';
/**
 * File: TitleComponent.tsx
 * @created 2021-03-24 14:43:42
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<TitleComponentProps>>}
 */
const TitleComponent: FC<PropsWithChildren<TitleComponentProps>> = (
  props: PropsWithChildren<TitleComponentProps>,
): ReactElement => {
  const {title, isReviewArea, hideShowMore} = props;

  const [translate] = useTranslation();

  const handleGotoDetailTitle = React.useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      {!isReviewArea ? (
        <>
          {!!title && (
            <Text style={[atomicStyles.h4, atomicStyles.bold, styles.title]}>
              {title}
            </Text>
          )}

          {!hideShowMore && (
            <TouchableOpacity onPress={handleGotoDetailTitle}>
              <Text
                style={[
                  atomicStyles.h6,
                  atomicStyles.bold,
                  atomicStyles.textBlue,
                  {fontWeight: '100'},
                ]}>
                {translate('movie.more')}
              </Text>
            </TouchableOpacity>
          )}
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
  hideShowMore?: boolean;
}

TitleComponent.defaultProps = {
  //
};

TitleComponent.propTypes = {
  //
};

TitleComponent.displayName = nameof(TitleComponent);

export default React.memo(TitleComponent);
