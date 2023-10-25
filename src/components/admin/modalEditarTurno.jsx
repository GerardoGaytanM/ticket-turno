import { Modal, Form, Row, Input, Col, Select, Button, message } from "antd";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ModalTurno(props) {

    const [municipios, setMunicipios] = useState([])

    const getMunicipios = () => {
        axios.get('/municipios', {}).then((({ data }) => {
            console.log(data)
            setMunicipios(data.data)
        }))
    }

    const getTurno = () => {
        axios.get('/turno', {
            params:{
                id: props.id
            }
        }).then(({data}) => {
           formRef.current.setFieldsValue({
            ...data.data
           })
        })
    }

    useEffect(() => {
        getMunicipios()
    }, [])

    useEffect(() => {
        console.log("Cambio de props")
        if (props.id) {
            getTurno()
        }
    },[props.id])

    const onFinish = (values) => {
        if (props.id) {
          update(values)
        }
        else {
          add(values)
        }
      }
    
      /**
        * @method updateInversion
        * @param {object} values - Objecto que contiene los valores del formulario
        * @description Actualiza una inversion
        */
      const update = (values) => {
        console.log("values", values);
        axios.put('/turno', {
          ...values,
          id: props.id
        }).then(({data}) => {
          console.log(data)
          message.success("Información actualizada")
          props.onCancel()
        }).catch(error => {
          if (error)
            console.log(error)
          else
            message.error("Error al asignar turno")
        })
      }
    
      const add = (values) => {
        axios.post('/turno', {
          ...values,
        }).then(({ data }) => {
          console.log(data)
          
          props.onCancel()
    
          if (data.data.success) message.success("Turno asignado")
          formRef.current.resetFields()
        }).catch(error => {
          if (error)
            console.log(error)
          else
            message.error("Error al asignar turno")
        })
      }

    const formRef = useRef()

    return (
        <Modal
            {...props}
            title={props.id ? "Editar" : "Nuevo" + " Turno"}
            destroyOnClose={true}
            onOk={()=>formRef.current.submit()}
        >
            <Form style={{ maxWidth: '100%', marginLeft: "2rem", marginRight: "2rem", marginTop: "1em" }} onFinish={onFinish} ref={formRef}>
                <Row gutter={[20, 20]} justify={"center"}>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="nombre_completo" label="Nombre completo" rules={[{
                            required: true,
                            message: "Por favor, ingrese su nombre completo"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
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
                        <Form.Item name="nombre" label="Nombre" rules={[{
                            required: true,
                            message: "Por favor, ingrese su nombre"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="apellido_materno" label="Materno" rules={[{
                            required: true,
                            message: "Por favor, ingrese su apellido materno"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="apellido_paterno" label="Paterno" rules={[{
                            required: true,
                            message: "Por favor, ingrese su apellido paterno"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="telefono" label="Telefono" rules={[{
                            required: true,
                            message: "Por favor, ingrese su número de telefono fijo"
                        },
                        {
                            pattern: new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
                            message: "Ingrese un numero de telefono válido"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="celular" label="Celular" rules={[{
                            required: true,
                            message: "Por favor, ingrese su número de telefono celular"
                        }, {
                            pattern: new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
                            message: "Ingrese un numero de telefono válido"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={242}>
                        <Form.Item name="correo" label="Correo" rules={[{
                            required: true,
                            message: "Por favor, ingrese su correo electronico"
                        }, {
                            type: 'email',
                            message: "Ingrese un correo electronico valido"
                        }]}>
                            <Input className='w-100' />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="nivel" label="Nivel" rules={[{
                            required: true,
                            message: "Por favor, seleccione una opción"
                        }]}>
                            <Select className='w-100'>
                                <Select.Option value={1}>
                                    Educacion Primaria
                                </Select.Option>
                                <Select.Option value={2}>
                                    Educacion Secundaria
                                </Select.Option>
                                <Select.Option value={3}>
                                    Bachillerato
                                </Select.Option>
                                <Select.Option value={4}>
                                    Licenciatura
                                </Select.Option>
                                <Select.Option value={5}>
                                    Doctorado o Maestria
                                </Select.Option>
                            </Select>
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
                    <Col sm={24} md={24} lg={24}>
                        <Form.Item name="asunto" label="Asunto" rules={[{
                            required: true,
                            message: "Por favor, seleccione una opción"
                        }]}>
                            <Select className='w-100'>
                                <Select.Option value={1}>
                                    Inscripcion
                                </Select.Option>
                                <Select.Option value={2}>
                                    Problemas Academicos
                                </Select.Option>
                                <Select.Option value={3}>
                                    Becas
                                </Select.Option>
                                <Select.Option value={4}>
                                    Cambio de escuela
                                </Select.Option>
                                <Select.Option value={5}>
                                    Otros
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    )

}