function AudioButton({ audioUrl }) {
  // Se a API não devolver nenhum áudio para a palavra, não mostramos o botão
  if (!audioUrl) return null;

  const tocarAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <button 
      onClick={tocarAudio} 
      className="audio-button"
      title="Ouvir pronúncia"
      style={{
        background: 'var(--primary-gradient)',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.4)',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Ícone de Play (SVG puro, sem precisar de bibliotecas) */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28px" height="28px">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

export default AudioButton;