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
  const {actor} = props;
  return (
    <>
      <View style={styles.actorArea}>
        <Image
          source={{uri: actor.ActorImage}}
          resizeMode="cover"
          style={styles.imageView}
        />
        <View style={styles.textArea}>
          <Text style={[atomicStyles.h7, styles.actorName]}>{actor.Name}</Text>
          <Text style={[atomicStyles.h7, styles.actorRole]}>
            {actor.CharactorName}
          </Text>
        </View>
      </View>
    </>
  );
};

export interface ActorComponentProps extends SvgProps {
  //
  actor?: any;
}

ActorComponent.defaultProps = {
  //
};

ActorComponent.propTypes = {
  //
};

ActorComponent.displayName = nameof(ActorComponent);

export default React.memo(ActorComponent);
