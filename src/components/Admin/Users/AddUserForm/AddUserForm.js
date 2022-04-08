import React, { useState } from 'react'
import { Form, Input, Select, Button, Row, Col, notification} from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import './AddUserForm.scss'
export const AddUserForm = (props) => {
    const { setIsVisibleModal, setReloadUsers } = props
    const [userData, setUserData] = useState({})
    const addUser = e => {
        e.preventDefault()
        if (!userData.name || !userData.lastname || !userData.role || !userData.email || !userData.password || !userData.repeatPassword) {
            notification['error']({
                message: "All fields are required"
            })
        } else if(userData.password !== userData.repeatPassword) {
            notification['error']({
                message: "Passwords have to match"
            })
        } else {
            const accessToken = getAccessTokenApi()
            signUpAdminApi(accessToken, userData)
                .then(response => {
                    notification['success']({
                        message: response
                    })
                    setIsVisibleModal(false)
                    setReloadUsers(true)
                    setUserData({})
                })
                .catch( err => {
                    notification['error']({
                        message: err
                    })
                })
        }
    }
    return (
        <div className="add-user-form">
            <AddForm 
                userData = {userData}
                setUserData = {setUserData}
                addUser= {addUser}
            />
        </div>
    )
}

const AddForm = (props) => {
    const { userData, setUserData, addUser } = props
    const { Option } = Select

    return (
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <UserOutlined /> }
                            placeholder = "Name"
                            value = {userData.name}
                            onChange={e => setUserData({...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <UserOutlined /> }
                            placeholder = "Lastname"
                            value = {userData.lastname}
                            onChange={e => setUserData({...userData, lastname: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input 
                            prefix={ <MailOutlined /> }
                            placeholder = "Email ID"
                            value = {userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select 
                            placeholder="Select a user role"
                            onChange={e => setUserData({...userData, role: e})}
                            value={userData.role}
                        >
                        <Option value="admin">Administrator</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reviewer">Reviewer</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <LockOutlined /> }
                            type = "password"
                            placeholder = "Password"
                            value = {userData.password}
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={ <LockOutlined /> }
                            type = "password"
                            placeholder = "Confirm password"
                            value = {userData.repeatPassword}
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}
