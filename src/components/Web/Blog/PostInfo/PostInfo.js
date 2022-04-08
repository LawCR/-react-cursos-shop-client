import { Spin, notification } from 'antd'
import {Helmet} from 'react-helmet'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { getPostApi } from '../../../../api/post'
import "moment/locale/es"
import './PostInfo.scss'

// Componente de Blog para mostrar la info de un curso
export const PostInfo = (props) => {
    const {url} = props
    const [postInfo, setPostInfo] = useState(null)
    // Efecto para cargar la info del post
    useEffect(() => {
        if (url) {
            getPostApi(url)
                .then( response => {
                    if (response.code !== 200) {
                        notification["warning"]({
                            message: response.message
                        })
                    } else {
                        setPostInfo(response.post)
                    }
                })
                .catch( () => {
                    notification["error"]({
                        message: "Server error, try again later"
                    })
                })
        }
    }, [url])

    // Para mostrar el spin de carga mientras el estado postInfo se carga
    if (!postInfo) {
        return <Spin tip="Loading" style={{width: "100%", padding: "200px 0"}} />
    }

    return (
        <>
            <Helmet>
                <title>{postInfo.title} | CursosReact</title>
            </Helmet>
            <div className="post-info">
                <h1 className="post-info__title">{postInfo.title}</h1>
                {/* Fecha de creacion del post */}
                <div className="post-info__creation-date">
                    {moment(postInfo.date).local("es").format("LL")}
                </div>
                <div 
                    className="post-info__description"
                    dangerouslySetInnerHTML={{__html: postInfo.description}}
                />
            </div>
        </>
    )
}
