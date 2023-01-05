const AdminNav = () => {
   return (
     <nav className='flex gap-3'>
        <a href="/admin/perfil" className="font-bold uppercase text-gray-500">Editar Perfil</a>
        <a href="/admin/cambiar-password" className="font-bold uppercase text-gray-500">Cambiar password</a>
     </nav>
   )
}

export default AdminNav