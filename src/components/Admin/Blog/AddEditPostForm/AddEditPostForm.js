import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, DatePicker, notification} from 'antd'
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { getAccessTokenApi } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';
import './AddEditPostForm.scss'

// Componente de Blog - Formulario modal de agregar y editar post
export const AddEditPostForm = (props) => {
    
    const { setIsVisibleModal, setReloadPosts, post} = props
    const [postData, setPostData] = useState({})

    // Efecto para cargar los post en postData
    useEffect(() => {
        if (post) {
            setPostData(post)
        } else {
            setPostData({})
        }
    }, [post])

    // Función para del form crear post- Recibe los datos enviados y ejecuta addPost
    const proccessPost = (e) => {
        e.preventDefault()
        const {title, url, description, date} = postData
        if (!title || !url || !description || !date) {
            notification["error"]({
                message: "All fields are required"
            })
        } else {
            if (!post) {
                addPost()
            } else {
                updatePost()
            }
        
        }

        
    }

    // Función para agregar el post
    const addPost = () => {
        const accessToken = getAccessTokenApi()
        addPostApi(accessToken, postData)
            .then( response => {
                const typeNotification = response.code === 200 ? "success" : "warning"
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false)
                setReloadPosts(true)
                setPostData({})
            })
            .catch( () => {
                notification["error"]({
                    message: "Server error, try again later"
                })
            })
    }

    // Función para editar el post
    const updatePost = () => {
        const accessToken = getAccessTokenApi()
        updatePostApi(accessToken, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning"
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false)
                setReloadPosts(true)
                setPostData({})
            })
            .catch( () => {
                notification["error"]({
                    message: "Server error, try again later"
                })
            })
    }
    

    return (
        <div className="add-edit-post-form">
            <AddEditForm postData={postData} setPostData={setPostData} post={post} proccessPost={proccessPost} />
        </div>
    )
}

const AddEditForm = (props) => {
    const {postData, setPostData, post, proccessPost} = props
    return (
        <Form 
            className="add-edit-post-form"
            //layout="inline"
            onSubmitCapture={proccessPost}
        >
            <Row gutter={24}>
                <Col span={8}> 
                    <Input 
                        prefix={ <FontSizeOutlined /> }
                        placeholder="Title"
                        value={postData.title}
                        onChange={ e => setPostData({...postData, title: e.target.value})}
                    />
                </Col>
                <Col span={8}> 
                    <Input 
                        prefix={ <LinkOutlined /> }
                        placeholder="URL"
                        value={postData.url}
                        onChange={ e => setPostData({...postData, url: transformTextToUrl(e.target.value)})}
                    />
                </Col>
                <Col span={8}> 
                    <DatePicker 
                        style={{width: '100%'}}
                        format="DD/MM/YY HH:mm:ss"
                        placeholder="Publication date"
                        //showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        value={ postData.date && moment(postData.date)}
                        onChange={ (e, value) => 
                            setPostData({
                                ...postData,
                                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                            })
                        }
                    />
                </Col>
            </Row>
            <Editor
                //onInit={(evt, editor) => editorRef.current = editor}
                value={postData.description ? postData.description : ""}
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={ (newText) => setPostData({...postData, description: newText}) }
            />
            
            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Update post" : "Create post"}
            </Button>
        </Form>
    )
}
//     setPostData({...postData, description: editorRef.current.getContent()})

const transformTextToUrl = (text) => {
    const url = text.replace(" ", "-")
    return url.toLowerCase()
}