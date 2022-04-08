import React from 'react'
import { Row, Col } from 'antd'
import { useParams } from 'react-router-dom'
import { PostsListWeb } from '../components/Web/Blog/PostsListWeb'
import { PostInfo } from '../components/Web/Blog/PostInfo/PostInfo'

// Page blog de la web publica
export const Blog = (props) => {
    const {location, history} = props
    const {url} = useParams()
    return (
        <Row>
            <Col md={4} />
            <Col md={16}>
                {
                    url
                    ?
                    <PostInfo url={url} />
                    :
                    <PostsListWeb location={location} history={history} />
                }
            </Col>
            <Col md={4} />
        </Row>
    )
}
