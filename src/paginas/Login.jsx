import { useState } from 'react'
import { Link, useNavigate}  from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth} = useAuth()
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        try {   
            const {data} = await clienteAxios.post('/medicos/login', {email, password})
            localStorage.setItem('token', data.token)
            setAuth(data)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Ingreso exitoso',
                showConfirmButton: false,
                timer: 1800
            })

            setTimeout(() => {
                navigate('/admin');
            }, 2000);
            
        } catch (error) {
            Swal.fire(
                'Tu cuenta aún no ha sido confirmada',
                'Revisa tu correo para validar tu cuenta e iniciar sesión',
                'warning'
            )
        }
    }

    const { msg} = alerta

  return (
    <>
        <div>
            <h1 className="text-sky-600 font-black text-6xl uppercase">Inicia Sesión para comenzar a Administrar tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta 
                alerta={alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className="my-5 flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    
                    <input type="email" placeholder="Ingresa tu email" className="pl-2 outline-none border-none w-full" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="my-5 mt-8 flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <input type="password" placeholder="Ingresa tu password" autoComplete="on" className="pl-2 outline-none border-none w-full" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='text-end'>
                    <Link to="/olvide-password" className='text-sm text-indigo-600 hover:text-indigo-800'>¿Olvidaste tu contraseña?</Link>
                </div>
                <input type="submit" value="Iniciar Sesión" className="bg-sky-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-sky-800 md:w-auto"/>
            </form>

            <hr class="my-8 border-t" />

            <nav className='mt-8 text-center'>
                <p className='block text-center my-5 text-gray-500'>No tienes una cuenta? <Link to="/registrar" className='underline text-indigo-600 hover:text-indigo-800' >Registrate</Link></p>
            </nav>
        </div>
    </>
  )
}

export default Login