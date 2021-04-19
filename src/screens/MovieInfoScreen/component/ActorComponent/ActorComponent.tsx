import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ActorComponent.scss';
import {Image, View, Text} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {SvgComponent} from 'react-native-svg-types';
import {atomicStyles} from 'src/styles';

/**
 * File: ActorComponent.tsx
 * @created 2021-03-24 16:39:39
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ActorComponentProps>>}
 */
const ActorComponent: FC<PropsWithChildren<ActorComponentProps>> = (
  props: PropsWithChildren<ActorComponentProps>,
): ReactElement => {
  // const {src} = props;
  return (
    <>
      <View style={styles.actorArea}>
        <Image
          source={require('assets/images/mulan-poster.png')}
          resizeMode="cover"
          style={styles.imageView}
        />
        <View style={styles.textArea}>
          <Text style={[atomicStyles.h7, styles.actorName]}>Lưu Diệp Phi</Text>
          <Text style={[atomicStyles.h7, styles.actorRole]}>Mộc Lan</Text>
        </View>
      </View>
    </>
  );
};

export interface ActorComponentProps extends SvgProps {
  //
  // src?: string;
}

ActorComponent.defaultProps = {
  //
};

ActorComponent.propTypes = {
  //
};

ActorComponent.displayName = nameof(ActorComponent);

export default React.memo(ActorComponent);
