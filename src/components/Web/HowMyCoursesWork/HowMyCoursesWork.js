import React from 'react'
import {Row, Col, Card} from 'antd'
import { ClockCircleOutlined, KeyOutlined, MessageOutlined, UserOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './HowMyCoursesWork.scss'
export const HowMyCoursesWork = () => {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>¿Cómo funcionan mis cursos?</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de Udemy, activa las 24 horas al dia los 365 dias del año
                </h3>
            </Col>
            
            <Col lg={4}/>
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon = {<ClockCircleOutlined />}
                            title="Cursos y Clases"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso con duración maximo de 15 minutos"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon = {<KeyOutlined />}
                            title="Acceso 24/7"
                            description="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar la hora"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon = {<MessageOutlined />}
                            title="Aprendisaje colaborativo"
                            description="Aprende de los demas dejando tus dudas para que profesores  y compañeros puedas ayudarte"
                        />
                    </Col>
                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon = {<UserOutlined />}
                            title="Mejora tu Perfil"
                            description="Aprende y mejora tu perfil para mantnenerte informado de actualizaciones"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon = {<DollarOutlined />}
                            title="Precios bajos"
                            description="Obtén el curso que necesitas por solo 9.99$ y ten acceso a él por tiempo ilimitado"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon = {<CheckCircleOutlined />}
                            title="Certificado de Finalización"
                            description="Al completar un curso recibirar una certificación que te expedirá Udemy"
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4}/>
        </Row>
    )
}

const CardInfo = (props) => {
    const { icon, title, description} = props
    const {Meta} = Card

    return (
        <Card className="how-my-courses-work__card">
            {icon}
            <Meta title={title} description={description} />
        </Card>
    )
}