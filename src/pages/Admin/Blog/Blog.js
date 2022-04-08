import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import {Button, notification} from 'antd'
import queryString from 'query-string'
import {Modal} from '../../../components/Modal'
import { getPostsApi } from '../../../api/post'
import { PostsList } from '../../../components/Admin/Blog/PostsList'
import { Pagination } from '../../../components/Pagination'
import { AddEditPostForm } from '../../../components/Admin/Blog/AddEditPostForm/AddEditPostForm'
import './Blog.scss'

// Componente Blog
function Blog(props) {
    // Obtenemos location e history de props para tener el query
    const {location, history} = props
    // Estado para almacenar los posts
    const [posts, setPosts] = useState(null)
    const [reloadPosts, setReloadPosts] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    // Obtenemos page de los query luego de convertirlo en objeto
    const {page = 1} = queryString.parse(location.search)
    
    // Efecto para cargar los posts
    useEffect(() => {
        getPostsApi(12, page)
            .then( response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setPosts(response.posts)
                }
            })
            .catch( () => {
                notification["error"]({
                    message: "Server error, try again later"
                })
            })
            setReloadPosts(false)
    }, [page, reloadPosts])

    // Funcion para abrir el modal de crear Post
    const addPost = () => {
        setIsVisibleModal(true)
        setModalTitle("Creating new post")
        setModalContent(
            <AddEditPostForm 
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPosts = {setReloadPosts}
                post = {null}
            /> 
        )
    }
    
    // Función para abrir el modal de edit Post
    const editPost = (post) => {
        setIsVisibleModal(true)
        setModalTitle("Update post")
        setModalContent(
            <AddEditPostForm 
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPosts = {setReloadPosts}
                post = {post}
            /> 
        )
    }

    if (!posts) {
        return null
    }
    
    return (
        <div className="blog">
            
            <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>
                    New Course
                </Button>
            </div>
            
            <PostsList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost} />
            <Pagination posts={posts} location={location} history={history} />

            <Modal 
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width = "75%"
            >
                {modalContent}
            </Modal>
        </div>
    )
}

export default withRouter(Blog)
