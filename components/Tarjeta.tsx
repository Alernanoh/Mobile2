import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Tarjeta(props: any) {
    //console.log(props.usuario.email);
  return (
    <View style={styles.container}>
      <Text>{props.usuario.keys}</Text>
      <Text>{props.usuario.username}</Text>
      <Text>{props.usuario.email}</Text>
      <Text>{props.usuario.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#2b95ab',
        margin: 10,
        borderRadius: 15,
        borderWidth: 5,
        padding: 20
    }
})