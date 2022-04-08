import React, { useEffect, useState } from 'react'
import { Spin, List, notification} from 'antd'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import queryString from 'query-string'
import { Pagination } from '../../../Pagination'
import { getPostsApi } from '../../../../api/post'
import "moment/locale/es";

import './PostsListWeb.scss'

// Componente de Blog (web)
export const PostsListWeb = (props) => {
    const {location, history} = props
    const [posts, setposts] = useState(null)
    // Para sacar la page de los querys
    const {page=1} = queryString.parse(location.search)
    // Efecto para almacenar los posts
    useEffect(() => {
        getPostsApi(12, page)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setposts(response.posts)
                }
            })
            .catch( () => {
                notification["error"]({
                    message: "Server Error, try again later"
                })
            })
    }, [page])

    if (!posts) {
        return (
            <Spin tip="Loading" style={{widows: "100%", padding:"200px 0"}} />
        )
    }

    return (
        <>
            <Helmet>
                <title>Blog de programación | CursosReact</title>
            </Helmet>
            <div className="posts-list-web">
                <h1>Blog</h1>
                <List 
                    dataSource={posts.docs}
                    renderItem={post => <Post post={post} />}
                />
                <Pagination posts={posts} location={location} history={history}  />
            </div>
        </>
    )
}

const Post = (props) => {
    const {post} = props
    const day = moment(post.date).format("DD")
    const month = moment(post.date).format("MMMM")

    return (
        <List.Item className="post">
            <div className="post__date">
                <span>{day} </span>
                <span>{month} </span>
            </div>
            
             {/* <Link to={`blog/${post.url}`}>
                 <List.Item.Meta title={post.title} /> 
                <div className="ant-list-item-meta">
                    <div className="ant-list-item-meta-content">
                        <h4 className="ant-list-item-meta-title">{post.title}</h4>
                    </div>
                </div>
            </Link>  */}
            <div className="post__post">
                <Link to={`blog/${post.url}`}>
                    <List.Item.Meta title={post.title} /> 
                    {/* <h3 className="ant-list-item-meta-title">{post.title}</h3> */}
                </Link> 
            </div>
            
            
        </List.Item>
    )
}