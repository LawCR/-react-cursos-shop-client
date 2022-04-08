import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { MenuTop } from '../components/Admin/MenuTop'
import { MenuSider } from '../components/Admin/MenuSider'
import { SignIn } from '../pages/Admin/SignIn'
import useAuth from '../hooks/useAuth'
import "./LayoutAdmin.scss"

export const LayoutAdmin = (props) => {
    //Aqui recibimos las rutas que se mandaron al LayoutBasic con el path (/admin)
    const { routes } = props
    // Estado para el colapso del menu
    const [ menuCollapsed, setMenuCollapsed ] = useState(false) 
    // Componentes del Layout del antd
    const { Header, Content, Footer } = Layout
    //Sacamos el user que esta dentro del authContext
    const {user, isLoading} = useAuth()

    // Si no existe usuario y termino de cargar entonces no esta logeado y sera enviado al login
    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={SignIn} />
                <Redirect to="/admin/login" />
            </>
        )
    }

    // Si existe usuario y termino de cargar entonces esta logeado y entrara al LayoutAdmin
    if (user && !isLoading) {
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed}/>
                <Layout 
                    className="layout-admin" 
                    style={{ marginLeft: menuCollapsed ? "80px" : "200px"}} 
                >
                    <Header className="layout-admin__header">
                        <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes = {routes} />
                    </Content>
                    <Footer className="layout-admin__footer">
                        Alvaro Calderon 2020
                    </Footer>
                </Layout>
            </Layout>
        )
    }
    return null
}

/* Para cargar las rutas que recibe el admin */
const LoadRoutes = ({routes}) => {
    return (
        <Switch>
            {
                routes.map((route,index) => (
                    <Route 
                        key = { index }
                        path = { route.path }
                        exact = { route.exact }
                        component = { route.component }
                    />
                ))
            }
        </Switch>
    )
} 
