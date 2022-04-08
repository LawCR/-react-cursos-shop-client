import React from 'react'
import { List, Button, Modal, notification } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deletePostApi } from '../../../../api/post';
import { getAccessTokenApi } from '../../../../api/auth';
import './PostsList.scss'
const { confirm } = Modal

// Componente de Blog
export const PostsList = (props) => {
    const {posts, setReloadPosts, editPost} = props
    
    // Funcion para eliminar el post
    const deletePost = (post) => {
        const accessToken = getAccessTokenApi()
        confirm({
            title: "Deleting post",
            content: `Are you sure you want to delete the post ${post.title}`,
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancelar",
            onOk(){
                deletePostApi(accessToken, post._id)
                    .then( response => {
                        const typeNotification = (response.code === 200) ? "success" : "warning"
                        notification[typeNotification]({
                            message: response.message
                        })
                        setReloadPosts(true)
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Server error, try again later"
                        })
                    })
            }
        })
    }


    return (
        <div className="posts-list">
            <List 
                dataSource={posts.docs}
                renderItem={post => (
                    <Post post={post} deletePost={deletePost} editPost={editPost} />
                )}
            />
        </div>
    )
}

// Componente de PostsList - Lista de posts y acciones
const Post = (props) => {
    const { post, deletePost, editPost } = props

    return (
        <List.Item
            actions={[
                <Link to={`/blog/${post.url}`} target="_blank" >
                    <Button type="primary">
                        <EyeOutlined />
                    </Button>
                </Link>,
                <Button type="primary" onClick = { () => editPost(post)} >
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClick = { () => deletePost(post)} >
                    <DeleteOutlined />
                 </Button>
            ]}
        >
            <List.Item.Meta title={post.title} />
        </List.Item>
    )
}