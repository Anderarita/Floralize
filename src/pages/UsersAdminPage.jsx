import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export const UsersAdminPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = () => {
        // Logic to register the new user
        console.log({ name, email, password, role });
    };

    const handleCancel = () => {
        // Logic to cancel the registration
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 relative">
                <Header />
                <div className="flex justify-center items-center h-full p-4">
                    <div className="w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 p-2 border-b border-[#9a5ea7] w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Correo</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 border-b border-[#9a5ea7] w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 border-b border-[#9a5ea7] w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Rol</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 p-2 border border-[#9a5ea7] rounded-full w-full"
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="empleado">Empleado</option>
                                <option value="administrador">Administrador</option>
                                <option value="gerente">Gerente</option>
                                <option value="bodega">Bodega</option>
                                <option value="caja">Caja</option>
                            </select>
                        </div>
                        <div className="flex justify-center space-x-4 mt-9">
                            <button
                                onClick={handleRegister}
                                className="bg-[#9a5ea7] text-white p-2 rounded-full hover:bg-[#732d91]"
                            >
                                Registrar nuevo usuario
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-[#9a5ea7] text-white p-2 rounded-full hover:bg-[#732d91]"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

