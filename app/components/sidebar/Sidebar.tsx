import React from 'react';
import Image from 'next/image';
import logo from '../../../public/imgs/ucn-logo.png';
import bgImage from '../../../public/imgs/ucn-bg.png';

const Sidebar: React.FC = () => {
    return (
        <nav className="fixed left-0 top-0 h-full w-64 text-white flex flex-col justify-between bg-center bg-opacity-30" style={{backgroundImage: `url(${bgImage.src})`}}>
            <div className="flex flex-col items-center p-4">
                <div className="mb-8 w-full flex justify-center">
                    <Image src={logo} alt="Logo UCN"/>
                </div>
                <div className="flex flex-col space-y-4 w-full">
                    <button className="py-2 px-4 w-full text-left hover:bg-gray-700">Home</button>
                    <button className="py-2 px-4 w-full text-left hover:bg-gray-700">Transacciones</button>
                    <button className="py-2 px-4 w-full text-left hover:bg-gray-700">Perfil</button>
                    <button className="py-2 px-4 w-full text-left hover:bg-gray-700">Pago</button>
                </div>
            </div>
            <div className="p-4">
                <button className="py-2 px-4 w-full text-left hover:bg-gray-700">Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Sidebar;
