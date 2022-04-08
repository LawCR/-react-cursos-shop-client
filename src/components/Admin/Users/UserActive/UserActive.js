import React, { useEffect, useState } from 'react'
import { List, Avatar, Button, notification, Modal as ModalAntd } from 'antd'
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import { activateUserApi, deleteUserApi, getAvatarApi } from '../../../../api/user'
import { getAccessTokenApi } from '../../../../api/auth';

const { confirm } = ModalAntd
// Funcion para abrir el modal de confirm para eliminar usuario
const showDeleteConfirm = (user, setReloadUsers) => {
    const accessToken = getAccessTokenApi()

    confirm({
        title: "Removing user",
        content: `Are you sure you want to remove ${user.email}?`,
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk() {
            deleteUserApi(accessToken, user._id)
                .then( response => {
                    notification["success"]({message: response})
                    setReloadUsers(true)
                })
                .catch( err => {
                    notification["error"]({message: err})
                })
        }
    })
}

// Componente de los usuarios activos
export const UserActive = (props) => {
    const { user, editUser, setReloadUsers } = props
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response)
                })
        } else {
            setAvatar(null)
        }
    }, [user])

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi()
        activateUserApi(accessToken, user._id, false)
            .then( response => {
                notification['success']({
                    message: response
                })
                setReloadUsers(true)
            })
            .catch( err => {
                notification['error']({
                    message: err
                })
            })
    }

    return (
        <List.Item
            // actions son los botones de la lista con su evento onClick
            actions={[
                <Button 
                    type="primary"
                    onClick={() => editUser(user)}
                >
                    <EditOutlined />
                </Button>,
                <Button
                    type="danger"
                    onClick={desactivateUser}
                >
                    <StopOutlined />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => showDeleteConfirm(user, setReloadUsers)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta 
                // El Meta son los datos de la lista (avatar,titulo:nombre,description)
                avatar={ <Avatar src={avatar ? avatar : NoAvatar} /> }
                title={`
                    ${user.name ? user.name : '...'}
                    ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email}
            />
        </List.Item>
    )
}

// Componente de los usuarios inactivos
export const UserInactive = (props) => {
    const { user, setReloadUsers } = props
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response)
                })
        } else {
            setAvatar(null)
        }
    }, [user])

    const activateUser = () => {
        const accessToken = getAccessTokenApi()
        activateUserApi(accessToken, user._id, true)
            .then( response => {
                notification['success']({
                    message: response
                })
                setReloadUsers(true)
            })
            .catch( err => {
                notification['error']({
                    message: err
                })
            })
    }


    return (
        <List.Item
            actions={[
                <Button 
                    type="primary"
                    onClick={activateUser}
                >
                    <CheckOutlined />
                </Button>,
                <Button
                    type="danger"
                    onClick={ () => showDeleteConfirm(user, setReloadUsers)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta 
                avatar={ <Avatar src={avatar ? avatar : NoAvatar} /> }
                title={`
                    ${user.name ? user.name : '...'}
                    ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email}
            />
        </List.Item>
    )
}