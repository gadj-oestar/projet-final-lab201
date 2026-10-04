export default function Ecouter() {
  return (
    <section id="ecouter" className="section section--sombre">
      <div className="section__tete">
        <p className="surtitre">Spotify</p>
        <h2>Écouter</h2>
      </div>
      <iframe
        className="lecteur"
        title="Pierre de Maere sur Spotify"
        src="https://open.spotify.com/embed/artist/13mm5rU1jvWfWG6uQ46ypd?utm_source=generator&theme=0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
}
