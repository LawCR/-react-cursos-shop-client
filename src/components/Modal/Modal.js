import React from 'react'
import { Modal as ModalAntd } from "antd"
export const Modal = (props) => {
    /*
        El modal recibe 4 datos de ListUsers:
        children: Que son los componentes que mostrara como contenido dentro del modal (modalContent)
        title: El titulo del modal
        isVisible: Un estado que recibiremos
        setIsVisible: Funcion de isVisible para alterarlo entre true y false para cerrar y abrir el Modal
        other: otros props adicionales como width
    */
    const { children, title, isVisible, setIsVisible, ...other } = props
    return (
        <div>
            <ModalAntd
                title={title}
                centered
                visible={isVisible}
                onCancel={()=> setIsVisible(false)}
                footer={false}
                { ...other}
            >
                {children}
            </ModalAntd>
        </div>
    )
}
