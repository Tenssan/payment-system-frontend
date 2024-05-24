'use client';
import React, { useState } from 'react';
import './RecuperarContraStyle.css';
import useChangePassword from './useFetchRecuperarContra';

const PasswordReset: React.FC= () => {
  const { loading, error, success, changePassword } = useChangePassword();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      alert("Las contraseñas nuevas no coinciden.");
      return;
    }
    await changePassword(oldPassword, newPassword);
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
        <button type="submit" disabled={loading}>Cambiar Contraseña</button>
        {error && <p className="error">Error cambiando la contraseña</p>}
        {success && <p className="success">Contraseña cambiada exitosamente</p>}
      </form>
    </div>
  );
};

export default PasswordReset;