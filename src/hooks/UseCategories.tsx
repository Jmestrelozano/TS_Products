import { useEffect, useState } from "react"
import cafeApi from "../api/cafeApi"
import { Categoria, CategoriasResponse } from "../interface/appInterface"

export const useCategories = () => {

    const  [isLoading,setIsLoading] = useState(true)
    const  [categories,setCategories] = useState<Categoria[]>([])
    
    useEffect(()=>{
        getCategories()
    },[])


    const getCategories = async() =>{
        const resp = await cafeApi.get<CategoriasResponse>('/categorias')
        setCategories(resp.data.categorias)
        setIsLoading(false)
    }

    return {
        isLoading,
        categories
    }
}
