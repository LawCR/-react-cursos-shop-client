import React, { useEffect, useState } from 'react'
import { getMenuApi } from '../../../api/menu'
import { MenuWebList } from '../../../components/Admin/MenuWeb/MenuWebList'

// Componente padre de menus
export const MenuWeb = () => {
    // Estado para almacenar los menus
    const [menu, setMenu] = useState([])
    // Estado para recargar los menus cuando le cambiemos el estado a reloadMenuWeb
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false)
    
    useEffect(() => {
        getMenuApi()
            .then(response => {
                setMenu(response.menu)
            })
            setReloadMenuWeb(false)
    }, [reloadMenuWeb])

    return (
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    )
}
