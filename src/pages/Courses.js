import React, { useEffect, useState } from 'react'
import { Row, Col, Spin, notification } from 'antd'
import {Helmet} from 'react-helmet'
import { CoursesList } from '../components/Web/Courses/CoursesList'
import { PresentationCourses } from '../components/Web/Courses/PresentationCourses'
import { getCourseApi } from '../api/course'

export const Courses = () => {
    // Estado donde se almacenaran los cursos
    const [courses, setCourses] = useState(null)
    // Efecto para obtener los cursos del endpoint y almacenarlas en courses
    useEffect(() => {
        getCourseApi()
            .then( response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setCourses(response.courses)
                }
            })
            .catch( () => {
                notification["error"]({
                    message: "Server error, try again later"
                })
            })
    }, [])
    return (
        <>
            <Helmet>
                <title>Cursos | CursosReact</title>
                <meta name="description" content="Cursos | Web sobre programación" data-react-helmet="true" />
            </Helmet>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <PresentationCourses />
                    {
                        ( !courses )
                        ?
                        (<Spin tip="Loading courses" style={{ textAlign: "center", width:"100%", padding:"20px"}} />)
                        :
                        (<CoursesList courses={courses} />)
                    }
                </Col>
                <Col md={4} />
            </Row>
        </>
    )
}
