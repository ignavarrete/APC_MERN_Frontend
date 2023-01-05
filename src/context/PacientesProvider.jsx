import {createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {
    const { auth } = useAuth();

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const Toast = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'Titulo',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/pacientes', config)
                setPacientes(data); 

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) {
            try {   
                const { data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado)

                Toast.fire({
                    animation: true,
                    title: 'Paciente editado correctamente'
                });
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                const { data} = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
    
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }
   
    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = await Swal.fire({
            title: '¿Estas seguro de eliminar este paciente?',
            text: "!No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
            }).then((result) => {
            if (result.isConfirmed) {
                return true;
            } else {
                return false;
            }
        })

        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)

                setPacientes(pacientesActualizado)

                Toast.fire({
                    animation: true,
                    title: 'Eliminado correctamente'
                });

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <PacientesContext.Provider 
            value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente}}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;
