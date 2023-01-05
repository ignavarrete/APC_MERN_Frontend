import { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {format} from 'rut.js'
import ComunasRegiones from '../comunas-regiones.json'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [rut, setRut] = useState('')
    const [telefono, setTelefono] = useState('')
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedComuna, setSelectedComuna] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const {guardarPaciente, paciente } = usePacientes()
    const obtenerComuna = ComunasRegiones.regiones.find((obj) => obj.region === selectedRegion);

    const { register, formState: {errors} , handleSubmit } = useForm();

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); 
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    useEffect( () => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setApellido(paciente.apellido)
            setEmail(paciente.email)
            setRut(paciente.rut)
            setTelefono(paciente.telefono)
            setSelectedRegion(paciente.region)
            setSelectedComuna(paciente.comuna)
            setFecha(paciente.fecha.substring(0, 10))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const onSubmit = (data, e) => {
        e.preventDefault()

        guardarPaciente({
            nombre, 
            apellido, 
            email, 
            rut: format(rut),
            telefono,
            region: selectedRegion,
            comuna: selectedComuna,
            fecha,
            sintomas,
            id
        })

        Toast.fire({
            icon: 'success',
            title: 'Paciente agregado con éxito...'
        })

        setNombre('');
        setApellido('');
        setEmail('');
        setRut('');
        setTelefono('')
        setSelectedRegion('');
        setSelectedComuna('');
        setFecha('');
        setSintomas('');
        setId(null);
    }

  return (
    <>
        <h2 className="font-black text-3xl text-center">Ingreso de pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center" >Añade pacientes y {''} <span className="text-sky-600 font-bold" >administralos</span></p>

        <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold "> Nombre del Paciente</label>
                <input type="text" id="nombre" placeholder="Nombre del paciente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                {...register("nombre", { required: true, minLength: 3, maxLength: 45, pattern: /^[A-Za-z]+$/i})}
                value={nombre} 
                onChange={e => setNombre(e.target.value)}
                />

                {errors?.nombre?.type === 'required' && <span className='font-bold text-red-400'>El nombre es obligatorio</span>}
                {errors?.nombre?.type === 'minLength'  && <span className='font-bold text-red-400'>El nombre debe tener mínimo 3 caracteres</span>}
                {errors?.nombre?.type === 'maxLength' && <span className='font-bold text-red-400'>El nombre debe tener máximo 45 caracteres</span>}
                {errors?.nombre?.type === 'pattern' && <span className='font-bold text-red-400'>Solo puedes ingresar caracteres alfabéticos</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="apellido" className="text-gray-700 uppercase font-bold ">Apellido del Paciente</label>
                <input type="text" id="apellido" placeholder="Apellido del paciente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                {...register("apellido", { required: true, minLength: 3, maxLength: 40, pattern: /^[A-Za-z]+$/i})}
                value={apellido} 
                onChange={e => setApellido(e.target.value)}
                />

                {errors?.apellido?.type === 'required' && <span className='font-bold text-red-400'>El apellido es obligatorio</span>}
                {errors?.apellido?.type === 'minLength' && <span className='font-bold text-red-400'>El apellido debe tener mínimo 3 caracteres</span>}
                {errors?.apellido?.type === 'maxLength' && <span className='font-bold text-red-400'>El apellido debe tener máximo 40 caracteres</span>}
                {errors?.apellido?.type === 'pattern' && <span className='font-bold text-red-400'>Solo puedes ingresar caracteres alfabéticos</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold ">Email del Paciente</label>
                <input type="email" id="email" placeholder="Email del paciente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i})}
                value={email} 
                onChange={e => setEmail(e.target.value)}
                />

                {errors?.email?.type === 'required' && <span className='font-bold text-red-400'>El Email es obligatorio</span>}
                {errors?.email?.type === 'pattern' && <span className='font-bold text-red-400'>El formato del correo no es correcto</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="rut" className="text-gray-700 uppercase font-bold ">RUT del Paciente</label>
                <input type="number" id="rut" placeholder="Rut del paciente sin punto ni guión" min="0" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                {...register("rut", { required: true})}
                value={rut}
                onChange={e => setRut(e.target.value)}
                />

                {errors?.rut?.type === 'required' && <span className='font-bold text-red-400'>El Rut es obligatorio</span>}
            </div>
            
            <div className="mb-5">
                <label htmlFor="telefono" className="text-gray-700 uppercase font-bold ">Teléfono del Paciente</label>
                <input type="tel" id="telefono" placeholder="Teléfono del paciente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                {...register("telefono", { required: true, minLength: 8, maxLength: 11, pattern: /^[0-9]+$/})}
                value={telefono} 
                onChange={e => setTelefono(e.target.value)}
                />

                {errors?.telefono?.type === 'required' && <span className='font-bold text-red-400'>El Teléfono es obligatorio</span>}
                {errors?.telefono?.type === 'minLength' && <span className='font-bold text-red-400'>El número debe tener mínimo 8 dígitos</span>}
                {errors?.telefono?.type === 'maxLength' && <span className='font-bold text-red-400'>El número debe tener máximo 11 dígitos</span>}
                {errors?.telefono?.type === 'pattern' && <span className='font-bold text-red-400'>El formato no es correcto</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="region" className="text-gray-700 uppercase font-bold ">Región del Paciente</label>
                <select name="region" id="region" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                {...register("region", { required: true})}
                value={selectedRegion || ''} 
                onChange={ e => setSelectedRegion(e.target.value)}>
                    <option value={''} disabled >-- Seleccione una región --</option>
                    {
                        ComunasRegiones.regiones.map((result, key) => (
                            <option value={result.region} key={key}>{result.region}</option>
                        ))
                    }
                </select>

                {errors?.region?.type === 'required' && <span className='font-bold text-red-400'>Seleccione una region</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="comuna" className="text-gray-700 uppercase font-bold ">Comuna del Paciente</label>
                <select name="comuna" id="comuna" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                {...register("comuna", { required: true})}
                value={selectedComuna || ''} 
                onChange={ e => setSelectedComuna(e.target.value)}>
                    <option value={''} disabled >-- Seleccione una región --</option>
                    {
                        obtenerComuna?.comunas.map((result, key) => (
                            <option value={result.region} key={key}>{result}</option>
                        ))
                    }
                </select>

                {errors?.comuna?.type === 'required' && <span className='font-bold text-red-400'>Seleccione una comuna</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold ">Fecha de alta</label>
                <input type="date" id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" min={disablePastDate()}
                {...register("fecha", { required: true})}
                value={fecha} 
                onChange={e => setFecha(e.target.value)}
                />

                {errors?.fecha?.type === 'required' && <span className='font-bold text-red-400'>Seleccione una fecha</span>}
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold ">Sintomas</label>
                <textarea id="sintomas" placeholder="Describe los sintomas.." className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                {...register("sintomas", { required: true})}
                value={sintomas} 
                onChange={e => setSintomas(e.target.value)}
                />

                {errors?.sintomas?.type === 'required' && <span className='font-bold text-red-400'>Sintomas es obligatorio</span>}
            </div>

            <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} 
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors"/>

        </form>
    </>
  )
}

export default Formulario
