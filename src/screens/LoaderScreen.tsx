import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoaderScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator 
            size={50}
            color={'black'}
        />
    </View>
  )
}

export default LoaderScreen

const styles = StyleSheet.create({})