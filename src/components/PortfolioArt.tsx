/** Original vector compositions; project artwork is illustrative, not a product screenshot. */
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-topline"><span>THE INTERSECTION OF</span><span>01 / ∞</span></div>
      <div className="art-grid">
        <div className="art-tile art-fan">
          <svg viewBox="0 0 240 240" fill="none">
            {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M 16 224 A ${32 + i * 13} ${32 + i * 13} 0 0 1 ${48 + i * 13} ${192 - i * 13}`} stroke="#d4e8cc" strokeWidth="2" />)}
            <circle cx="17" cy="223" r="13" fill="#e9b875" />
          </svg>
          <span className="tile-label">LOGIC</span>
        </div>
        <div className="art-tile art-sun"><div className="sun-shape" /><span className="tile-label">CURIOSITY</span><span className="tiny-plus">+</span></div>
        <div className="art-tile art-checker"><div className="checker-orb" /><span className="tile-label">STRUCTURE</span></div>
        <div className="art-tile art-wave">
          <svg viewBox="0 0 240 240" fill="none">
            {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M -25 ${45 + i * 12} C 65 ${-35 + i * 12}, 140 ${225 + i * 6}, 270 ${80 + i * 12}`} stroke="#e4c79e" strokeWidth="2" />)}
          </svg>
          <span className="tile-label">CREATIVITY</span>
        </div>
      </div>
      <div className="art-center">ia<span>✳</span></div>
      <div className="art-bottomline"><span>DATA MEETS DESIGN</span><span>↓</span></div>
      <div className="art-note"><span className="note-dot" /> Dibangun dengan rasa ingin tahu.</div>
    </div>
  );
}

export function ProjectArt({ index }: { index: number }) {
  return (
    <div className={`project-art project-art-${index}`} aria-hidden="true">
      <div className="preview-top"><span>ILHAM / EXPLORATIONS</span><span>0{index + 1}</span></div>
      {index === 0 && <div className="nlp-art"><div className="pitch"><div className="pitch-circle" /><span className="pitch-ball" /></div><div className="comment-bubble">“Sebuah gol yang luar biasa!”<span>TEKS → DISTILBERT → EVENT</span></div><div className="event-pill">↗ &nbsp; Gol terdeteksi</div></div>}
      {index === 1 && <div className="legal-art"><div className="document document-back" /><div className="document"><span>§</span><i /><i /><i /><small>CASE RETRIEVAL</small></div><div className="match-pill">↗ &nbsp; Temukan keterkaitan.</div></div>}
      {index === 2 && <div className="agri-art"><svg viewBox="0 0 300 180"><path d="M150 160V50" stroke="#35654e" strokeWidth="3" /><path d="M150 115C70 115 75 40 75 40C148 40 150 115 150 115" fill="#73946a" /><path d="M150 85C220 85 225 15 225 15C153 15 150 85 150 85" fill="#305f4e" /><path d="M150 153C213 153 222 95 222 95C160 95 150 153 150 153" fill="#c0ad59" /><path d="M70 166H234" stroke="#35654e" strokeWidth="2" /></svg><span className="agri-caption">GROW WITH DATA.</span></div>}
      {index === 3 && <div className="dashboard-art"><div className="mini-sidebar"><i /><i /><i /><i /></div><div className="mini-dashboard"><span>Analytics overview <span>↗</span></span><div className="mini-stats"><i /><i /><i /></div><div className="chart-bars">{[35, 58, 45, 78, 62, 88, 72, 95].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div></div></div>}
      {index === 4 && <div className="website-art"><div className="mini-nav"><strong>studio.</strong><span>ABOUT &nbsp; WORK &nbsp; CONTACT</span></div><div className="mini-website"><div>Ideas into<br /><em>possibilities.</em><i /></div><div className="website-sculpture" /></div></div>}
      {index === 5 && <div className="portfolio-art"><span>PORTFOLIO / PERSONAL</span><div>ilham<span>✳</span></div><p>Data. Code. A little creativity.</p></div>}
      <span className="illustration-label">ILUSTRASI PROYEK</span>
    </div>
  );
}
