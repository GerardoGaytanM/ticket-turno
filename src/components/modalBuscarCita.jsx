import { useEffect, useRef, useState } from "react";
import { Modal, Form, Row, Input, Col, Select, Button } from "antd";
import axios from "axios";

export default function ModalBuscarCita(props) {

    const [municipios, setMunicipios] = useState([])

    const formRef = useRef()

    const getMunicipios = () => {
        axios.get('/municipios', {}).then((({ data }) => {
            console.log(data)
            setMunicipios(data.data)
        }))
    }

    useEffect(()=>{
        getMunicipios()
        
    },[])

    const onFinish = (values) => {
        console.log(values)
        axios.get('/turno/public', {
            params:{
                ...values
            }
        }).then((({ data }) => {
            props.onFound(data.data)
        }))
    }

    return (
        <Modal
            {...props}
            title={"Buscar mi cita"}
            destroyOnClose={true}
            onOk={()=>formRef.current.submit()
            }
        >
            <Form style={{ maxWidth: '100%', marginTop: "2em" }} ref={formRef} onFinish={onFinish}>
                <Row gutter={[20, 20]} justify={"center"}>

                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="curp" label="CURP" rules={[{
                            required: true,
                            message: "Por favor, ingrese su CURP"
                        }, {
                            pattern: new RegExp('[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?'),
                            message: "Ingrese un CURP válido"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="numero" label="Numero de cita" rules={[{
                            required: true,
                            message: "Por favor, ingrese su numero de cita"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="municipio" label="Municipio" rules={[{
                            required: true,
                            message: "Por favor, seleccione una opción"
                        }]}>
                            <Select className='w-100'>
                                {municipios.map(e => {
                                    return <Select.Option value={e._id}>
                                        {e.nombre}
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )

}