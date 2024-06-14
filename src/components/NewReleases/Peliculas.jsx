import React, { useState, useEffect } from 'react';
import "./peliculas.css";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Level from './Level.jsx';

const Peliculas = () => {
  const [pagina, setPagina] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);

  const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=7d93341e75f3672eaab256d04e2ef471&language=en-US`;
  const PELICULAS_POR_PAGINA = 8; // Número de películas por página

  useEffect(() => {
    cargarPeliculas();
  }, [pagina]);

  const cargarPeliculas = async () => {
    try {
      const respuesta = await fetch(`${URL_API}&page=${pagina}`);
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
      const data = await respuesta.json();
      if (!data.results) {
        throw new Error('No se encontraron resultados en la respuesta de la API.');
      }

      

      setPeliculas(data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSiguiente = () => {
    setPagina(prevPagina => prevPagina + 1);
  };

  const handleAnterior = () => {
    if (pagina > 1) {
      setPagina(prevPagina => prevPagina - 1);
    }
  };

  const peliculasParaMostrar = peliculas.slice(0, PELICULAS_POR_PAGINA);

  return (
    <div>
      <div className="contenedor" id="contenedor">
        {error ? (
          <p>Error al cargar las películas. Por favor, intenta de nuevo más tarde.</p>
        ) : (
          peliculasParaMostrar.map(pelicula => (
            <div className="pelicula" key={pelicula.id}>
              <div>
                <h3 className="titulo">{pelicula.title}</h3>
                <Canvas>
                  <Level textureUrl={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} />
                </Canvas>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="paginacion">
        <button id="btnAnterior" onClick={handleAnterior} disabled={pagina === 1}>Anterior</button>
        <button id="btnSiguiente" onClick={handleSiguiente}>Siguiente</button>
      </div>
    </div>
  );
};

export default Peliculas;
