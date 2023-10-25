import { Form, Row, Typography, Col, Input, Select, Button, Space, message } from 'antd'
import { Content } from 'antd/es/layout/layout'
import ModalConfirmacion from './confirmacion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalBuscarCita from './modalBuscarCita'
import axios from 'axios'

const { Title } = Typography

function TicketForm() {

  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(
    {
      numero: null,
      curp: null
    }
  )

  const formRef = useRef()

  const [id, setID] = useState(null)
  const [municipios, setMunicipios] = useState([])

  const [modalConfirmacion, setModalConfirmacion] = useState(false)
  const [modalBuscar, setModalBuscar] = useState(false)

  const getMunicipios = () => {
    axios.get('/municipios', {}).then((({ data }) => {
      console.log(data)
      setMunicipios(data.data)
    }))
  }

  const onFinish = (values) => {
    if (id) {
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
      id: id
    }).then(({data}) => {
      console.log(data)
      message.success("Información actualizada")
      setConfirm({
        numero: data.data.numero,
        curp: data.data.curp
      })
      setModalConfirmacion(true)
      formRef.current.resetFields()
      setID(null)
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
      setConfirm({
        numero: data.data.numero,
        curp: data.data.curp
      })
      setModalConfirmacion(true)

      if (data.data.success) message.success("Turno asignado")
      formRef.current.resetFields()
    }).catch(error => {
      if (error)
        console.log(error)
      else
        message.error("Error al asignar turno")
    })
  }


  useEffect(() => {
    getMunicipios()
  }, [])

  return (
    <Content className='contenido'>
      <Row className='w-100' justify={'center'} align={'middle'}>
        <Col span={20}>
          <Row className='w-100' justify={'center'}>
            <Title>Ticket de Turno</Title>
          </Row>

        </Col>
        <Col span={4}>
          <Space>
            <Button onClick={() => navigate('/ticket-turno/login')}>Iniciar Sesion</Button>
            <Button onClick={() => setModalBuscar(true)}>Buscar mi cita</Button>
          </Space>
        </Col>
      </Row>

      <Form style={{ maxWidth: '100%', marginLeft: "2rem", marginRight: "2rem", marginTop: "1em" }} onFinish={onFinish} ref={formRef}>
        <Row gutter={[20, 20]} justify={"center"}>
          <Col sm={24} md={24} lg={18}>
            <Form.Item name="nombre_completo" label="Nombre completo de quien realiza el tramite" rules={[{
              required: true,
              message: "Por favor, ingrese su nombre completo"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={6}>
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
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="nombre" label="Nombre" rules={[{
              required: true,
              message: "Por favor, ingrese su nombre"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="apellido_paterno" label="Paterno" rules={[{
              required: true,
              message: "Por favor, ingrese su apellido paterno"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="apellido_materno" label="Materno" rules={[{
              required: true,
              message: "Por favor, ingrese su apellido materno"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
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
          <Col sm={24} md={12} lg={6}>
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
          <Col sm={24} md={12} lg={12}>
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
            <Form.Item name="nivel" label="¿Nivel al que desea ingresar o que ya cursa el alumno?" rules={[{
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
            <Form.Item name="municipio" label="Municipio donde desea estudia el alumno" rules={[{
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
            <Form.Item name="asunto" label="Seleccione el asunto a tratar" rules={[{
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

          <Button type="primary" htmlType="submit">
            Generar Turno
          </Button>

        </Row>
      </Form>


      <ModalConfirmacion
        open={modalConfirmacion}
        curp={confirm.curp}
        numero={confirm.numero}
        onCancel={() => setModalConfirmacion(false)}


      />
      <ModalBuscarCita
        open={modalBuscar}
        onCancel={() => setModalBuscar(false)}
        onFound={(val) => {
          console.log(val)
          console.log(formRef)
          formRef.current.setFieldsValue({ ...val })
          setModalBuscar(false)
          setID(val._id)
        }}
      />



    </Content>
  )
}

export default TicketForm
