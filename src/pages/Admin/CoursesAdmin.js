import React, { useEffect, useState } from 'react'
import { getCourseApi } from '../../api/course'
import { CoursesList } from '../../components/Admin/Courses/CoursesList'

export const CoursesAdmin = () => {
    // Estado donde se almacenan los cursos
    const [courses, setCourses] = useState([])
    // Estado donde se recargaran los cursos
    const [reloadCourses, setReloadCourses] = useState(false)
    
    // Efecto para obtener los cursos y guardarlos en el estado y recargarlos
    useEffect(() => {
        getCourseApi()
            .then( response => {
                setCourses(response.courses)
            })
        setReloadCourses(false)
    }, [reloadCourses])

    return (
        <div className="courses">
            <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
        </div>
    )
}
