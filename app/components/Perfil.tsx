'use client';
import React, { useState, useEffect } from 'react';
import './PerfilStyle.css'; 
import Image from 'next/image';
import ImgProfile from './assetsProfile/profile.jpg'
import useFetchUser from './useFetchUser';
import { useRouter } from  "next/navigation";;
import RecuperarContra from "@/app/components/RecuperarContra";
const Perfil: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const { user, loading, error, fetchUser } = useFetchUser();
    useEffect(() => {
        fetchUser(4); 
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="containerPerfil">
            <div className="profile-wrapper">
                <div className="profile">
                    <div className="profile-image">
                        <Image
                            src={ImgProfile}
                            alt="Profile"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className="profile-name">
                    <h2>{`${user?.firstname} ${user?.lastname}`}</h2>
                    Datos: {user ? user.email : 'Loading...'} 
                        <div className="profile-bio">
                            <button onClick={handleOpenModal} className="disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2">Cambiar Contraseña</button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
                        <RecuperarContra />
                        <button onClick={handleCloseModal} className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;