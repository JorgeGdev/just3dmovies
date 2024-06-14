// TrailersComponent.jsx
import { useEffect, useState } from "react";
import "../trailer/trailerstyle.css";

const TrailersComponent = ({ onSelectTrailer }) => {
  const [pagina, setPagina] = useState(1);
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);

  const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=7d93341e75f3672eaab256d04e2ef471&language=en-US`;

  useEffect(() => {
    cargarTrailers();
  }, [pagina]);

  const cargarTrailers = async () => {
    try {
      const respuesta = await fetch(`${URL_API}&page=${pagina}`);
      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }
      const data = await respuesta.json();
      if (!data.results) {
        throw new Error('No se encontraron resultados en la respuesta de la API.');
      }

      const trailersConVideos = await Promise.all(
        data.results.map(async (trailer) => {
          const videoRespuesta = await fetch(`https://api.themoviedb.org/3/movie/${trailer.id}/videos?api_key=7d93341e75f3672eaab256d04e2ef471`);
          const videoData = await videoRespuesta.json();
          const trailerVideo = videoData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          return {
            ...trailer,
            youtubeTrailerId: trailerVideo ? trailerVideo.key : null
          };
        })
      );

      setTrailers(trailersConVideos);
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

  const handleTrailerClick = (youtubeTrailerId) => {
    if (youtubeTrailerId) {
      onSelectTrailer(youtubeTrailerId);
    } else {
      alert('Tráiler no disponible.');
    }
  };

  return (
    <div>
      <div className="contenedor" id="contenedor">
        {error ? (
          <p>Error al cargar las películas. Por favor, intenta de nuevo más tarde.</p>
        ) : (
          trailers.map(trailer => (
            <div className="trailer" key={trailer.id} onClick={() => handleTrailerClick(trailer.youtubeTrailerId)}>
              <img className="poster" src={`https://image.tmdb.org/t/p/w500/${trailer.poster_path}`} alt={trailer.title} />
              <div>
                <h3 className="titulo">{trailer.title}</h3>
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

export default TrailersComponent;
