import React from 'react'
import LogoWhite from '../../../../assets/img/png/Logo3.png'
import { SocialLinks } from '../../SocialLinks'
import './MyInfo.scss'
// Componente de Footer para la info
export const MyInfo = () => {
    return (
        <div className="my-info">
            <img src={LogoWhite} alt="logo" />
            <h4>
                Entra en el mundo del desarrolllo web, disfruta creando proyectos de todo tipo, deja que tu imaginación fluya y crea verdaderas maravillas!!
            </h4>
            <SocialLinks />
        </div>
    )
}
