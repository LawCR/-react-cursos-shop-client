import React, { useEffect, useState } from 'react'
import { getAccessTokenApi } from '../../../api/auth'
import { getUsersActiveApi } from '../../../api/user'
import { ListUsers } from '../../../components/Admin/Users/ListUsers'
import "./Users.scss"

export const Users = () => {
    // Estados arrays de users activos e inactivos donde se almacenaran los users
    const [usersActive, setUsersActive] = useState([])
    const [usersInactive, setUsersInactive] = useState([])
    // Estado para refrescar la pagina al cambiar los datos de los usuarios (updateUsers)
    const [reloadUsers, setReloadUsers] = useState(false)
    // Obtenemos nuestro accessToken
    const token = getAccessTokenApi()
    // Creamos un useEffect para el fetch de users y que solo se ejecute denuevo si cambia el token
    useEffect(() => {
        getUsersActiveApi(token, true)
            .then(response => {
                setUsersActive(response.users)
            })
        getUsersActiveApi(token, false)
            .then(response => {
                setUsersInactive(response.users)
            })
        // Al cambiar los datos del usuario cambiara el estado de reloadUsers a true por lo que hara el efecto denuevo recargando los datos
        setReloadUsers(false)
    }, [token, reloadUsers])
    // Le enviamos al componente ListUsers los datos de usuarios activos e inactivos
    return (
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
        </div>
    )
}
