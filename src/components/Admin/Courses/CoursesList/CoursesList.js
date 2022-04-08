import React, { useEffect, useState } from 'react'
import { List, Button, Modal as ModalAntd, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable'
import { deleteCourseApi, getCourseDataUdemyApi, updateCourseApi } from '../../../../api/course'
import { Modal } from '../../../Modal';
import { getAccessTokenApi } from '../../../../api/auth';
import { AddEditCourseForm } from '../AddEditCourseForm/';

import './CoursesList.scss'

const { confirm } = ModalAntd

// Componente de CoursesAdmin
export const CoursesList = (props) => {
    const {courses, setReloadCourses} = props
    const [listCourses, setListCourses] = useState([])
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)

    // Efecto para almacenar en listCourses la data de courses
    useEffect(() => {
        const listCourseArray = []
        courses.forEach(course => {
            listCourseArray.push({
                content: <Course course={course} deleteCourse={deleteCourse} editCourseModal={editCourseModal} />
            })
        });
        setListCourses(listCourseArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses])

    // Funcion para ordenar los cursos con drag
    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi()
        sortedList.forEach( item => {
            // Sacamos el id de cada curso
            const { _id } = item.content.props.course
            // Creamos la variable order que es el rank de la lista drag
            const order = item.rank
            updateCourseApi(accessToken, _id, {order})
        })
    }

    // Formulario Modal de addCourse
    const addCourseModal = () => {
        setIsVisibleModal(true)
        setModalTitle('Creating new course')
        setModalContent(
            <AddEditCourseForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            />
        )
    }

    // Formulario Modal de editCourse
    const editCourseModal = (course) => {
        setIsVisibleModal(true)
        setModalTitle('Updating course')
        setModalContent(
            <AddEditCourseForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
                course = {course}
            />
        )
    }
    // Funcion para eliminar curso
    const deleteCourse = (course) => {
        const accessToken = getAccessTokenApi()
        confirm({
            title: "Eliminando curso",
            content: `Are you sure you want to remove the course ${course.idCourse} `,
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteCourseApi(accessToken, course._id)
                    .then( response => {
                        const typeNotification = response.code === 200 ? "success" : "warning"
                        notification[typeNotification]({
                            message: response.message
                        })
                        setReloadCourses(true)
                    })
                    .catch( () => {
                        notification["error"]({
                            message: "Server error, try again later"
                        })
                    })
            }
        })
    }

    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={addCourseModal}>
                    New Course
                </Button>
            </div>
            <div className="courses-list__items">
                {listCourses.length === 0 
                    && 
                    (
                    <h2 style={{textAlign: "center", margin: 0}}>
                        You don´t have courses created
                    </h2>
                    )
                } 
                {/* Lista Drag para listar los items cursos */}
                <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
            </div>
            <Modal
                title = {modalTitle}
                isVisible = {isVisibleModal}
                setIsVisible = {setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

// Componente de CoursesList
const Course = (props) => {
    const { course, deleteCourse, editCourseModal} = props
    const [courseData, setCourseData] = useState(null)

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then( response => {
                if (response.code !== 200) {
                    notification["warning"]({
                        message: `El curso con el id ${course.idCourse} no se ha encontrado `
                    })
                }
                setCourseData(response.data)
            })
    }, [course])

    if (!courseData) {
        return null
    }

    return (
        <List.Item
            actions={[
                <Button type="primary" onClick={()=> editCourseModal(course)}>
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClick={()=> deleteCourse(course)}>
                <DeleteOutlined />
                </Button>
            ]}
        >
            <img src={courseData.image_480x270} alt={courseData.title} style={{width: "100px", marginRight: "20px"}} />
            <List.Item.Meta 
                title={`${courseData.title} | ID: ${course.idCourse} `}
                description={courseData.headline}
            />
        </List.Item>
    )
}
