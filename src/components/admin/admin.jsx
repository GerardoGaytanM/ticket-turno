import { Layout,Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router";
import { PieChartOutlined, AppstoreOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem('Dashboad', 'dashboard', <PieChartOutlined />),
    getItem('Turnos', 'turnos', <AppstoreOutlined />),
    getItem('Cerrar Sesión', 'logout', <LockOutlined/>)
  ];


export default function Admin () {

  const navigate = useNavigate()

  const handleSelect = (e) => {
    console.log(e)
    navigate(e.key)
  }


    return(
        <Layout style={{minHeight:'100vh', minWidth:'100vw'}}>
            <Sider collapsible >
                <Menu 
                theme="dark"  
                mode="inline"
                onSelect={handleSelect} 
                items={items} 
                style={{marginTop:"1em", minHeight:"100%"}} />
            </Sider>
            <Layout>
                <Outlet/>
            </Layout>
        </Layout>
    )

}