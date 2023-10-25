import { useState, useRef, useEffect, useContext } from "react";
import { Form, Input, Row, Typography, Col, Button, Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { User, SetUser } from '../hooks/logged'
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography

export default function Login() {

    let user = useContext(User)
    const setUser = useContext(SetUser)
    const navigate = useNavigate()


    const [token, setToken] = useState(null);
    const captchaRef = useRef(null);

    const onLoad = () => {
        // this reaches out to the hCaptcha JS API and runs the
        // execute function on it. you can use other functions as
        // documented here:
        // https://docs.hcaptcha.com/configuration#jsapi
        captchaRef.current.execute();
    };

    useEffect(() => {

        if (token)
            console.log(`hCaptcha Token: ${token}`);

    }, [token]);

    // useEffect(() => {
    //     if (user != null || user != 0) {
    //         navigate('ticket-turno/admin')
    //     }
    // }, [])

    let handleSubmit = (values) => {
        if (!token) {
            Modal.warning({ title: 'Por favor complete el CAPTCHA' });
            return null
        }
        axios.post('/auth/login', values).then(({ data }) => {
            sessionStorage.setItem('token', data.accessToken)
            axios.defaults.headers.post["Authorization"] = data.accessToken;
            axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

            setUser(data)

            if (data.id) {
                navigate('/ticket-turno/admin')
            }
        }).catch(e => {
            if (e) Modal.error({
                title: 'Verifique sus credenciales'
            })
        }

        )
    }


    return (
        <Content className="contenido" style={{ marginTop: "2em" }}>
            <Row className="w-100" justify={"center"} style={{ marginBottom: "2em" }}>
                <Title>Inicio de Sesión</Title>
            </Row>
            <Form onFinish={handleSubmit}>
                <Row className="w-100" justify={"center"}>
                    <Col xs={20} md={8}>
                        <Form.Item name="usuario">
                            <Input prefix={<UserOutlined />} className="w-100" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row className="w-100" justify={"center"}>
                    <Col xs={20} md={8}>
                        <Form.Item name="clave">
                            <Input prefix={<LockOutlined />} type="password" className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"} style={{ marginBottom: "2em" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Row>
                <Row justify={"center"}>
                    <HCaptcha
                        sitekey="6655e8d7-c170-47ce-b4af-bd0f3002cc97"
                        onLoad={onLoad}
                        onVerify={setToken}
                        ref={captchaRef}
                    />
                </Row>
            </Form>

        </Content>
    )

}