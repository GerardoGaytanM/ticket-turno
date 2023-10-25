import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TicketForm from "./components/ticketForm";
import Login from "./components/login";
import Admin from "./components/admin/admin";
import Turnos from "./components/admin/turnos";

import axios from 'axios'
import User, { SetUser } from "./hooks/logged";
import { useState } from "react";
import LogOut from "./components/admin/logout";

axios.defaults.baseURL = 'http://127.0.0.1:4000/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(function (config) {
	config.headers.Authorization = sessionStorage.getItem("token")
	return config;
})

axios.interceptors.response.use(function (response) {
	if (response?.headers?.authorization)
		sessionStorage.setItem("token", response?.headers?.authorization)
	return response;
}, function (error) {

	// console.log("error", error.response.status)
	if (error.response.status == 401) {
		if (window.location.href.includes("/admin"))
		Modal.error({
			title: "Debe iniciar sesión para continuar",
			content: "Para poder acceder al sistema, debe iniciar sesión",
			cancelButtonProps:{
				style: {
					display: 'none'
				}
			},
			okText: "Ir a Iniciar Sesión", 
			onOk: () => window.location.replace("/login") 
		})
	}

	return Promise.reject(error);
});

export default function Index() {

    const [user, setUser] = useState(0)

    const router = createBrowserRouter([
        {
            path: '/ticket-turno/',
            element: <TicketForm/>
        },
        {
            path: '/ticket-turno/login',
            element: <Login/>
        },
        {
            path: '/ticket-turno/admin/',
            element: <Admin/>,
            children:[{
                path:'dashboard'
                
            },{
                path: 'turnos',
                element: <Turnos/>
            },{
                path: 'logout',
                element: <LogOut/>
            }]

        }
    ])

    return (
        <User.Provider value={user}>
            <SetUser.Provider value={setUser}>
                <RouterProvider router={router} />
            </SetUser.Provider>
        </User.Provider>
        
    )
}