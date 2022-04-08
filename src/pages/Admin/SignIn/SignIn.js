import React from 'react'
import { Layout, Tabs } from 'antd'
//import { Redirect } from 'react-router'
import Logo from '../../../assets/img/png/Logo3.png'
import { RegisterForm } from '../../../components/Admin/RegisterForm'
import { LoginForm } from '../../../components/Admin/LoginForm'
import { getAccessTokenApi } from '../../../api/auth'
import './SignIn.scss'
import { Redirect } from 'react-router'

export const SignIn = () => {
    const { Content } = Layout
    const { TabPane} = Tabs

    // Redigira al admin si es que hay un accessToken en el localStorage
    if (getAccessTokenApi()) {
        return <Redirect to="/#/admin" />
    }

    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <div className="sign-in__content-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="sign-in__content-tabs">
                    {/* class de Tabs ant-tabs */}
                    <Tabs type="card">
                        {/* class de TabPane -> ant-tabs-tab  ant-tabs-tab-active */}
                        {/* class de btn de TabPane -> .ant-tabs-tab-btn */}
                        <TabPane tab={<span>Login Account</span>} key="1" >
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Create Account</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout> 
    )
}
