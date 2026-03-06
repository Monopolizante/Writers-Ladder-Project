import { useState } from 'react';
import axios from 'axios';

// As tuas peças de Lego
import SearchBar from './components/SearchBar';
import ErrorMessage from './components/ErrorMessage';
import SynonymList from './components/SynonymList';
import AudioButton from './components/AudioButton';

import './App.css';

function App() {
  // Agora guardamos tudo num único estado chamado "dadosPalavra"
  const [dadosPalavra, setDadosPalavra] = useState(null);
  const [erro, setErro] = useState('');

  const fazerPesquisa = async (palavraBuscada) => {
    setErro('');
    setDadosPalavra(null); // Limpa o ecrã para a nova animação acontecer
    
    const palavraLimpa = palavraBuscada.toLowerCase().trim();

    try {
      // Usando a API oficial e gratuita do Dictionary
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavraLimpa}`);
      const dadosDaApi = response.data[0]; // A API devolve um array, pegamos o primeiro item

      // 1. Procurar o ficheiro de áudio certo (alguns nós da API vêm vazios)
      const phoneticsComAudio = dadosDaApi.phonetics.find(phone => phone.audio && phone.audio.length > 0);
      const urlDoAudio = phoneticsComAudio ? phoneticsComAudio.audio : null;

      // 2. Procurar o texto fonético (ex: /həˈloʊ/)
      const textoFonetico = dadosDaApi.phonetic || (phoneticsComAudio ? phoneticsComAudio.text : '');

      // 3. Juntar todos os sinónimos (a API separa por significados, nós juntamos tudo numa lista só)
      let todosSinonimos = [];
      dadosDaApi.meanings.forEach(meaning => {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          todosSinonimos = [...todosSinonimos, ...meaning.synonyms];
        }
      });
      
      // Remove sinónimos duplicados
      todosSinonimos = [...new Set(todosSinonimos)];

      // 4. Guardar tudo no nosso estado
      setDadosPalavra({
        palavra: dadosDaApi.word,
        fonetica: textoFonetico,
        audioUrl: urlDoAudio,
        sinonimos: todosSinonimos
      });

    } catch (error) {
      console.log("Erro na pesquisa:", error.message);
      setErro("Oops! We couldn't find that word. Try another one.");
    }
  };

  return (
    <div className="container">
      <h1>Writers Ladder Turbo</h1>
      
      <SearchBar onSearch={fazerPesquisa} />
      
      <ErrorMessage mensagem={erro} />
      
      {/* Só desenha esta parte se a palavra foi encontrada (dadosPalavra não é null) */}
      {dadosPalavra && (
        <div className="word-result">
          
          {/* O cabeçalho com a palavra gigante e o botão de áudio */}
          <div className="word-header">
            <div>
              <h2 className="word-title">{dadosPalavra.palavra}</h2>
              {dadosPalavra.fonetica && <p className="word-phonetic">{dadosPalavra.fonetica}</p>}
            </div>
            
            <AudioButton audioUrl={dadosPalavra.audioUrl} />
          </div>

          {/* Renderiza a lista de sinónimos apenas se houver algum */}
          {dadosPalavra.sinonimos.length > 0 ? (
            <div className="synonyms-container">
              <span className="synonyms-label">Synonyms:</span>
              <SynonymList lista={dadosPalavra.sinonimos} />
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No synonyms found for this word.</p>
          )}

        </div>
      )}
    </div>
  );
}

export default App;