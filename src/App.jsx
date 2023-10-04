import { Form, Row, Typography, Col, Input, Select, Button } from 'antd'
import { Content } from 'antd/es/layout/layout'

const { Title } = Typography

function App() {

  return (
    <Content className='contenido'>
      <Row className='w-100' justify={'center'}>
        <Title>Ticket de Turno</Title>
      </Row>

      <Form style={{ maxWidth: '100%', marginLeft: "2rem", marginRight: "2rem", marginTop: "1em" }}>
        <Row gutter={[20, 20]} justify={"center"}>
          <Col sm={24} md={24} lg={18}>
            <Form.Item name="nombre-completo" label="Nombre completo de quien realiza el tramite" rules={[{
              required: true,
              message:"Por favor, ingrese su nombre completo"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={6}>
            <Form.Item name="curp" label="CURP" rules={[{
              required: true,
              message:"Por favor, ingrese su CURP"
            },{
              pattern: new RegExp('[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?'),
              message:"Ingrese un CURP válido"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="nombre" label="Nombre" rules={[{
              required: true,
              message:"Por favor, ingrese su nombre"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="apellido-materno" label="Materno" rules={[{
              required: true,
              message:"Por favor, ingrese su apellido materno"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item name="apellido-paterno" label="Paterno" rules={[{
              required: true,
              message:"Por favor, ingrese su apellido paterno"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
            <Form.Item name="telefono" label="Telefono" rules={[{
              required: true,
              message:"Por favor, ingrese su número de telefono fijo"
            },
            {
              pattern: new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
              message:"Ingrese un numero de telefono válido"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
            <Form.Item name="celular" label="Celular" rules={[{
              required: true,
              message:"Por favor, ingrese su número de telefono celular"
            },{
              pattern: new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
              message:"Ingrese un numero de telefono válido"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={12}>
            <Form.Item name="correo" label="Correo" rules={[{
              required: true,
              message:"Por favor, ingrese su correo electronico"
            },{
              type:'email',
              message:"Ingrese un correo electronico valido"
            }]}>
              <Input className='w-100' />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Form.Item name="nivel" label="¿Nivel al que desea ingresar o que ya cursa el alumno?" rules={[{
              required: true,
              message:"Por favor, seleccione una opción"
            }]}>
              <Select className='w-100'>
                <Select.Option>
                  Educacion Primaria
                </Select.Option>
                <Select.Option>
                  Educacion Secundaria
                </Select.Option>
                <Select.Option>
                  Bachillerato
                </Select.Option>
                <Select.Option>
                  Licenciatura
                </Select.Option>
                <Select.Option>
                  Doctorado o Maestria
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Form.Item name="municipio" label="Municipio donde desea estudia el alumno" rules={[{
              required: true,
              message:"Por favor, seleccione una opción"
            }]}>
              <Select className='w-100'>
                <Select.Option>
                  Saltillo
                </Select.Option>
                <Select.Option>
                  Arteaga
                </Select.Option>
                <Select.Option>
                  Ramos Arizpe
                </Select.Option>

              </Select>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Form.Item name="asunto" label="Seleccione el asunto a tratar" rules={[{
              required: true,
              message:"Por favor, seleccione una opción"
            }]}>
              <Select className='w-100'>
                <Select.Option>
                  Op 1
                </Select.Option>
                <Select.Option>
                  Op 2
                </Select.Option>
                <Select.Option>
                  Op 3
                </Select.Option>
                <Select.Option>
                  Op 4
                </Select.Option>
                <Select.Option>
                  Op 5
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          
            <Button type="primary" htmlType="submit">
              Generar Turno
            </Button>
          
        </Row>
      </Form>






    </Content>
  )
}

export default App
