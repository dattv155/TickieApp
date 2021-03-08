import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './TodoItem.scss';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default class TodoItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {todo, onDelete} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button}>
          <Text style={styles.buttonText}>{todo.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <IonIcons
            style={styles.closeButton}
            name={'close-circle-outline'}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
