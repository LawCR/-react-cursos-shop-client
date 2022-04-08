import React, { useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { suscribeNewsletterApi } from '../../../../api/newsletter';
import './Newsletter.scss'
export const Newsletter = () => {

    const [email, setEmail] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        
        // eslint-disable-next-line no-useless-escape
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email)
        if (!resultValidation) {
            notification["error"]({
                message: "The email is not valid"
            })
        } else {
            suscribeNewsletterApi(email)
                .then( response => {
                    if (response.code !== 200) {
                        notification["warning"]({
                            message: response.message
                        })
                    } else {
                        notification["success"]({
                            message: response.message
                        })
                        setEmail("")
                    }
                })
        }
    }
    return (
        <div className="newsletter">
            <h3>Newsletter</h3>
            <Form onSubmitCapture={onSubmit}>
                <Form.Item>
                    <Input 
                        prefix={<UserOutlined style={{color: "rgba(0,0,0,0.2)"}} />}
                        placeholder="Email ID"
                        value = {email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        I suscribe!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}