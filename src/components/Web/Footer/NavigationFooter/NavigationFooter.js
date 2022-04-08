import React from 'react'
import { Link } from 'react-router-dom';
import {Row, Col} from 'antd'
import { BookOutlined, CodeOutlined, DatabaseOutlined, RightOutlined, HddOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import './NavigationFooter.scss'
// Componente de Footer para la navegacion
export const NavigationFooter = () => {
    return (
        <Row className="navigation-footer">
            <Col md={24}>
                <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    )
}

// Componente del NavigationFooter para la lista izquierda
const RenderListLeft = () => {
    return (
        <ul>
            <li>
                <a href="/courses" >
                    <BookOutlined /> Cursos Online
                </a>
            </li>
            <li>
                <Link to="/contact">
                    <CodeOutlined /> Desarrollo Web
                </Link>
            </li>
            <li>
                <a href="/base" >
                    <DatabaseOutlined /> Base de Datos
                </a>
            </li>
            <li>
                <a href="/politicas" >
                    <RightOutlined /> Politica de Privacidad
                </a>
            </li>
        </ul>
    )
}

// Componente del NavigationFooter para la lista derecha
const RenderListRight = () => {
    return (
        <ul>
            <li>
                <a href="/sistemas" >
                    <HddOutlined /> Sistemas / Servidores
                </a>
            </li>
            <li>
                <Link to="/contact">
                    <AppstoreOutlined /> CMS
                </Link>
            </li>
            <li>
                <a href="/portafolio" >
                    <UserOutlined /> Portafolio
                </a>
            </li>
            <li>
                <a href="/cookies" >
                    <RightOutlined /> Politica de Cookies
                </a>
            </li>
        </ul>
    )
}
