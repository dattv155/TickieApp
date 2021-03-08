import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Button.scss';

export default () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text>Testing SCSS</Text>
      </View>
    </TouchableOpacity>
  );
};
