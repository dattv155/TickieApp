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
} from 'react-native';

/**
 * File: Search.tsx
 * @created 2021-04-04 23:23:39
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<SearchProps>>}
 */
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const HEADER_WIDTH = SLIDER_WIDTH * 0.55;
const SEARCH_WIDTH = SLIDER_WIDTH * 0.9;
const VIEW_HEIGHT = SLIDER_HEIGHT * 0.77;
const Search: FC<PropsWithChildren<SearchProps>> = (
  props: PropsWithChildren<SearchProps>,
): ReactElement => {
  const {list, display, handleClick} = props;

  const headerWidth: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(HEADER_WIDTH),
  ).current;
  const searchWidth: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;
  const viewHeight: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  const [input, setInput] = React.useState<string>('');

  function Open() {
    if (display === 'flex') {
      setTimeout(handleClick, 500);
    } else {
      handleClick();
    }
    Animated.timing(headerWidth, {
      toValue: headerWidth._value === 0 ? HEADER_WIDTH : 0,
      duration: 500,
      useNativeDriver: false,
      // easing: Easing.out(Easing.linear)
    }).start();
    Animated.timing(searchWidth, {
      toValue: searchWidth._value === 0?  SEARCH_WIDTH: 0,
      duration: 500,
      useNativeDriver: false,
      // easing: Easing.out(Easing.linear)
    }).start();
    Animated.timing(viewHeight, {
      toValue: viewHeight._value === 0 ? VIEW_HEIGHT : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {});
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Animated.View style={{width: headerWidth, overflow: 'hidden'}}>
          <Text style={[atomicStyles.regular, styles.header]}>
            Mới phát hành
          </Text>
        </Animated.View>

        <Animated.View
          style={[styles.viewanimated,{
            width: searchWidth,
          }]}>
          <TextInput
            style={styles.textInput}
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
        style={[styles.viewanimated2,{
          height: viewHeight,
        }]}>
        <FlatList
          data={list.filter((item) => {
            if (input === '') {
              return item;
            } else {
              if (item.name.toLowerCase().includes(input.toLowerCase())) {
                return item;
              }
            }
          })}
          renderItem={({item}) => (
            <View
              style={[styles.viewitem, {
                marginRight: SLIDER_WIDTH * 0.051,
              }]}>
              <Image
                style={{
                  width: SLIDER_WIDTH * 0.4,
                  height: SLIDER_HEIGHT * 0.32,
                  borderRadius: 22,
                }}
                source={{
                  uri: item.img,
                }}
              />
              <Text style={[atomicStyles.bold, styles.text1]}>
                {item.name}
              </Text>
              <Text style={[atomicStyles.regular, styles.text2]}>
                {item.release}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
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
