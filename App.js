import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect, useCallback} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import db from './firebase';

const chatsRef = db.collection('chats')


export default function App() {
  const [user, setUser] = useState(null);
  const [name,setName] = useState('');
  const [messages,setMessages]= useState([])

  

  useEffect(() =>{
    readUser()
    const unsubscribe =chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
      .docChanges()
      .filter(({type}) => type === 'added')
      .map(({doc}) => {
      const message =doc.data()
      return{...message,createdAt: message.createdAt.toDate()}
    }).sort ((a,b) => b.createdAt.getTime()-a.createdAt.getTime())
    AppendMessages(messagesFirestore)
      
    })
  },[])

  const AppendMessages= useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages,messages))
  }, [])

  async function readUser(){
    const user = await AsyncStorage.getItem('user');
    if(user) {
      setUser(JSON.parse(user))
    }
  }
  async function handlePress(){
    const _id = Math.random().toString(36).substring(7);
    const user = {_id,name}
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

    if(!user){
      return (
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="What is your name?" value={name} onChangeText={setName}/>
          <Button onPress={handlePress} title="Enter the chat"/>
        </View>
      )
    }
  return <GiftedChat messages ={messages} user={user} onSend={handleSend}/>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
  input: {
    padding: 15,
    height: 50,
    width: '100%',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: 'gray'
  }
});
