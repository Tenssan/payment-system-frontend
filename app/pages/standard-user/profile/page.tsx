import React from 'react';
import Card from '../../../components/Card';
import Landing from '../../../components/Landing';
import Perfil from '../../../components/Perfil';

const StandardProfilePage: React.FC = () => {
    return (
        <div>
      <div className="left-panel">
        <Perfil />
      </div>
      <div className="right-panel">
        <Card />
      </div>
      <div className="bottom-panel">
        <Landing />
      </div>
    </div>
    );
};

export default StandardProfilePage;