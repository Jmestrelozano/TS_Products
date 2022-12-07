import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../navigation/ProductsNavigation'
import { Productos } from '../interface/appInterface'

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'>{}
const ProductsScreen = ({navigation}:Props) => {

  const {products,loadProducts} =  useContext(ProductsContext)
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    navigation.setOptions({
        headerRight:(()=>{
            return(
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('ProductScreen',{})
                    }}
                    style={{marginRight:10}}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })
    })
  },[])

  const loadProductsFromBackend = async()=>{
    setRefresh(true);
    await loadProducts()
    setRefresh(false)
  }
  
  return (
    <View style={{flex:1, marginHorizontal:10}}>
      <FlatList 
        data={products} 
        keyExtractor={(item)=> item._id} 
        renderItem={({item})=>{
          return(
              <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('ProductScreen',{
                        id: item._id,
                        name: item.nombre
                    })
                }}
              >
                  <Text style={styles.productName}>{item.nombre}</Text>
              </TouchableOpacity>
          )
      }}
        ItemSeparatorComponent={()=>{
            return(
                <View style={styles.itemSeparator}/>
            )
        }}
        refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refresh}
            onRefresh={loadProductsFromBackend} />

        }
      />
    </View>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productName:{
        fontSize:20,
    },

    itemSeparator:{
        borderBottomWidth:2,
        marginVertical:5,
        borderBottomColor:'rgba(0,0,0,0.1)'
    }
})