// src/components/MainPage.js
import React from 'react';

const MainPage = () => {
  return (
    <div>
      <header>
        <h1>Eventos de Motos</h1>
        <p>Bienvenido a la plataforma donde puedes ver y organizar eventos de motos.</p>
      </header>
      
      <section>
        <h2>Próximos eventos</h2>
        {/* Aquí iremos agregando los eventos */}
        <p>No hay eventos disponibles por ahora.</p>
      </section>
    </div>
  );
}

export default MainPage;
