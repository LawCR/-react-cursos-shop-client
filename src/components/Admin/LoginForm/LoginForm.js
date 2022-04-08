import React,{useState} from 'react'
import { Form, Input, Button, notification} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.scss'
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../helpers/constants';
import { useHistory } from 'react-router-dom';

export const LoginForm = () => {
    const history = useHistory()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const login = async(e) => {
        e.preventDefault()


        const result = await signInApi(inputs)
        if (result.message) {
            notification["error"]({
                message: result.message
            })
        } else {
            const {accessToken, refreshToken} = result
            // Guardamos en el localstorage el accestToken y refreshToken
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)

            notification["success"]({
                message: "Login correct."
            })

            history.replace("/admin")
            window.location.reload()
        }
    }


    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.3'}} />}
                    type = "email"
                    name = "email"
                    placeholder = "Email ID"
                    className = "login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.3'}} />}
                    type = "password"
                    name = "password"
                    placeholder = "Password"
                    className = "login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}
