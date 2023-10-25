import { List, Typography, Row, Space, Button, message, Col, Input, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import CardTurno from "./cardTurno";
import ModalTurno from "./modalEditarTurno";
import axios from "axios";

export default function Turnos() {
    const [turnos, setTrunos] = useState({
        data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        page: 1,
        pages: 1,
        total: 10,
        limit: 10,
        municipio: undefined
    })

    const [modalTurno, setModalTurno] = useState(false)
    const [id, setID] = useState(null)

    const [municipios, setMunicipios] = useState([])

    const getMunicipios = () => {
        axios.get('/municipios', {}).then((({ data }) => {
            console.log(data)
            setMunicipios(data.data)
        }))
    }

    const getTurnos = ({
        page = turnos.page,
        limit = turnos.limit,
        search = turnos.search,
        municipio = turnos.municipio
    } = turnos) => {
        console.log("search", search)
        setTrunos({ ...turnos }, page, limit, search, municipio)
        axios.get('/turnos', {
            params: {
                page,
                limit,
                search,
                municipio
            }
        }).then(({ data }) => {
            console.log("update", data)
            setTrunos(data.data)
        }).catch(err => {
            message.error("Error al obtener turnos")
        })
    }

    useEffect(() => {
        getTurnos()
        getMunicipios()
    }, [])

    return (
        <Content className="content" style={{ margin: "1em" }}>
            <List
                dataSource={turnos.data}
                header={<Row justify={"space-between"} align={"middle"} gutter={[20,8]}>
                    <Typography.Title>
                        Turnos
                    </Typography.Title>
                    <Col xs={24} sm={24} md={12} lg={10}>
                        <Row>
                            <Col span={12}>
                                <Input onChange={e => getTurnos({search: e.target.value})} suffix={<SearchOutlined />} />
                            </Col>
                            <Col span={12}>
                                <Select className='w-100' allowClear={true} onChange={e => {getTurnos({municipio: e})}}>
                                    {municipios.map(e => {
                                        return <Select.Option value={e._id}>
                                            {e.nombre}
                                        </Select.Option>
                                    })}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>}
                renderItem={(item) => (
                    <List.Item>
                        <CardTurno key={item._id} item={item} update={getTurnos} edit={(id) => { console.log(id); setID(id); setModalTurno(true) }} />
                    </List.Item>
                )}
                pagination={{
                    current: turnos.page,
                    pageSize: turnos.limit,
                    total: turnos.total,
                    position: "bottom",
                    onChange: (page, limit) => getTurnos({ page, limit })
                }}
            />
            <ModalTurno id={id} open={modalTurno} update={getTurnos} onCancel={() => { setID(false); setModalTurno(false) }} />
        </Content>
    )

}