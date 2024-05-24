import React from 'react';
import Card from '../../../components/Card';
import Landing from '../../../components/Landing';
import Perfil from '../../../components/Perfil';
import PasswordReset from '@/app/components/RecuperarContra';
import Button from '@/app/components/Button';
const StandardProfilePage: React.FC = () => {
    return (
      <>
        <div className="pt-10">
          <div>
            <Perfil />
            <Landing />
          </div>
        </div>
        {/*<div className="right-panel">
          <Card />
        </div>*/}

      

    </>
    );
};

export default StandardProfilePage;