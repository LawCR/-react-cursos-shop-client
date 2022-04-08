import React, { useState } from 'react'
import { Switch, List, Button  } from 'antd'
import { Modal } from '../../../Modal';
import { EditUserForm } from '../EditUserForm';

import { UserActive, UserInactive } from '../UserActive/UserActive';
import './ListUsers.scss'
import { AddUserForm } from '../AddUserForm';

// Componente Padre de la page Users
export const ListUsers = (props) => {
    // Recibimos de la page Users los datos de usuarios activos e inactivos
    const {usersActive, usersInactive, setReloadUsers} = props
    // Estado que usaremos en el Switch para mostrar los usuarios activos o inactivos (true o false)
    const [viewUsersActive, setViewUsersActive] = useState(true)
    // Estado que usaremos para abrir o cerrar el Modal (true o false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    // Estado para el titulo del Modal
    const [modalTitle, setModalTitle] = useState("")
    // Estado para el contenido del Modal
    const [modalContent, setModalContent] = useState(null)
    
    // Funcion de modal form para crear usuario
    const addUserModal = () => {
        setIsVisibleModal(true)
        setModalTitle("Registering new user")
        setModalContent( <AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}  /> )
    }
    return (
        <div className="list-users">
            <div className="list-users__header">

                <div className="list-users__header-switch">
                    <Switch 
                        defaultChecked
                        onChange={()=> setViewUsersActive(!viewUsersActive)}
                    />
                    <span>
                        {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
                    </span>
                </div>
                <Button type="primary" onClick={addUserModal} >
                    New User
                </Button>
            </div>
            
            {viewUsersActive 
                // A los componentes de usuarios le mandamos los sets de estado para puedan modificarlos
                ? <ListUsersActive 
                        usersActive={usersActive} 
                        setIsVisibleModal={setIsVisibleModal} 
                        setModalTitle= {setModalTitle}
                        setModalContent = {setModalContent}
                        setReloadUsers = {setReloadUsers}
                    /> 
                : <ListUsersInactive 
                        usersInactive={usersInactive} 
                        setIsVisibleModal={setIsVisibleModal} 
                        setReloadUsers= {setReloadUsers}
                    />}
            {/* A el Modal le mandamos los estados para que los muestre */}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

// Componente de ListUsers : lista de usuarios activos
const ListUsersActive = (props) => {
    /* Recibimos del componente ListUsers:
        usersActive: Para recibir los datos de los usuarios activos
        setIsVisibleModal: Para abrir o cerrar el modal (true o false)
        setModalTitle: Para cambiar el titulo dinamicamente
        setModalContent: Para mandarle un componente(EditUserForm) como children dentro del modal con los datos de usuario
    */
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } = props

    // Modal de editar que carga los datos del usuario enviado por parametro
    const editUser = (user) => {
        setIsVisibleModal(true)
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname? user.lastname : "..."}`)
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />)
    }
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            //le mandanmos los usersActive para data para que los itere como objetos user
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} /> }
        />
    )
}

// Componente de ListUsers : lista de usuarios inactivos
const ListUsersInactive = (props) => {
    const {usersInactive, setReloadUsers} = props
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} />}
        />
    )
}

