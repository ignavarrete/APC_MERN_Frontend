import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {

  const {pacientes} = usePacientes();
    
  return (
    <div>
      { pacientes.length ?(
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center" >Administra tus {''} <span className="text-sky-600 font-bold" >Pacientes</span></p>
          <div className="overflow-y-auto h-screen">
            {pacientes.map(paciente => (
              <Paciente 
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </div>

        </> 
      ) :
      (
        <>
          <h2 className="font-black text-3xl text-center">Aún no hay pacientes agregados</h2>

          <p className="text-xl mt-5 mb-10 text-center" >Comienza agregando pacientes {''}
          <span className="text-sky-600 font-bold">y aparecerán en este lugar</span></p>
        </>

      )}
    </div>
  )
}

export default ListadoPacientes
