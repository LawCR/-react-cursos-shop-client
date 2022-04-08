import React, { useEffect, useState } from 'react'
import {Switch, List, Button, Modal as ModalAntd, notification} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable'
import { Modal } from '../../../Modal';
import './MenuWebList.scss'
import { getAccessTokenApi } from '../../../../api/auth';
import { activateMenuApi, deleteMenuApi, updateMenuApi } from '../../../../api/menu';
import { AddMenuWebForm } from '../AddMenuWebForm';
import { EditMenuWebForm } from '../EditMenuWebForm';
const { confirm } = ModalAntd

// Componente de MenuWeb
export const MenuWebList = (props) => {
    // Recibe los datos de menu y el setState de recarga de menu
    const {menu, setReloadMenuWeb} = props
    // Estado para almacenar la lista de menus
    const [listItems, setListItems] = useState([])
    // Estado para hacer visible o no el modal
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    // Estados para titulo y contenido del Modal
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)

    //Efecto para cargar en listItems los componentes MenuItem de cada menu
    useEffect(() => {
        const listItemsArray = []
        menu.forEach(item => {
            listItemsArray.push({
                content: (<MenuItem item={item} activateMenu={activateMenu} editMenuWebModal={editMenuWebModal} showDeleteConfirm={showDeleteConfirm} />)
            })
        });
        setListItems(listItemsArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    // Funcion para el Switch de activar o desactivar menu
    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi()
        activateMenuApi(accessToken, menu._id, status)
            .then(response => {
                notification["success"]({
                    message: response
                })
            })
    }

    // Funcion para cada vez que hagamos un Drag
    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi()
        sortedList.forEach(item => {
            // obtenemos el id de cada item menu
            const { _id } = item.content.props.item
            // obtenemos el orden de cada item menu
            const order = item.rank
            // actualizamos el menu ingresandole el nuevo orden
            updateMenuApi(accessToken, _id, {order})
        })
    }

    // Funcion para abrir modal del agregar menu
    const addMenuWebModal = () => {
        setIsVisibleModal(true)
        setModalTitle("Creating new menu")
        setModalContent( 
            <AddMenuWebForm 
                setIsVisibleModal = {setIsVisibleModal}
                setReloadMenuWeb = {setReloadMenuWeb}
            />
         )
    }

    // Funcion para abrir modal del editar menu
    const editMenuWebModal = (menu) => {
        setIsVisibleModal(true)
        setModalTitle(`Editing menu: ${menu.title}`)
        setModalContent(
            <EditMenuWebForm 
                setIsVisibleModal = {setIsVisibleModal}
                setReloadMenuWeb = {setReloadMenuWeb}
                menu = {menu}
            />
        )
    }

    // Funcion para abrir modal de confirm delete
    const showDeleteConfirm = (menu) => {
        const accessToken = getAccessTokenApi()
        confirm({
            title: "Removing menu",
            content: `Are you sure you want to remove ${menu.title}?`,
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteMenuApi(accessToken, menu._id)
                    .then(response => {
                        notification["success"]({message: response})
                        setReloadMenuWeb(true)
                    })
                    .catch( err => {
                        notification["error"]({message: err})
                    })
            }
        })
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal} >
                    Create Menu
                </Button> 
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical"  />
            </div>
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

const MenuItem = (props) => {
    const {item, activateMenu, editMenuWebModal, showDeleteConfirm} = props
    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                <Button type="primary" onClick={() => editMenuWebModal(item)}>
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClick={() => showDeleteConfirm(item)}>
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}
