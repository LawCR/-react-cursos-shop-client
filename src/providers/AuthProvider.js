import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { getAccessTokenApi, getRefreshTokenApi, logout, refreshAccessTokenApi } from '../api/auth'

export const AuthContext = createContext()

//Nuestro AuthProvider que proveera a todas las rutas del estado global user
export const AuthProvider = (props) => {
    const { children } = props
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    })

    useEffect(() => {
        checkUserLogin(setUser)
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

//Esta funcion se va a ejecutar en todas las rutas de manera global
const checkUserLogin = (setUser) => {
    const accessToken = getAccessTokenApi()
    // Si ha caducado refrescara el accessToken
    if (!accessToken) {
        const refreshToken = getRefreshTokenApi()
        //Si ha expirado el refreshToken entonces eliminara todo lo relacion en el localStorage y dejara de cargar
        if (!refreshToken) {
            logout()
            setUser({
                user: null,
                isLoading: false
            })
        }else {
            refreshAccessTokenApi(refreshToken)
        }
    }else {
        // Si se cumple correctamente el estado se vuelve el user con el accessTOKEN decodificado Y termina de cargar
        setUser({
            isLoading: false,
            user: jwt_decode(accessToken)
        })
    }
}