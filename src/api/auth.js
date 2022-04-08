import { ACCESS_TOKEN, REFRESH_TOKEN } from "../helpers/constants";
import { urlBase } from "./config";
import jwt_decode from "jwt-decode";

// Devover el accessToken siempre y cuando sea valido sino devuelve un null
export const getAccessTokenApi = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if (!accessToken || accessToken === "null") {
        return null
    }
    return willExpireToken(accessToken) ? null : accessToken
}
// Devover el refreshToken siempre y cuando sea valido sino devuelve un null
export const getRefreshTokenApi = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if (!refreshToken || refreshToken === "null") {
        return null
    }
    return willExpireToken(refreshToken) ? null : refreshToken
}

// Refresca el access token con el refresh Token a menos que haya expirado el refresh Token
export const refreshAccessTokenApi = (refreshToken) => {
    const url = `${urlBase}/refresh-access-token`
    const bodyObj = {
        refreshToken: refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                return null
            }
            return response.json()
        })
        .then(result => {
            if (!result) {
                // Desloguear usuario por que ha expirado el refresh Token
                logout()
            } else {
                // Refresca el access token con el refresh Token
                const {accessToken, refreshToken} = result
                localStorage.setItem(ACCESS_TOKEN, accessToken)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
            }
        })
}

// Desloguear al usuario removiendo los TOKENS
export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

// Funcion para saber si ha expirado un token, devuelve true si ha expirado y false si no
const willExpireToken = (token) => {
    const seconds = 60
    const metaToken = jwt_decode(token)
    const { exp } = metaToken
    const now = (Date.now() + seconds) / 1000
    return now > exp
}