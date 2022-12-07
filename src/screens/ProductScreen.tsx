import { AppRegistry, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProductsStackParams } from '../navigation/ProductsNavigation'
import {Picker} from '@react-native-picker/picker';
import { useCategories } from '../hooks/UseCategories';
import { useForm } from '../hooks/UseForm';
import { ProductsContext } from '../context/ProductsContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'>{}

const ProductScreen = ({navigation,route}:Props) => {

    const {loadProductById,updateProduct,addProduct,uploadImage} = useContext(ProductsContext)
    const {name='',id=''} = route.params

    const [tempUri, setTempUri] = useState<string>();

    const {isLoading,categories} = useCategories()

    const {_id,categoriaId,nombre,img,form,onChange,setFormValue} = useForm({
        _id:id,
        categoriaId:'',
        nombre:name,
        img:''
    })

    useEffect(()=>{
        if(Object.keys(route.params).length === 0){
            navigation.setOptions({
                title:nombre || 'Nuevo Producto' 
            })
        }
    },[nombre])

    useEffect(()=>{
        loadProduct()
    },[])

    const loadProduct  = async ()=>{
        if(_id.length=== 0)return
        const product =  await loadProductById(_id)
        setFormValue({
            _id,
            categoriaId:product.categoria._id,
            img:product.img || '',
            nombre
        })
    }


    const saveOrUpdate = async() =>{
        if(_id.length>0){
            updateProduct(categoriaId,nombre,id)
          
        }else{
           
            const tempCategoriaId = categoriaId || categories[0]._id
            const newProduct = await addProduct(tempCategoriaId,nombre)
            onChange(newProduct._id,'_id')
        }
    }


    const taskPhoto = async()=>{
       const resp = await launchCamera({
            mediaType:'photo',
            quality:0.5
        })  

        if(resp.didCancel) return
        if(!resp.assets![0].uri) return
        const {uri,fileName : name,type} = resp.assets![0]
        setTempUri(uri)
        uploadImage(uri,name!,type!,_id)
      
    }

    const taskPhotoGallery = async()=>{
        const resp = await launchImageLibrary({
             mediaType:'photo',
             quality:0.5
         })  
 
         if(resp.didCancel) return
         if(!resp.assets![0].uri) return
         const {uri,fileName : name,type} = resp.assets![0]
         setTempUri(uri)
         uploadImage(uri,name!,type!,_id)
       
     }

  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.label}>Nombre del producto:</Text>
            <TextInput 
                placeholder='Producto'
                style={styles.textInput}
                value={nombre}
                onChangeText={(text)=>{
                    onChange(text,'nombre')
                }}
            />


            <Text style={styles.label}>Categoria:</Text>

            <Picker
                selectedValue={categoriaId}
                onValueChange={(value) => onChange(value,'categoriaId')
                }>

                {
                    categories.map((c)=>{
                        return(
                            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
                        )
                    })
                }
                
             
            </Picker>

            
            <Button 
                title='Guardar'
                onPress={()=>{ saveOrUpdate()}}
                color='#5856d6'


               
            />

            {_id.length>0&& !tempUri &&
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                <Button 
                    title='Camara'
                    onPress={taskPhoto}
                    color='#5856d6'
                />

                <View style={{width:10}} />

                <Button 
                    title='Galeria'
                    onPress={taskPhotoGallery}
                    color='#5856d6'
                />
            </View>
            }
            {img.length >0 &&
            
            
            <Image style={{
                width:'100%',
                height:300,
                marginTop:20
            }} source={{uri:img}} />
            }

        {tempUri&&    
            <Image style={{
                width:'100%',
                height:300,
                marginTop:20
            }} source={{uri:tempUri}} />
            }
        </ScrollView>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        marginTop:10
    },
    label:{
        fontSize:18
    },
    textInput:{
        borderWidth:1,
        marginBottom:15,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:20,
        borderColor:'rgba(0,0,0,0.2)',
        marginTop:5,
        height:45
    }
})