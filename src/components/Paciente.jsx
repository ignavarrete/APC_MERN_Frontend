import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes();

    const { nombre, apellido, email, rut, telefono, region, comuna, fecha, sintomas, _id} = paciente;

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date (Date.UTC(year,mes, dia));
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES');
  
    return (
        <div className="ml-10 mb-10 mr-5 bg-white shadow-md px-5 py-6 rounded-xl m-">

            <h2 className="font-bold mb-3 text-sky-600 text-center uppercase text-xl">Registro médico</h2>

            <h3 className="font-bold mb-3 text-gray-700 uppercase underline">Datos del paciente </h3>

            <div className="flex justify-between mx-2 flex-wrap">
                <p className="font-bold uppercase text-sky-700 my-2" >Nombre: {''} <span className="font-normal normal-case text-black">{nombre}</span></p>
                <p className="font-bold uppercase text-sky-700 my-2" >Apellido: {''} <span className="font-normal normal-case text-black">{apellido}</span></p>
            </div>

            <div className="flex justify-between mx-2 flex-wrap">
                <p className="font-bold uppercase text-sky-700 my-2" >Email: {''} <span className="font-normal normal-case text-black">{email}</span></p>
                <p className="font-bold uppercase text-sky-700 my-2" >Teléfono: {''} <span className="font-normal normal-case text-black">{telefono}</span></p>
                
            </div>

            <div className="flex justify-between mx-2 flex-wrap">
            <p className="font-bold uppercase text-sky-700 my-2" >Rut: {''} <span className="font-normal normal-case text-black">{rut}</span></p>
                <p className="font-bold uppercase text-sky-700 my-2" >Región: {''} <span className="font-normal normal-case text-black">{region}</span></p>
                
            </div>

            <div className="flex justify-between mx-2 flex-wrap">
                <p className="font-bold uppercase text-sky-700 my-2" >Comuna: {''} <span className="font-normal normal-case text-black">{comuna}</span></p>
            </div>
            <h3 className="font-bold my-2 text-gray-700 uppercase underline">Datos médicos </h3>
            <div className="flex justify-between mx-2 flex-wrap">
                <p className="font-bold uppercase text-sky-700 my-2" >Sintomas: {''} <span className="font-normal normal-case text-black">{sintomas}</span></p>
                <p className="font-bold uppercase text-sky-700 my-2" >Fecha de alta: {''} <span className="font-normal normal-case text-black">{fechaFormateada}</span></p>
            </div>


            

            
           
            <hr className="mt-10" />

            <div className="flex justify-between my-5"> 
                <button type="button" className="py-2 px-10 bg-cyan-600 hover:bg-cyan-700 text-white uppercase font-bold rounded-lg" onClick={() => setEdicion(paciente)}>Editar</button>

                <button type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg" onClick={() => eliminarPaciente(_id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente
