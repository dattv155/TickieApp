import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import './Search.scss';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Animated } from 'react-native';
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
  const [list, setList] = useState([
    {
      id: 1,
      img:
        'https://ae01.alicdn.com/kf/HTB1Va5mQXXXXXcnXXXXq6xXFXXXV/La-La-Land-Film-Aquarelle-Tissu-jet-d-encre-affiche-20-X13-07.jpg',
      name: 'La La Land',
      release: '12-12-2021',
    },
    {
      id: 2,
      img:
        'https://resizing.flixster.com/JSQhj07oIhsYdTaPu6iZ_ldKJa8=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2RlNzI0MGQyLTQ2ZTktNGMyYi05N2VmLTFjMDhiY2VlMDQ2Ni53ZWJw',
      name: 'Blade Runner 2049',
      release: '12-2-2021',
    },
    {
      id: 3,
      img:
        'https://fcine.net/uploads/monthly_2019_06/2pikachu-_vietnamese_poster.jpg.015075262656d06602221295e8ef16cf.jpg',
      name: 'Detective Pikachu',
      release: '12-02-2022',
    },
    {
      id: 4,
      img:
        'https://i.pinimg.com/originals/a6/6d/93/a66d93b32698ef7d7f6aea369ab4d196.jpg',
      name: 'Demon Slayer',
      release: '12-02-2020',
    },
  ]);
const [headerWidth, setHeaderWidth]= useState(new Animated.Value(200));
const [searchWidth, setSearchWidth]= useState(new Animated.Value(0));
const [viewHeight, setViewHeight]= useState(new Animated.Value(0));
const [input, setInput]= useState("");
const Open = ()=>{
  console.log(headerWidth._value);
    Animated.timing(
        headerWidth,
        {
            toValue: headerWidth._value == 200 ? 0: 200,
            duration: 800,
            useNativeDriver: false
        }
    ).start();
    Animated.timing(
      searchWidth,
      {
          toValue: searchWidth._value == 0 ? 370: 0,
          duration: 800,
          useNativeDriver: false
      }
    ).start();
    Animated.timing(
      viewHeight,
      {
          toValue: viewHeight._value == 0? 700: 0,
          duration: 800,
          useNativeDriver: false
      }
    ).start();
};

  return (
<SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', position: 'relative', paddingVertical: 10, alignItems: 'center'}}>
        
            <Animated.View style={{width: headerWidth, overflow: 'hidden', height: 30}}>
              <Text style={styles.header}>Mới phát hành</Text>  
            </Animated.View>
        
            <Animated.View style={{width: searchWidth, padding: 0, position: 'absolute', right: 0, overflow: 'hidden'}}>
                    <TextInput style={{
                                height: 45,
                                backgroundColor: '#B4BBC6',
                                borderRadius: 50,
                                paddingRight: 50,
                                paddingLeft: 10,
                                
                                
                    }}
                        
                        placeholder="Search"
                        placeholderTextColor="black"
                        onChangeText={(e: string) => setInput(e)}/>
            </Animated.View>
         
            <TouchableOpacity onPress={Open} style={{...styles.box,position: 'absolute', right: 2}}/>


        </View>
         
        <Animated.View style={{
                width: '100%',
                height: viewHeight,
                // backgroundColor: 'dodgerblue',
                overflow: 'hidden',
                padding: 10
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
            style={{alignItems: 'center', marginRight: SLIDER_WIDTH * 0.051}}>
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
              style={[
  
              ]}>
              {item.name}
            </Text>
            <Text
              style={[

              ]}>
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

const styles = StyleSheet.create({
  container: {
      width: '90%',
      marginTop: 50,
      // alignItems: 'center'
  },
  header: {
      textTransform: 'uppercase',
      fontSize: 26,
      // marginRight: 130,
      
  },
  box: {
      width: 40,
      height: 40,
      backgroundColor: 'gray',
      borderRadius: 50
  },
  search: {
      width: '100%',
      height: 40,
      backgroundColor: '#B4BBC6',
      borderRadius: 50,
      paddingLeft: 10,
      color: 'black',
      
  }

});
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
