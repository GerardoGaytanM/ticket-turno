import { Card, Row, Col, Tag, Button, Space, Typography, Popconfirm } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import '../../styles/cards.scss'

export default function CardTurno(props) {

    const remove = () => {
        axios.delete('/turno', {
            params: { id: props.item._id }
        }).then((response) => {
            message.success("Turno eliminado")
        }).catch((error) => {
            message.error("Error al eliminar el turno");
        }).finally(() => {
            props.update()
        })
    }

    const resolved = () => {
        axios.put('/turno', {
           id: props.item._id,
           estatus: 1
        }).then((response) => {
            message.success("Turno resuelto")
        }).catch((error) => {
            message.error("Error al actualizar el estatus");
        }).finally(() => {
            props.update()
        })
    }

    const renderAsunto = (e) => {

        let steps = {
            1: <Tag>Inscripcion</Tag>,
            2: <Tag>Problemas Academicos</Tag>,
            3: <Tag>Becas</Tag>,
            4: <Tag>Cambio de escuela</Tag>,
            5: <Tag>Otros</Tag>,

        }

        return steps != undefined ? steps[e] : 'N/A'

    }

    const renderEstatus = (e) => {

        let steps = {
            0: <Tag>Pendiente</Tag>,
            1: <Tag>Completado</Tag>,


        }

        return steps != undefined ? steps[e] : 'N/A'

    }



    return (
        <Card className="w-100 card-turno">
            <Row gutter={[20, 8]} align={"middle"}>
                <Col xs={12} md={8} xl={3}>
                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.nombre_completo}
                        </Typography.Text>
                    </Row>
                </Col>
                <Col xs={12} md={8} xl={4}>
                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.curp}
                        </Typography.Text>

                    </Row>
                </Col>
                <Col xs={24} md={8} xl={3}>
                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.municipio?.nombre}
                        </Typography.Text>

                    </Row>
                </Col>
                <Col xs={12} md={8} xl={2}>
                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.telefono}
                        </Typography.Text>
                    </Row>
                </Col>
                <Col xs={12} md={8} xl={2}>
                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.celular}
                        </Typography.Text>
                    </Row>
                </Col>
                <Col xs={24} md={8} xl={3}>

                    <Row justify={"center"}>
                        <Typography.Text ellipsis={true}>
                            {props.item.correo}
                        </Typography.Text>
                    </Row>
                </Col>
                <Col xs={24} md={12} xl={2}>
                    <Row justify={"center"}>
                        {renderAsunto(props.item.asunto)}
                    </Row>
                </Col>
                <Col xs={24} md={12} xl={2}>
                    <Row justify={"center"}>
                        {renderEstatus(props.item.estatus)}
                    </Row>
                </Col>
                <Col xs={24} md={24} xl={3}>
                    <Row justify={"center"}>
                        <Space>
                            <Popconfirm
                                placement="topRight"
                                title="¿Desea eliminar el turno?"
                                onConfirm={remove}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button>
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>

                            <Button onClick={() => props.edit(props.item._id)}>
                                <EditOutlined />
                            </Button>

                            <Popconfirm
                                placement="topRight"
                                title="¿Desea marcar como resuelto el turno?"
                                onConfirm={resolved}
                                okText="Si"
                                cancelText="No"
                                disabled={props.item.estatus === 1}
                            >
                                <Button disabled={props.item.estatus === 1}>
                                    <CheckOutlined />
                                </Button>
                            </Popconfirm>
                        </Space>

                    </Row>

                </Col>
            </Row>
        </Card>
    )
}