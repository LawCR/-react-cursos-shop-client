import {urlBase} from './config'

// Funcion para el registro consumiendo la api sign-up
export const signUpApi = (data) => {
    // url del api para registro creado con node
    const url = `${urlBase}/sign-up`
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            if (result.user) {
                //Cuando cree el usuario exitosamente
                return {
                    ok: true,
                    message: "User created successfully"
                }
            }
            // Mensaje de error en caso no cree el usuario
            return {
                ok: false,
                message: result.message
            }
        }).catch( (err) => {
            // Mensaje de error del servidor
            return {
                ok: false,
                message: err.message
            }
        })
}

// Funcion para el logeo consumiendo la api sign-in
export const signInApi = (data) => {
    const url = `${urlBase}/sign-in`
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(url, params)
            .then(response => {
                return response.json()
            }).then(result => {
                return result;
            })
            .catch(err => {
                return err.message
            })
    
}

// Funcion para obtener usuarios - solo usuarios logeados pueden usarla
export const getUsersApi = (token) => {
    const url = `${urlBase}/users`
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
            .then(response => {
                return response.json()
            })
            .then(result => {
                return result
            })
            .catch(err => {
                return err.message
            })
}

// Funcion para obtener usuarios activos o inactivos - solo usuarios logeados pueden usarla
export const getUsersActiveApi = (token, status) => {
    const url = `${urlBase}/users-active?active=${status}`
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
            .then(response => {
                return response.json()
            })
            .then(result => {
                return result
            })
            .catch(err => {
                return err.message
            })
}

// funcion para subir nuestro avatar
export const uploadAvatarApi = (token, avatar, userId) => {
    const url = `${urlBase}/upload-avatar/${userId}`
    // Obligatorio cuando queremos mandar una imagen mediante una peticion Fetch
    const formData = new FormData()
    formData.append("avatar",avatar, avatar.name)
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }
    return fetch(url,params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message 
        })
}

// Funcion para obtener el avatar
export const getAvatarApi = (avatarName) => {
    const url = `${urlBase}/get-avatar/${avatarName}`
    return fetch(url)
        .then(response => {
            return response.url
        })
        .catch(err => {
            return err.message
        })
}

// Funcion para actualizar los datos de usuario
export const updateUserApi = (token, user, userId) => {
    const url = `${urlBase}/update-user/${userId}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }
    return fetch(url,params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message
        })
}

// Funcion para activar o desactivar el usuario, recibe el token, id, y true o false si se quiere activar o desactivar
export const activateUserApi = (token, userId, status) => {
    const url = `${urlBase}/activate-user/${userId}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            active: status
        })
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch( err => {
            return err.message
        })
}

// Funcion para eliminar el usuario, recibe token y id
export const deleteUserApi = (token, userId) => {
    const url = `${urlBase}/delete-user/${userId}`
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    }
    return fetch( url, params )
        .then( response =>{
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch ( err => {
            return err.message
        })
}

// Funcion para crear usuario desde el admin
export const signUpAdminApi = (token, data) => {
    const url = `${urlBase}/sign-up-admin`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result.message
        })
        .catch( err => {
            return err.message
        })
}