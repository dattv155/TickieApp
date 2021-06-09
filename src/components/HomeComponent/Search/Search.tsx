import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Search.scss';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from '../../../styles';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Animated,
  Easing,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {MovieInfo} from 'src/models/MovieInfo';
import {convertTimestamp} from 'src/helpers/timestamp-helper';
import MovieInfoScreen from 'src/screens/MovieInfoScreen/MovieInfoScreen';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

/**
 * File: Search.tsx
 * @created 2021-04-04 23:23:39
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<SearchProps>>}
 */
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const HEADER_WIDTH = SLIDER_WIDTH * 0.75;
const SEARCH_WIDTH = SLIDER_WIDTH * 0.8;
const VIEW_HEIGHT = SLIDER_HEIGHT * 0.85;
const Search: FC<PropsWithChildren<SearchProps>> = (
  props: PropsWithChildren<SearchProps>,
): ReactElement => {
  const {list, display, handleClick} = props;

  const navigation = useNavigation();

  const [translate] = useTranslation();

  const headerWidth: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(HEADER_WIDTH),
  ).current;
  const searchWidth: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;
  const {current: viewHeight} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const [input, setInput] = React.useState<string>('');

  function Open() {
    if (display === 'flex') {
      setTimeout(handleClick, 500);
    } else {
      handleClick();
    }
    Animated.timing(headerWidth, {
      toValue:
        Number.parseInt(JSON.stringify(headerWidth), 10) === 0
          ? HEADER_WIDTH
          : 0,
      duration: 500,
      useNativeDriver: false,
      // easing: Easing.out(Easing.linear)
    }).start();
    Animated.timing(searchWidth, {
      toValue:
        Number.parseInt(JSON.stringify(searchWidth), 10) === 0
          ? SEARCH_WIDTH
          : 0,
      duration: 500,
      useNativeDriver: false,
      // easing: Easing.out(Easing.linear)
    }).start();
    Animated.timing(viewHeight, {
      toValue:
        Number.parseInt(JSON.stringify(searchWidth), 10) === 0
          ? VIEW_HEIGHT
          : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {});
  }

  const handleGotoMovieScreen = React.useCallback(
    (movieInfo: MovieInfo) => {
      navigation.navigate(MovieInfoScreen.displayName, {
        movieInfo,
      });
    },
    [navigation],
  );

  const renderMovie: ListRenderItem<MovieInfo> = React.useCallback(
    ({item, index}: ListRenderItemInfo<MovieInfo>) => {
      return (
        <View style={[styles.viewItem]} key={index}>
          <Pressable onPress={() => handleGotoMovieScreen(item)}>
            <Image
              style={{
                width: 157,
                height: 233,
                borderRadius: 22,
              }}
              source={{
                uri: item.Poster,
              }}
            />
            <Text
              style={[
                atomicStyles.h6,
                atomicStyles.textDark,
                atomicStyles.mt8px,
              ]}>
              {item.Name}
            </Text>
            <Text
              style={[
                atomicStyles.h7,
                atomicStyles.textDark,
                atomicStyles.textGray,
              ]}>
              {convertTimestamp(item.Release.seconds)}
            </Text>
          </Pressable>
        </View>
      );
    },
    [handleGotoMovieScreen],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Animated.View
          style={[styles.release, {width: headerWidth, overflow: 'hidden'}]}>
          <Text
            style={[atomicStyles.h1, atomicStyles.textBlue, styles.textStyle]}>
            {translate('home.firstTitle')}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.viewAnimated,
            {
              width: searchWidth,
            },
          ]}>
          <TextInput
            style={[styles.textInput, atomicStyles.h5]}
            placeholder="Search"
            placeholderTextColor="black"
            onChangeText={(e: string) => setInput(e)}
          />
        </Animated.View>

        <TouchableOpacity onPress={Open} style={styles.box}>
          <SvgIcon component={require('/assets/icons/FindIcon.svg')} />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.viewAnimated2,
          {
            height: viewHeight,
          },
        ]}>
        <FlatList
          data={list.filter((item: MovieInfo) => {
            if (input === '') {
              return item;
            }
            if (item.Name.toLowerCase().includes(input.toLowerCase())) {
              return item;
            }
          })}
          renderItem={renderMovie}
          keyExtractor={(item) => item.Name.toString()}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export interface SearchProps {
  //
  list?: readonly any[];

  display?: string;

  handleClick?: () => void;
}

Search.defaultProps = {
  //
};

Search.propTypes = {
  //
};

Search.displayName = nameof(Search);

export default React.memo(Search);
