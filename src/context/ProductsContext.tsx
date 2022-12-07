import { createContext, useEffect, useState } from "react";
import React from 'react';
import { Producto, Productos } from "../interface/appInterface";
import cafeApi from "../api/cafeApi";
import { ImagePickerResponse } from "react-native-image-picker";

 type ProductsContextProps = {
     products:Producto[],
     loadProducts: () => Promise<void>,
     addProduct:  (categoryId:string, productName:string) => Promise<Producto>,
     updateProduct:  (categoryId:string, productName:string,productId:string) => Promise<void>,
     deleteProduct:  (id:string) => Promise<void>,
     loadProductById: (id:string) => Promise<Producto>,
     uploadImage: (uri:string,name:string,type:string,id:string) => Promise<void>
}



export const ProductsContext = createContext({} as ProductsContextProps)


export const ProductsProvider = ({children}:any) =>{

    const  [products, setProducts] = useState<Producto[]>([])

    useEffect(()=>{
        loadProducts()
    },[])

    const loadProducts = async () =>{
        const resp = await cafeApi.get<Productos>('/productos?limite=50')

        setProducts([ ...resp.data.productos])
      
    }

    const addProduct = async (categoryId:string,productName:string):Promise<Producto> => {

      
            
            const resp = await cafeApi.post<Producto>('/productos',{
                nombre:productName,
                categoria: categoryId
            })

            setProducts([...products,resp.data])

            return resp.data

       
    }
    
    const updateProduct = async (categoryId:string,productName:string,productId:string) => {
        try {
            
            const resp = await cafeApi.post<Producto>(`/productos/${productId}`,{
                nombre:productName,
                categoria: categoryId
            })

            setProducts(products.map((product)=>{
                return product._id === productId ? resp.data : product
            }))

        }catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id:string)=>{

    }

    const loadProductById = async (id:string):Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`productos/${id}`)

        return resp.data

    }

    const uploadImage = async (uri:string,name:string,type:string,id:string) => {

       
        const fileUpdateUpload ={
            uri,
            type,
            name
        }
        

        const formData = new FormData()

        formData.append('archivo',fileUpdateUpload)

     
        try {
            const resp = await cafeApi.put(`/uploads/productos/${id}`,formData,{
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest:()=>{
                    return formData
                }
            })

           
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage
        }}>
            {children}
        </ProductsContext.Provider>
    )
}