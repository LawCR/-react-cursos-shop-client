import {urlBase} from './config'

// Endpoint de obtener cursos
export const getCourseApi = () => {
    const url = `${urlBase}/get-courses`
    return fetch(url)
        .then( response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch(err => {
            return err
        })
}

// Endpoint para obtener curso de udemy
export const getCourseDataUdemyApi = (id) => {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`
    const url = baseUrl + coursesParams
    return fetch(url)
        .then( async response => {
            return {code: response.status, data: await response.json()}
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para eliminar curso
export const deleteCourseApi = (token, id) => {
    const url = `${urlBase}/delete-course/${id}`
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
        .then(result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para agregar curso
export const addCourseApi = (token, course) => {
    const url = `${urlBase}/add-course`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(course)
    }

    return fetch(url, params)
        .then( response => {
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch( err => {
            return err
        })
}

// Endpoint para editar curso
export const updateCourseApi = (token, id, data) => {
    const url = `${urlBase}/update-course/${id}`
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
        .then(result => {
            return result
        })
        .catch( err => {
            return err
        })
}