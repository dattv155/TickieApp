import * as React from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent';
import axios from 'axios';
// import createAPI from 'unsplash-js';
import {Component} from 'react';
import UnsplashAPI from '../../unsplashAPI/UnsplashAPI';

// const unsplash = createAPI({
//   accessKey: 'wX5GDO5tIWMhloIrT7T8RcYt7-AXbhAFunuWCgtxIHM',
//   // `fetch` options to be sent with every request
// });
//
// function getUnpslash() {
//   return unsplash.photos.get({photoId: 'foo'}).then((result) => {
//     switch (result.type) {
//       case 'error':
//         // eslint-disable-next-line no-console
//         console.log('error occurred: ', result.errors[0]);
//       case 'success':
//         const photo = result.response;
//         // eslint-disable-next-line no-console
//         console.log(photo);
//     }
//   });
// }

function getAxios() {
  return axios({
    method: 'GET',
    url: 'https://source.unsplash.com/random?sig=1/&flower',
    data: null,
  }).then((response) => {
    // eslint-disable-next-line no-console
    return (
      <View>
        <Image style={styles.tinyLogo} source={response} />
      </View>
    );
  });
}

export default class HomePage extends Component<any, any> {
  // getUnpslash();

  render() {
    return (
      <SafeAreaView>
        <CategoryComponent />
        <UnsplashAPI />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 100,
  },
});
