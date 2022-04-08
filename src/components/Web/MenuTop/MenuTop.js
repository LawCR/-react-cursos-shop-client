import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { getMenuApi } from '../../../api/menu'
import './MenuTop.scss'
import logo from '../../../assets/img/png/Logo3.png'
import { SocialLinks } from '../SocialLinks'

export const MenuTop = () => {
    // Cargaremos en este estado los menus activos
    const [menuData, setMenuData] = useState([])
    // Efecto para cargar en menuData los menus activos
    useEffect(() => {
        getMenuApi()
            .then(response => {
                const arrayMenu = []
                response.menu.forEach(item => {
                    item.active && arrayMenu.push(item)
                });
                setMenuData(arrayMenu)
            })
        
    }, [])
    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo" key="logo">
                <Link to={"/"}>
                    <img src={logo} alt="logo" />
                </Link>
            </Menu.Item>
            {
                menuData.map(item => {
                    // Para los menu con url externo
                    const external = item.url.indexOf("http") > -1 ? true : false
                    if (external) {
                        return (
                            <Menu.Item key={item._id} className="menu-top-web__item">
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    {item.title}
                                </a>
                            </Menu.Item>
                        )
                    }

                    // Para los menu con url interno
                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <Link to={item.url}>{item.title}</Link>
                        </Menu.Item>
                    )
                })
            }
    
            <SocialLinks />
            
             
            
            
        </Menu>
    )
}
