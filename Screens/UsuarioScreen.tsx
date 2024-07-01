import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/Config';
import { ref, set, onValue} from "firebase/database";

export default function UsuarioScreen() {
const [cedula, setcedula] = useState("")
const [nombre, setnombre] = useState("")
const [correo, setcorreo] = useState("")
const [descripcion, setdescripcion] = useState("")

const [usuarios, setusuarios] = useState([])
//Guardar información
function guardarUsuario(cedula: string, nombre: string, correo: string, descripcion: string) {

    set(ref(db, 'users/' + cedula), {
      username: nombre,
      email: correo,
      description: descripcion
    });
    Alert.alert("Mensaje", "Información guardada")
    setcedula("")
    setnombre("")
    setcorreo("")
    setdescripcion("")
  }

  //Leer los datos
  useEffect(() => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data)

      const datatemp: any = Object.keys(data).map((keys)=>({
        keys, ...data[keys]    
    }))
        //console.log(datatemp),
        setusuarios(datatemp)
    });
  }, [])
 
  type Usuario={
    username: string
  }

  return (
    <View style={styles.container} >
      <Text style={styles.txt}>Usuarios</Text>
      <TextInput style={styles.input}
      placeholder='Ingresar cédula'
      onChangeText={(texto)=> setcedula(texto)}
      keyboardType='numeric'
      value={cedula}
      />
      <TextInput style={styles.input}
      placeholder='Ingresar nombre'
      onChangeText={(texto)=> setnombre(texto)}
      value={nombre}
      />
      <TextInput style={styles.input}
      placeholder='Ingresar correo'
      onChangeText={(texto)=> setcorreo(texto)}
      keyboardType='email-address'
      value={correo}
      />
      <TextInput style={styles.input}
      placeholder='Ingresar descripción'
      onChangeText={(texto)=> setdescripcion(texto)}
      multiline
      value={descripcion}
      />
      <Button title='Guardar'
      onPress={()=> guardarUsuario(cedula, nombre, correo, descripcion)}
      />

      <FlatList
      data= {usuarios}
      renderItem={({item}: {item: Usuario})=>
    <View>
      <Text>{item.username}</Text>
      </View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#9010c7',
        alignItems: "center",
        justifyContent: "center"
    },
    input:{
        height: 50,
        width: "70%",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 20,
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
        margin: 10
    },
    txt:{
        fontSize: 30
    },
})