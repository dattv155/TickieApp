import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './TodoPage.scss';
import TodoItem from './components/TodoItem';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'todos';

export default class TodoPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [
        {id: 1, name: 'Lam Test'},
        {id: 2, name: 'Di cho'},
        {id: 3, name: 'Lam viec tiep'},
      ],
      // todos: async () => {
      //   try {
      //     const jsonValue = await AsyncStorage.getItem(storageKey);
      //     return jsonValue != null ? JSON.parse(jsonValue) : null;
      //   } catch (e) {}
      // },
      inputValue: '',
      countId: 0,
    };
    this.onDeleteAll = this.onDeleteAll.bind(this);
    this.onAdding = this.onAdding.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
  }

  onAdding() {
    console.log(this.state.todos);
    const countID = this.state.todos.length + 1;
    var inputText = this.state.inputValue;
    if (!inputText || inputText === '') {
      return;
    }
    this.setState({
      todos: [
        {
          id: countID,
          name: inputText,
        },
        ...this.state.todos,
      ],
      inputValue: '',
    });
    // this.onUpdate();
  }

  onDeleteAll() {
    this.setState({
      todos: [],
    });
    // this.onUpdate();
  }

  onDeleteItem(todo) {
    return (event) => {
      const {todos} = this.state;
      const index = todos.indexOf(todo);
      let remove = todos.splice(index, 1);
      this.setState({
        todos: todos,
      });
      // this.onUpdate();
    };
  }

  // onUpdate() {
  //   console.log('Updating');
  //   async () => {
  //     try {
  //       const jsonValue = JSON.stringify(this.state.todos);
  //       await AsyncStorage.setItem(storageKey, jsonValue);
  //     } catch (e) {}
  //   };
  // }

  render() {
    const {todos} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <TextInput
            placeholder="Enter Some Text here"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyle}
            onChangeText={(text) =>
              this.setState({
                inputValue: text,
              })
            }
            value={this.state.inputValue}
          />
          <TouchableOpacity onPress={this.onAdding}>
            <IonIcons
              style={styles.applyButton}
              name={'caret-down-outline'}
              size={30}
            />
          </TouchableOpacity>
        </View>

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={this.onDeleteItem(todo)}
          />
        ))}
      </View>
    );
  }
}
