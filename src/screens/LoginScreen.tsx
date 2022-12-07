import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginThemes } from '../themes/loginThemes'
import { useForm } from '../hooks/UseForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'

interface LoginScreenProps extends NativeStackScreenProps<any,any>{}

export const LoginScreen = ({navigation}:LoginScreenProps) => {

  const {singIn,errorMessage,removeError} =useContext(AuthContext)

  const {email,password,onChange} = useForm({
    email:'',
    password:''
  })


  const onLogin =( )=>{
    console.log({email,password})
    singIn({correo:email,password})
    Keyboard.dismiss();

    
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
      <Background />
      
      <KeyboardAvoidingView
        style={{flex:1}}
      >
        <View style={loginThemes.formContainer}>

        
          <WhiteLogo />

          <Text style={loginThemes.title}>Login</Text>

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
            <TouchableOpacity onPress={onLogin} style={loginThemes.btn}>
              <Text style={loginThemes.btnText}>Login</Text>
            </TouchableOpacity>
          </View>


          <View style={loginThemes.newUserContainer}>
            <TouchableOpacity onPress={()=>navigation.replace('Register')} >
              <Text style={loginThemes.btnText}>Nueva cuenta </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}

