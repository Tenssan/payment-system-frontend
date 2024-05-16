import React from 'react';


import Landing from './components/Landing';
import Perfil from './components/Perfil';
import Card from './components/Card';


const Home: React.FC = () => {
  return (
    <div className="container">
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

export default Home;