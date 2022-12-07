import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from 'react'
import ProductScreen from "../screens/ProductScreen"
import ProductsScreen from "../screens/ProductsScreen"

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: {id?: string, name?: string}
}

const Stack = createNativeStackNavigator<ProductsStackParams>()

export const ProductsNavigation = () => {

    return(
    <Stack.Navigator screenOptions={{
        headerTitleAlign:'center',
        contentStyle:{backgroundColor:'white'},
        headerShadowVisible:false
    }}>
        <Stack.Screen name='ProductsScreen' component={ProductsScreen} options={{title:'Productos'}} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
    )
}