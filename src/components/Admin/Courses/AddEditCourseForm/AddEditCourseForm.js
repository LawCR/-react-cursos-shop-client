import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { KeyOutlined, GiftOutlined, DollarOutlined, LinkOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { addCourseApi, updateCourseApi } from '../../../../api/course';
import './AddEditCourseForm.scss'

// Componente de CoursesList - formulario modal de agregar y editar 
export const AddEditCourseForm = (props) => {
    // Recibimos la data de course, el setReload para recargar y setIsVisible para abrir/cerrar el Modal
    const { setIsVisibleModal, setReloadCourses, course } = props
    // Estado para guardar la data de curso
    const [courseData, setCourseData] = useState({})

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({})
    }, [course])

    // Funcion para agregar curso
    const addCourse = (e) => {
        e.preventDefault()
        if (!courseData.idCourse) {
            notification["warning"]({
                message: "The Course ID es required"
            })
        } else {
            const accessToken = getAccessTokenApi()
            addCourseApi(accessToken, courseData)
                .then( response => {
                    const typeNotification = response.code === 200 ? "success" : "warning"
                    notification[typeNotification]({
                        message: response.message
                    })
                    setIsVisibleModal(false)
                    setReloadCourses(true)
                    setCourseData({})
                })
                .catch( () => {
                    notification["error"]({
                        message: "Server Error, try again later"
                    })
                })
        }
    }

    const updateCourse = (e) => {
        e.preventDefault()
        const accessToken = getAccessTokenApi()
        updateCourseApi(accessToken, course._id, courseData)
            .then( response => {
                const typeNotification =  response.code === 200 ? "success" : "warning"
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false)
                setReloadCourses(true)
                setCourseData({})
            })
            .catch( () => {
                notification["error"]({
                    message: "Server error, try again later"
                })
            })
    }

    return (
        <div className="add-list-course-form">
            <AddEditForm course={course} addCourse={addCourse} updateCourse={updateCourse} courseData={courseData} setCourseData={setCourseData} />
        </div>
    )
}

const AddEditForm = (props) => {
    const {course, addCourse, updateCourse, courseData, setCourseData } = props
    return (
        <Form className="form-add-edit" onSubmitCapture={ course ? updateCourse : addCourse}>
            <Form.Item>
                <Input 
                    prefix={ <KeyOutlined />}
                    placeholder = "Course ID"
                    value = {courseData.idCourse}
                    onChange = { e => setCourseData({...courseData, idCourse: e.target.value})}
                    disabled={ course ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={ <LinkOutlined />}
                    placeholder = "URL"
                    value = {courseData.link}
                    onChange = { e => setCourseData({...courseData, link: e.target.value})} 
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={ <GiftOutlined />}
                    placeholder = "Discount coupon"
                    value = {courseData.coupon}
                    onChange = { e => setCourseData({...courseData, coupon: e.target.value})} 
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={ <DollarOutlined />}
                    placeholder = "Course price"
                    value = {courseData.price}
                    onChange = { e => setCourseData({...courseData, price: e.target.value})} 
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {course ? "Update Course" : "Create course"}
                </Button>
            </Form.Item>
        </Form>
    )
}