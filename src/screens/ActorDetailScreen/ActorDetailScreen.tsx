import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ActorDetailScreen.scss';
import {StackScreenProps} from '@react-navigation/stack';
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import firestore from '@react-native-firebase/firestore';
import {atomicStyles} from 'src/styles';
import TitleComponent from 'src/screens/MovieInfoScreen/component/TitleComponent/TitleComponent';
import LinearGradient from 'react-native-linear-gradient';

/**
 * File: ActorDetailScreen.tsx
 * @created 2021-05-16 21:51:57
 * @author TrongDat <trongdat1505@gmail.com>
 * @type {FC<PropsWithChildren<ActorDetailScreenProps>>}
 */

export interface Actor {
  actorID: number;
  name: string;
  birthday: string;
  country: string;
  roles: string;
  description: string;
  images: string[];
}

const ActorDetailScreen: FC<PropsWithChildren<ActorDetailScreenProps>> = (
  props: PropsWithChildren<ActorDetailScreenProps>,
): ReactElement => {
  const {navigation, route} = props;

  const {actorID} = route?.params;

  const handleGetData = React.useCallback(async () => {
    return firestore()
      .collection('actors')
      .where('actorID', '==', actorID)
      .get()
      .then((documentData) => {
        return documentData.docs.map((item) => item.data());
      });
  }, [actorID]);

  const [actor, setActor] = React.useState<Actor>(null);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const actorInfo = (await handleGetData()) as Actor[];
      const result = actorInfo[0];
      setActor(result);
    });
  }, [handleGetData, navigation]);

  const renderListImage: ListRenderItem<any> = React.useCallback(
    ({item}: ListRenderItemInfo<any>) => {
      return (
        <Image
          source={{
            uri: item,
          }}
          resizeMode="cover"
          style={styles.imageFilmItem}
        />
      );
    },
    [],
  );

  return (
    <DefaultLayout
      navigation={navigation}
      route={route}
      left="back-button"
      // right={<HeaderIconPlaceholder />}
      gradient={false}
      customHeader={false}
      bgWhite={true}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.containerView}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        <View>
          {actor && (
            <View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#2c2c2c', '#000000']}
                style={styles.darkerLayer}
              />
              <Image
                source={{
                  uri: actor.images[0],
                }}
                resizeMode="cover"
                style={styles.posterView}
              />
            </View>
          )}

          <View style={[styles.infoArea]}>
            <View style={styles.infoHeader}>
              <View style={styles.infoLeft}>
                <Text
                  style={[
                    atomicStyles.bold,
                    atomicStyles.h1,
                    atomicStyles.textBlue,
                    styles.title,
                  ]}>
                  {actor?.name}
                </Text>
                <Text style={[atomicStyles.text, styles.roles]}>
                  {actor?.roles}
                </Text>
              </View>
              <View style={styles.infoRight}>
                <Text
                  style={[
                    atomicStyles.h6,
                    atomicStyles.textBlue,
                    atomicStyles.bold,
                  ]}>
                  Sinh ngày:{' '}
                  <Text style={[atomicStyles.text]}>{actor?.birthday}</Text>
                </Text>
                <Text
                  style={[
                    atomicStyles.h6,
                    atomicStyles.textBlue,
                    atomicStyles.bold,
                    styles.textCountry,
                  ]}>
                  Quốc tịch:{' '}
                  <Text style={[atomicStyles.text]}>{actor?.country}</Text>
                </Text>
              </View>
            </View>

            <Text
              style={[atomicStyles.text, atomicStyles.h6, styles.description]}>
              {actor?.description}
            </Text>
            <View style={styles.actorView}>
              <TitleComponent title={'Hình ảnh'} hideShowMore={true} />
              <FlatList
                data={actor?.images}
                renderItem={renderListImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => '+' + item.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export interface ActorDetailScreenProps extends StackScreenProps<any> {
  //
}

ActorDetailScreen.defaultProps = {
  //
};

ActorDetailScreen.propTypes = {
  //
};

ActorDetailScreen.displayName = nameof(ActorDetailScreen);

export default ActorDetailScreen;
