import {createContext,useState} from 'react'
// const [authStatus,setAuthStatus]=useState(false)
export const AuthContext=createContext<{
    authStatus:boolean,
    setAuthStatus:(status:boolean)=>void,
}>
({
    authStatus:false,
    setAuthStatus:()=>{}
})

export const AuthProvider=AuthContext.Provider;

export default AuthContext;