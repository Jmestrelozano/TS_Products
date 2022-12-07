import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { loginThemes } from '../themes/loginThemes'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/UseForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'

interface RegisterScreenProps  extends NativeStackScreenProps<any,any>{}

export const RegisterScreen = ({navigation}:RegisterScreenProps) => {

  const {singUp,errorMessage,removeError} = useContext(AuthContext)
  const {name,email,password,onChange} = useForm({
    name:'',
    email:'',
    password:''
  })


  const onRegister = () => {
    singUp({correo:email,nombre:name,password})
    Keyboard.dismiss()
  }

  useEffect(()=>{
    if(errorMessage.length === 0)return;
  
    Alert.alert('Login incorrecto',errorMessage,[{
      text:'Ok',
      onPress:()=>removeError()
    }]);
  },[errorMessage])

  return (
    <>
     
      
      <KeyboardAvoidingView
        style={{flex:1,backgroundColor:'#5856d6'}}
      >
        <View style={loginThemes.formContainer}>

        
          <WhiteLogo />

          <Text style={loginThemes.title}>Register</Text>

          <Text style={loginThemes.label}>Name:</Text>
          <TextInput 
            placeholder='Ingrese su nombre'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType='default'
            underlineColorAndroid={'white'}
            style={loginThemes.inputField}
            selectionColor='white'
            autoCapitalize='words'
            onChangeText={(text)=> onChange(text,'name')}
            value={name}
            autoCorrect={false}
          />

          <Text style={loginThemes.label}>Email:</Text>
          <TextInput 
            placeholder='Ingrese su email'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType='email-address'
            underlineColorAndroid={'white'}
            style={loginThemes.inputField}
            selectionColor='white'
            autoCapitalize='none'
            onChangeText={(text)=> onChange(text,'email')}
            value={email}
            autoCorrect={false}
          />


          <Text style={loginThemes.label}>Password:</Text>
          <TextInput 
            placeholder='*****'
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={loginThemes.inputField}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text)=> onChange(text,'password')}
            value={password}
            secureTextEntry={true}

          />

          <View style={loginThemes.btnContainer}>
            <TouchableOpacity onPress={onRegister} style={loginThemes.btn}>
              <Text style={loginThemes.btnText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>


          <View style={loginThemes.newUserContainer}>
            <TouchableOpacity onPress={()=>navigation.replace('Login')} >
              <Text style={loginThemes.btnText}>Regresar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({})