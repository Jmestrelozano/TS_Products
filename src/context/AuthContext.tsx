import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";
import cafeApi from "../api/cafeApi";
import { LoginData, LoginResponse, RegisterData, Usuario } from "../interface/appInterface";
import { authReducer, AuthState } from "./authReducer";

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    singUp: ( registerData: RegisterData) => void,
    singIn: (loginData: LoginData) => void,
    logOut: () => void,
    removeError: () => void,
}


const initialState: AuthState = {
    status:'checking',
    token:null,
    user:null,
    errorMessage:''
}
export const AuthContext = createContext({} as AuthContextProps)


export const AuthProvider = ({children}:any)=>{

const [state, dispatch] = useReducer(authReducer, initialState)    



useEffect(()=>{
   checkToken()
},[])

const checkToken = async() =>{

    const token = await  AsyncStorage.getItem('Token')

    if(!token) return dispatch({type:'notAuthenticated'})

    const resp = await cafeApi.get('/auth')

    if(resp.status !== 200){
        return dispatch({type:'notAuthenticated'})
    }

    await AsyncStorage.setItem('Token',resp.data.token)

    dispatch({type:'signUp',payload:{
        token:resp.data.token,
        user:resp.data.usuario
    }})
}

const singIn  = async({correo,password}:LoginData) => {

    try {
        const resp = await cafeApi.post<LoginResponse>('/auth/login',{
            correo, password
        })
        dispatch({type:'signUp',payload:{
            token:resp.data.token,
            user:resp.data.usuario
        }})

        //Guarda el token en el AsyncStorage
        await AsyncStorage.setItem('Token',resp.data.token)

        console.log(resp.data)
    } catch (error:any) {
        dispatch({
            type:'addError',
            payload:error.response.data.msg || 'Informacion incorrecta'
        })
        console.log(error.response.data.msg)
    }
}

const  singUp = async({nombre,correo,password}:RegisterData) => {
    try {
        console.log(nombre,correo,password)
        const resp = await cafeApi.post<LoginResponse>('/usuarios',{
            correo,
            password,
            nombre,
        })
        dispatch({type:'signUp',payload:{
            token:resp.data.token,
            user:resp.data.usuario
        }})

         //Guarda el token en el AsyncStorage
         await AsyncStorage.setItem('Token',resp.data.token)

      console.log(resp)
    } catch (error:any) {
        dispatch({
            type:'addError',
            payload:error.response.data.errors[0].msg || 'Revise la informacion'
        })
        console.log(error.response.data.msg)
    }
}

const logOut = async() => {
      await AsyncStorage.removeItem('Token')
      dispatch({type:'logout'})
  
}

const removeError = () => {
    dispatch({type:'removeError'})

}

    return(
        <AuthContext.Provider value={{
        ...state,
        singUp,
        singIn,
        logOut,
        removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}