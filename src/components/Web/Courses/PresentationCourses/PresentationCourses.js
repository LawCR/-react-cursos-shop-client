import React from 'react'
import AcademyLogo from '../../../../assets/img/png/academy-logo.png'
import './PresentationCourses.scss'
export const PresentationCourses = () => {
    return (
        <div className="presentation-course">
            <img src={AcademyLogo} alt="Courses Logo" />
            <p>
                En CursosPro academy vas a encontrar los mejores cursos online de desarrollo web en Español. Unete a nosotros y empieza tu camino como Desarrolador Web o Desarrollador de CMS. Cenceramente, estos cursos es el tipo de contenido que a mi me hubiera gustado encontrar cuando empecé en el mundo del desarrollo web profesional
            </p>
            <p>!Echales un vistazo y aprovecha las ofertas!!!</p>
        </div>
    )
}
