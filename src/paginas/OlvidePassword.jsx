import { useState} from 'react';
import { Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    
    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' || email.length < 6) {
            setAlerta({ msg: 'El email es obligatorio', error: true})
            return;
        }

        try {
            const { data } = await clienteAxios.post('/medicos/olvide-password', { email });

            console.log(data)
            setAlerta({ msg: data.msg})

            setTimeout(() => {
                setAlerta({})
            }, 8000);
            
        } catch (error) {
            setAlerta({ 
                msg: error.response.data.msg,
                error: true
            })
        }
        setEmail('')
    }   

    const { msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-sky-600 font-black text-6xl uppercase">Recupera el acceso de tu <span className="text-black">cuenta</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { msg && <Alerta 
                alerta={alerta}
            />}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}/>
                </div>

                <input type="submit" value="Enviar Instrucciones" className="bg-sky-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-sky-800 md:w-auto"/>
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <p className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? <Link to="/" className='underline text-indigo-600 hover:text-indigo-800'>Inicia sesión</Link></p>
                <p className='block text-center my-5 text-gray-500'>No tienes una cuenta? <Link to="/registrar" className='underline text-indigo-600 hover:text-indigo-800' >Registrate</Link></p>
            </nav>

        </div>
    </>
  )
}

export default OlvidePassword