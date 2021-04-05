import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
import nameof from 'ts-nameof.macro';
import styles from'./Search.scss';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {atomicStyles} from '../../../styles';
import { SafeAreaView, Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Animated, Easing } from 'react-native';

/**
 * File: Search.tsx
 * @created 2021-04-04 23:23:39
 * @author Huy-No1 <71492647+Huy-No1@users.noreply.github.com>
 * @type {FC<PropsWithChildren<SearchProps>>}
 */
const Search: FC<PropsWithChildren<SearchProps>> = (
  props: PropsWithChildren<SearchProps>,
): ReactElement => {
  

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
  const [list, setList] = useState(props.list);
const [headerWidth, setHeaderWidth]= useState(new Animated.Value(200));
const [searchWidth, setSearchWidth]= useState(new Animated.Value(0));
const [viewHeight, setViewHeight]= useState(new Animated.Value(0));
const [input, setInput]= useState("");
async function Open() {
  if(props.display == 'flex')
    setTimeout(()=> props.handleClick(), 500);
  else
    await props.handleClick();
    Animated.timing(
        headerWidth,
        {
            toValue: headerWidth._value == 200 ? 0: 200,
            duration: 500,
            useNativeDriver: false,
            // easing: Easing.out(Easing.linear)
        }
    ).start();
    Animated.timing(
      searchWidth,
      {
          toValue: searchWidth._value == 0 ? 370: 0,
          duration: 500,
          useNativeDriver: false,
          // easing: Easing.out(Easing.linear)
      }
    ).start();
    Animated.timing(
      viewHeight,
      {
          toValue: viewHeight._value == 0? 680: 0,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear

      }
    ).start(() =>{

    });
    
};
  return (
<SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
            <Animated.View style={{width: headerWidth, overflow: 'hidden'}}>
              <Text style={[atomicStyles.regular,styles.header]}>Mới phát hành</Text>  
            </Animated.View>
        
            <Animated.View style={{width: searchWidth, padding: 0, position: 'absolute', right: 0, overflow: 'hidden'}}>
                    <TextInput style={styles.textInput}
                        placeholder="Search"
                        placeholderTextColor="black"
                        onChangeText={(e: string) => setInput(e)}/>
            </Animated.View>
         
            <TouchableOpacity onPress={Open} style={styles.box}>
              <SvgIcon component={require('../../../../assets/icons/FindIcon.svg')} />
            </TouchableOpacity>
        </View>
         
        <Animated.View style={{
                width: '100%',
                height: viewHeight,
                overflow: 'hidden',
                paddingTop: 10,
                paddingLeft: 10
        }}>
        <FlatList
        data={list.filter(item => {
            if(input == "")
                return item;
            else {
                if(item.name.toLowerCase().includes(input.toLowerCase()))
                  return item;
            }
        })}
        renderItem={({item}) => (
          <View
            style={{alignItems: 'center', marginRight: SLIDER_WIDTH * 0.051, marginBottom: 10}}>
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
            <Text
              style={[atomicStyles.regular,styles.text1]}>
              {item.name}
            </Text>
            <Text
              style={[atomicStyles.regular,styles.text2]}>
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
}

Search.defaultProps = {
  //
};

Search.propTypes = {
  //
};

Search.displayName = nameof(Search);

export default React.memo(Search);
