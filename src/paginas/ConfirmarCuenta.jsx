import { useEffect, useState} from 'react'
import { useParams, Navigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { id } = params;

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/medicos/confirmar/${id}`
        const { data} = await clienteAxios(url)

        setTimeout(() => {
          setCuentaConfirmada(true)
        }, 7000);

        Toast.fire({
          icon: 'success',
          title: 'Cuenta confirmada, serás redireccionado al login'
        })

        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
      setCargando(false);
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl ">Confirma tu cuenta y comienza a administrar <span className="text-black">tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        {!cargando && <Alerta 
          alerta={alerta}
        />}
        
        {cuentaConfirmada && (
          <Navigate to="/" />
        )} 
      </div>
    </>
  )
}

export default ConfirmarCuenta
