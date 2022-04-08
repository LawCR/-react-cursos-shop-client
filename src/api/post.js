import {urlBase} from './config'

// Endpoint para obtener los post paginados
export const getPostsApi = (limit, page) => {
    const url = `${urlBase}/get-posts?limit=${limit}&page=${page}`
    return fetch(url)
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para eliminar el post
export const deletePostApi = (token, id) => {
    const url = `${urlBase}/delete-post/${id}`
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para crear un post
export const addPostApi = (token, post) => {
    const url = `${urlBase}/add-post`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(post)
    }

    return fetch(url, params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para actualizar los post
export const updatePostApi = (token, id, data) => {
    const url = `${urlBase}/update-post/${id}`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para obtener un post por url
export const getPostApi = (urlPost) => {
    const url = `${urlBase}/get-post/${urlPost}`
    return fetch(url)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}