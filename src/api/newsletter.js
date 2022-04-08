import {urlBase} from './config'

export const suscribeNewsletterApi = (email) => {
    const url = `${urlBase}/suscribe-newsletter/${email.toLowerCase()}`
    const params = {
        method: "POST"
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch( err => {
            return err
        })

}