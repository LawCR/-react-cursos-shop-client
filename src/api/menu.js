import {urlBase} from './config'

// Funcion para obtener menus
export const getMenuApi = () => {
    const url = `${urlBase}/get-menus`
    return fetch(url)
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

// Funcion para actualizar el menu
export const updateMenuApi = (token, menuId, data) => {
    const url = `${urlBase}/update-menu/${menuId}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url,params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch( err => {
            return err.message
        })
}

// Funcion para activar o desactivar el menu
export const activateMenuApi = (token, menuId, status) => {
    const url = `${urlBase}/activate-menu/${menuId}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({active: status})
    }
    return fetch(url,params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch( err => {
            console.log(err);
        })
}

// Funcion para crear nuevos menu
export const addMenuApi = (token, menu) => {
    const url = `${urlBase}/add-menu`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(menu)
    }

    return fetch(url,params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch( err => {
            console.log(err);
        })


}

// Funcion para eliminar el menu
export const deleteMenuApi = (token, menuId) => {
    const url = `${urlBase}/delete-menu/${menuId}`
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }
    return fetch(url,params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result.message
        })
        .catch( err => {
            return err.message
        })
}