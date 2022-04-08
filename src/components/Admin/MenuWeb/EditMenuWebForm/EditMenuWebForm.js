import React, { useEffect, useState } from 'react'
import {Form, Input, Button, notification} from 'antd'
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import './EditMenuWebForm.scss'
export const EditMenuWebForm = (props) => {
    const {setIsVisibleModal, setReloadMenuWeb, menu} = props
    const [menuWebData, setMenuWebData] = useState(menu)

    useEffect(() => {
        setMenuWebData(menu)
    }, [menu])
    
    //Funcion para editar el menu del modal
    const editMenu = e => {
        e.preventDefault()
        if (!menuWebData.title || !menuWebData.url) {
            notification["error"]({
                message: "All fields are required"
            })
        } else {
            const accessToken = getAccessTokenApi()
            updateMenuApi(accessToken, menuWebData._id, menuWebData)
                .then( response => {
                    notification["success"]({
                        message: response
                    })
                    setIsVisibleModal(false)
                    setReloadMenuWeb(true)
                })
                .catch( () => {
                    notification["error"]({
                        message: "Server error, try again later"
                    })
                })
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu = {editMenu}
            />
        </div>
    )
}

// Componente form de EditMenuWebForm
const EditForm = (props) => {
    const {menuWebData, setMenuWebData, editMenu} = props
    return (
        <Form className="form-edit" onSubmitCapture={editMenu} >
            <Form.Item>
                <Input 
                    prefix={ <FontSizeOutlined /> }
                    placeholder = "Titulo"
                    value = {menuWebData.title}
                    onChange = {e => setMenuWebData({...menuWebData, title: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={ <LinkOutlined /> }
                    placeholder = "URL"
                    value = {menuWebData.url}
                    onChange = {e => setMenuWebData({...menuWebData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Update Menu
                </Button>
            </Form.Item>
        </Form>
    )
}