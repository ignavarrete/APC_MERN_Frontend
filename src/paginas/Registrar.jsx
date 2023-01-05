import { useState} from 'react'
import { Link} from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta'

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({ msg: 'Hay campos vacios', error: true})
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({ msg: 'Los password no son iguales', error: true})
            return;
        }

        if(password.length < 6 ) {
            setAlerta({ msg: 'El password es muy corto, debe contener mínimo 6 caracteres', error: true})
            return;
        }

        setAlerta({})

        try {
            await clienteAxios.post('/medicos', { nombre, email, password})

            Swal.fire(
                'Cuenta creada correctamente',
                'Revisa tu correo para validar tu cuenta',
                'success'
            )

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, 
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-sky-600 font-black text-6xl uppercase">Crea tu cuenta y comienza a administrar <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { msg && <Alerta 
                    alerta={alerta}
                /> }
            
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input type="text" placeholder="Tu nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        value={nombre} 
                        onChange={ e => setNombre(e.target.value)}/>
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        value={email} 
                        onChange={ e => setEmail(e.target.value)}/>
                    </div>
                    
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password" placeholder="Tu password" autoComplete="on" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        value={password} 
                        onChange={ e => setPassword(e.target.value)}/>
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                        <input type="password" placeholder="Repite tu password" autoComplete="on" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        value={repetirPassword} 
                        onChange={ e => setRepetirPassword(e.target.value)}/>
                    </div>

                    <input type="submit" value="Crear cuenta" className="bg-sky-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-sky-800 md:w-auto"/>
            
                </form>

                <nav className='mt-10 flex justify-end'>
                    <p className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? <Link to="/" className='underline text-indigo-600 hover:text-indigo-800'>Inicia sesión</Link></p>
                </nav>

            </div>

        </>
    )
}

export default Registrar