import { useState } from 'react'
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <div className="flex flex-col md:flex-row lg:mx-10">
            <button type='button' 
            className='bg-indigo-600 text-white font-bold uppercarse mx-10 p-3 rounded-md mb-10 md:hidden' 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                
            {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>

            <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-1/3 ml-10`}>
            <Formulario /> 
            </div>

            <div className="md:w-1/2 lg:w-3/3 ml-10">
            <ListadoPacientes /> 
            </div>
        </div>
    )
}
  
export default AdministrarPacientes
