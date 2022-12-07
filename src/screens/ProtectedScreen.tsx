import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {

  const {user,token,logOut} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>



      <Button 
        title='Logout'
        color='#5656d6'
        onPress={logOut}
      />

      <Text>{token}</Text>


    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:20,
    marginBottom:20
  }
})