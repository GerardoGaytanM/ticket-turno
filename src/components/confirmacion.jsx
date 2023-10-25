import React, { useRef } from "react";
import { Button, Modal, QRCode, Row, Typography } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from '@ant-design/icons'

class ComponentToPrint extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            numero: 0,
            curp:"XXXX000000XXXXXXX0"
        }
    }

    componentDidMount() {
        this.setState({
            numero: this.props.numero,
            curp: this.props.curp
        })
    }
    

    render() {
        return (
            <div>
                <Row justify={"center"} style={{ marginTop: "2em" }}>
                    <QRCode value={this.state.curp} />

                </Row>
                <Row justify={"center"} style={{ marginTop: "2em" }}>
                    <Typography.Text>Numero de turno: </Typography.Text>
                </Row>
                <Row justify={"center"} style={{ marginTop: "1em" }}>
                    <Typography.Title>{this.state.numero}</Typography.Title>
                </Row>
                <Row justify={"center"} style={{ marginTop: "1em" }}>
                    <Typography.Text>CURP</Typography.Text>
                </Row>
                <Row justify={"center"} style={{ marginTop: "1em" }}>
                    <Typography.Title>{this.state.curp}</Typography.Title>
                </Row>
            </div>
        );
    }
}

export default function PrintComponent(props) {
    let componentRef = useRef();

    return (
        <Modal {...props} footer={null} destroyOnClose={true}>
            <div>
                
                <ReactToPrint
                    trigger={() => <Button ><PrinterOutlined/> Imprimir mi comprobante</Button>}
                    content={() => componentRef}
                />

                <ComponentToPrint ref={(el) => (componentRef = el)} numero={props.numero} curp={props.curp}/>

            </div>
        </Modal>
    );
}