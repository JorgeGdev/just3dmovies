// TrailersPage.jsx
import React, { useState, useRef } from 'react';
import TrailersComponent from '../trailer/TrailersComponent.jsx';
import CanvasTrailer from '../trailer/CanvasTrailer.jsx';

const TrailersPage = () => {
  const [videoId, setVideoId] = useState(null);
  const topRef = useRef(null);

  const handleSelectTrailer = (id) => {
    setVideoId(id);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={topRef}></div>
      <section className="cabecera">
        <div className="space-content container">
          <h1>Trailers</h1>
          <div className="trailer_container">
            <CanvasTrailer videoId={videoId} />
          </div>
          <p className="text-2xl">
            Check the trailer for your favourite movie just with one click.
          </p>
          <div className="caja">
            <TrailersComponent onSelectTrailer={handleSelectTrailer} />
          </div>
        </div>
      </section>
    </>
  );
};

export default TrailersPage;
