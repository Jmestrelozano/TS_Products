import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Navigation } from './src/navigation/Navigation'
import { AuthProvider } from './src/context/AuthContext'
import { ProductsProvider } from './src/context/ProductsContext'

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductsProvider>
          <Navigation />
        </ProductsProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})