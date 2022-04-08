import React, {useState} from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../helpers/formValidation';
import { signUpApi } from '../../../api/user';
import './RegisterForm.scss'

export const RegisterForm = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    })

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    const handleInputChange = (e) =>{
        if (e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            })
        }else{
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    const inputValidation = (e) => {
        const { type, name } = e.target;
     //   console.log(e.target);
        if (type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }

        if (type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target,6)
            })
        }

        if (type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    }

    const register = async(e) => {
        e.preventDefault()
        const emailValue = inputs.email
        const passwordValue = inputs.password
        const repeatPasswordValue = inputs.repeatPassword
        const privacyPolicyValue = inputs.privacyPolicy
        if (!emailValue || !passwordValue || !repeatPasswordValue || !privacyPolicyValue) {
            notification['error']({
                message: "Todos los campos son obligatorios.",
                placement:'topRight'
            })
        } else {
            if (passwordValue !== repeatPasswordValue) {
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales."
                })
            }else{
                // Conectar con el API y registrar al usuario
                const result = await signUpApi(inputs)
                if (!result.ok) {
                    notification["error"]({
                        message: result.message
                    })
                } else {
                    notification["success"]({
                        message: result.message
                    })
                    resetForm()
                }
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input')

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }
        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        })

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        })
    }

    return (
        // clase del Form -> ant-form y register-form
        <Form className="register-form" onSubmitCapture={register} onChange={handleInputChange} >
            {/* Class del Form.Item -> ant-form-item */}
            {/* class ant-form-item-control */}
            {/* class ant-form-item-control-input */}
            {/* class ant-form-item-control-input-content */}
            <Form.Item>
                <Input 
                    //  class register-form__input 
                    //  class ant-input-prefix
                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.3'}} />}
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    className="register-form__input"
                    onChange = {inputValidation}
                    value = {inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.3'}} />}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="register-form__input"
                    onChange = {inputValidation}
                    value = {inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.3'}} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Confirm Password"
                    className="register-form__input"
                    onChange = {inputValidation}
                    value = {inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy} onChange = {inputValidation} >
                    Agree with <span>Term & Conditions</span>
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}
