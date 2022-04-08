import React from 'react'
import {Row, Col, Card, Avatar} from 'antd'
import {  } from '@ant-design/icons';
import AvatarPersona from '../../../assets/img/png/kurono.png'
import './ReviewsCourses.scss'
export const ReviewsCourses = () => {
    return (
        <div className="reviews-courses">
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title">
                    <h2>
                        Forma parte de los +35 mil estudiantes que estan aprendiendo con mis cursos
                    </h2>
                </Col>  
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Alvaro Calderon"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Alexia Barbieri"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Elza Patogen"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview 
                                name="Mark Anthony Jimenez"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Ramiro Ramirez"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name="Gonzalo Gonzales"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react."
                            />
                        </Col>
                    </Row>
                </Col>  
                <Col lg={4} />
            </Row>
        </div>
    )
}

const CardReview = (props) => {
    const {name, subtitle, avatar, review } = props
    const { Meta } = Card

    return (
        <Card className="reviews-courses__card">
            <p>{review}</p>
            <Meta 
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    )
}