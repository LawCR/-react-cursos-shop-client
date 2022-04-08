import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Row, Col} from 'antd'

import './LayoutBasic.scss'
import { MenuTop } from '../components/Web/MenuTop'
import { Footer } from '../components/Web/Footer'

export const LayoutBasic = (props) => {
    //Aqui recibimos las rutas que se mandaron al LayoutBasic con el path (/)
    const {routes} = props
    return (
        <>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <MenuTop />
                </Col> 
                <Col lg={4} />
            </Row>
            <LoadRoutes routes = {routes} />
            <Footer />
        </>
    )
}

// Componente carga las rutas
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