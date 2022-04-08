import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, UserOutlined, MenuOutlined, BookOutlined, MessageOutlined } from '@ant-design/icons';
import './MenuSider.scss'
export const MenuSider = (props) => {
    const { menuCollapsed } = props
    // Extraeremos el path de location para tener la seleccion de menu por defecto
    const location = useLocation()
    const { Sider } = Layout
    return (
        <Sider className="admin-sider" collapsed={menuCollapsed} >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <UserOutlined />
                        <span className="nav-text">Users</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/menu">
                    <Link to={"/admin/menu"}>
                        <MenuOutlined />
                        <span className="nav-text">Menu</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/courses">
                    <Link to={"/admin/courses"}>
                        <BookOutlined />
                        <span className="nav-text">Courses</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/blog">
                    <Link to={"/admin/blog"}>
                        <MessageOutlined />
                        <span className="nav-text">Blog</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

