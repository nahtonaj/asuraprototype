import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { Text, Input, Button, Block, NavBar, theme } from 'galio-framework';
import { Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import { createTodo, deleteTodo } from '../src/graphql/mutations';
import { listTodos } from '../src/graphql/queries';
import { useContext } from 'react';
import { userContext } from './userContext';

const initialState = { name: '', description: '' }


const Home = () => {
  console.log("loading app...")
  const user = useContext(userContext);
  console.log("User: ", user);
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos:', err) }
  }

  async function addTodo() {
    try {
      console.log("adding todo")
      const todo = { ...formState }
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      // setTodos([...todos, todo])
      setFormState(initialState)
      fetchTodos()
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function removeTodo(todo) {
    try {
      console.log("deleting")
      const todoDetails = {
        id: todo.id
      }
      await API.graphql(graphqlOperation(deleteTodo, {input: todoDetails}))
      setTodos(todos.filter(item => item !== todo))
    } catch (err) {
      console.log('error deleting todo', err, todo)
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <View style= {{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* <NavBar title="Slang" style={{ backgroundColor: theme.COLORS.NEUTRAL }}/> */}
      <Block center fluid>
        <Block>
          <Text >Welcome {user.attributes ? user.attributes.email : "null"}!</Text>
        </Block>
        <Input
          onChangeText={val => setInput('name', val)}
          value={formState.name}
          placeholder="Name"
        />
        <Input
          onChangeText={val => setInput('description', val)}
          value={formState.description}
          placeholder="Description"
        />
        <Button onPress={addTodo}>Create Todo</Button>

        <Block>
          {
            todos.map((todo, index) => (
              <View key={todo.id ? todo.id : index}>
                <Block
                card
                >
                  <Text>{todo.name}</Text>
                  <Text>{todo.description}</Text>
                </Block>
                <Button onPress={()=>removeTodo(todo)}>Delete</Button>
              </View>
            ))
          }
        </Block>

        <Button bottom onPress={signOut}>Sign Out</Button>
      </Block>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   todo: {  marginBottom: 15 },
//   input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
//   todoName: { fontSize: 18 },

//   separator: {
//     marginVertical: 8,
//     borderBottomColor: '#737373',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
// })

export default Home;
