import React from 'react'
import { Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import Logo from '../../../assets/img/png/Logo3.png'
import './MenuTop.scss'
import { Link } from 'react-router-dom';
import { logout } from '../../../api/auth';

export const MenuTop = (props) => {
    const {menuCollapsed, setMenuCollapsed} = props
    const logoutUser = () => {
        logout()
        window.location.reload()
    }
    return (
        <div className="menu-top">
            <div className="menu-top__left">
            <Link to={"/admin"}>
                <img className="menu-top__left-logo" src={Logo} alt="Logo" />
            </Link>
            </div>
            <div>
                <Button type="link" onClick={ () => setMenuCollapsed(!menuCollapsed) }>
                    {
                        (menuCollapsed)
                        ? <MenuUnfoldOutlined />
                        : <MenuFoldOutlined />
                    }
                </Button>
            </div>
            <div className="menu-top__right"> 
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}
