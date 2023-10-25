import { useContext, useEffect } from "react"
import { SetUser } from "../../hooks/logged"
import useConfig from "antd/es/config-provider/hooks/useConfig"
import { useNavigate } from "react-router-dom"

export default function LogOut() {

    const setUser = useContext(SetUser)
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear()
        setUser(undefined)
        navigate('/ticket-turno/')
    },[])

    return(
        <>
        </>
    )
}