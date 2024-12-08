import React from 'react';
import GenreList from './components/generoLista';
import DirectorList from './components/directorList';
import ProducerList from './components/productoraList';
import TypeList from './components/tipoList';
import MediaList from './components/mediaList';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Películas y Series</h1>
      <GenreList />
      <DirectorList />
      <ProducerList />
      <TypeList />
      <MediaList />
    </div>
  );
}

export default App;