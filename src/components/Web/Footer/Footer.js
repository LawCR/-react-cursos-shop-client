import React from 'react'
import {Layout, Row, Col} from 'antd'
import { MyInfo } from './MyInfo'
import { NavigationFooter } from './NavigationFooter/NavigationFooter'
import { Newsletter } from './Newsletter/Newsletter'
import './Footer.scss'

// Componente Footer del LayoutBasic
export const Footer = () => {
    const { Footer } = Layout
    return (
        <Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16} >
                    <Row className="footer__components">
                        <Col md={8}>
                            <MyInfo />
                        </Col>
                        <Col md={8}>
                            <NavigationFooter />
                        </Col>
                        <Col md={8}>
                            <Newsletter />
                        </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>© 2021 ALL RIGHTS RESERVED</Col>
                        <Col md={12}>CALDERON ROJAS ROBERTH | DESARROLLADOR WEB</Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
        </Footer>
    )
}
