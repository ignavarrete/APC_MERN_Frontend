import useAuth from '../hooks/useAuth'

const Header = () => {

  const { cerrarSesion, auth } = useAuth()
  const nombreUsuario = auth.nombre;

  return (
    <header className="py-10 bg-sky-600 ">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {''} <span className="text-white font-black">Clinica</span> </h1>
        
        <h3 className='text-white text-lg'>Bienvenido/a : <span className='font-bold'>{nombreUsuario}</span></h3>
        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
          <a href="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</a>
          <a href="/admin/perfil" className='text-white text-sm uppercase font-bold' >Perfil</a>

          <button type='button' className='text-white text-sm uppercase font-bold' onClick={cerrarSesion}>Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header