'use client';
import React, { useState } from 'react';
import './RecuperarContraStyle.css';
import { useRouter } from "next/navigation";

const PasswordReset: React.FC = () => {
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      alert("Las contraseñas nuevas no coinciden.");
      return;
    }
    // Aquí iría la lógica para manejar el cambio de contraseña
    console.log('Contraseña antigua:', oldPassword);
    console.log('Nueva contraseña:', newPassword);
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handleSubmit} className="password-reset-form">
        <h2>Cambiar Contraseña</h2>
        <div className="form-group">
          <label htmlFor="old-password">Contraseña Antigua</label>
          <input
            type="password"
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Contraseña Nueva</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeat-password">Repetir Contraseña</label>
          <input
            type="password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default PasswordReset;