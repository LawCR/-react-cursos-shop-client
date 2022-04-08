import React, { useCallback, useEffect, useState } from 'react'
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import { getAvatarApi, updateUserApi, uploadAvatarApi } from '../../../../api/user';
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import "./EditUserForm.scss"
import { getAccessTokenApi } from '../../../../api/auth';

// Componente Padre modal del form para editar usuario
export const EditUserForm = (props) => {
    // Recibimos la data del usuario de props
    const {user, setIsVisibleModal, setReloadUsers} = props
    // Estado que guarda la informacion del avatar
    const [avatar, setAvatar] = useState(null)
    // Destructuramos el user en userData
    const [userData, setUserData] = useState({})
    //Efecto para cargar los datos de usuario (user) en userData
    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            password: "",
            repeatPassword: ""
        })
    }, [user])

    // Efecto para obtener el avatar si es que el usuario tiene un avatar en la bd
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

    // Creamos un efecto para que almacene el avatar solo cuando cambie el avatar y si existe un avatar
    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar])

    //Nuestra función para actualizar usuario
    const updateUser = (e) => {
        e.preventDefault()
        const token = getAccessTokenApi()
        let userUpdate = userData
        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification['error']({
                    message: "Passwords do not match"
                })
                return
            } else {
                delete userUpdate.repeatPassword 
            }
        }
        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification['error']({
                message: "The name, last name and email are required"
            })
            return
        }
        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user.id)
                .then(response => {
                    userUpdate.avatar = response.avatarName
                    updateUserApi(token, userUpdate, user._id)
                        .then(result => {
                            notification['success']({
                                message: result.message
                            })
                            setIsVisibleModal(false)
                            setReloadUsers(true)
                        })
                })
        } else {
            updateUserApi(token, userUpdate, user._id)
                .then(result => {
                    notification['success']({
                        message: result.message
                    })
                    setIsVisibleModal(false)
                    setReloadUsers(true)
                })
        }   
    }

    // Componente general del modal de editar usuario
    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}

// Componente para subir tu avatar dentro del modal
const UploadAvatar = (props) => {
    const {avatar, setAvatar} = props
    // Estado y efecto para obtener el preview del avatar
    const [avatarUrl, setAvatarUrl] = useState(null)
    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview)
            } else {
                setAvatarUrl(avatar)
            }
        } else {
            setAvatarUrl(null)
        }
    }, [avatar])
    
    
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0]
            setAvatar({ file, preview: URL.createObjectURL(file) })
        },
        [setAvatar]
    )

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive 
                ? ( <Avatar size={150} src={NoAvatar} /> )
                : ( <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar}/>)
            }
        </div>
    )
}

// Componente del form de editar usuario del modal
const EditForm = (props) => {
    // Recimos el userData, el setUserData y updateUser del componente EditUserForm
    const { userData, setUserData, updateUser} = props
    const { Option } = Select
    return (
        // Es un form de 2 columnas (12) por fila (24)
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        {/* En el onChange se modificara el dato de cada imput */}
                        <Input 
                            prefix={ <UserOutlined /> }
                            placeholder="Name"
                            value= {userData.name}
                            onChange= {e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <UserOutlined /> }
                            placeholder="Lastname"
                            value= {userData.lastname}
                            onChange= {e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <MailOutlined /> }
                            placeholder="Email ID"
                            value= {userData.email}
                            onChange= {e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select 
                            placeholder="Select a user role"
                            onChange={ e => setUserData({...userData, role: e})}
                            value={userData.role}
                        >
                            <Option value="admin">Administrator</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviewer">Reviewer</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix= {<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            value= {userData.password}
                            onChange={ e => setUserData({...userData, password:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix= {<LockOutlined />}
                            type="password"
                            placeholder="Confirm password"
                            value= {userData.repeatPassword}
                            onChange={ e => setUserData({...userData, repeatPassword:e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Update user
                </Button>
            </Form.Item>
        </Form>
    )
}