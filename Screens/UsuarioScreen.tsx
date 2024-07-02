import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/Config';
import { ref, set, onValue, update, remove} from "firebase/database";
import Tarjeta from '../components/Tarjeta';

export default function UsuarioScreen() {
const [cedula, setcedula] = useState("")
const [nombre, setnombre] = useState("")
const [correo, setcorreo] = useState("")
const [descripcion, setdescripcion] = useState("")
const [edicion, setedicion] = useState(false)

const [usuarios, setusuarios] = useState([])
//Guardar información
 function guardarUsuario(cedula: string, nombre: string, correo: string, descripcion: string) {
  if(edicion){
    editar();
  } else{

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
    setedicion(false)
  }
  }
//------------------EDITAR_---------------
  function editar(){
    update (ref(db, 'users/' + cedula), {
      username: nombre,
      email: correo,
      description: descripcion
    });
    setcedula("")
    setnombre("")
    setcorreo("")
    setdescripcion("")
    setedicion(false)
    Alert.alert("Mensaje", "Editado exitosamente")
  }
  //------------------EDITAR2--------------
  function editar2(item: any){
    setedicion(true)
    setcedula(item.keys)
    setnombre(item.username)
    setcorreo(item.email)
    setdescripcion(item.description)
  }
//------------------Eliminar
  function eliminar(id: string){
    remove (ref(db, 'users/' + id)); 
    Alert.alert("Mensaje", "Información eliminada exitosamente")
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
    keys: string
    description: string
    email: string
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
       <Button title={edicion ? 'Editar' : 'Guardar'} onPress={()=> guardarUsuario(cedula, nombre, correo, descripcion)}
      />
      
      <FlatList 
       data= {usuarios}
       renderItem={({item}: {item: Usuario})=>
    <View>
      <Tarjeta usuario = {item}/>
        <View style={styles.buttons}>
      <Button title='Editar' color={'green'} onPress={()=> editar2(item)}/>
      <Button title='Borrar' color={'red'} onPress={()=> eliminar(item.keys)}/>
        </View>
    </View>}
       />

      <StatusBar 
      backgroundColor={'#F4A261'}/>
    </View>
  )
}

      /*
      <Text>{item.username}</Text>
      <Text>{item.keys}</Text>
      <Text>{item.description}</Text>
      <Text>{item.email}</Text>
        <View style={styles.buttons}>
      <Button title='Editar' color={'green'} onPress={()=> editar(item.keys)}/>
      <Button title='Borrar' color={'red'} onPress={()=> eliminar(item.keys)}/>
        </View>*/
const styles = StyleSheet.create({
    container:{
        flex:2,
        backgroundColor: '#948e48',
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
    flatlist:{
      alignSelf: 'center',
      padding: 15,
      flex: 1,
      justifyContent: 'flex-end'
    },
    buttons:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
})