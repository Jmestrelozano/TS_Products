import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const WhiteLogo = () => {
  return (
    <View style={{alignItems:'center'}}>
      <Image style={{
          width:110,
          height:100
      }}  source={require('../assets/logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({})