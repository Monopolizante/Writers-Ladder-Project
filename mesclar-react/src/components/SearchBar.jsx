import { useState } from "react";

function SearchBar({ onSearch }) {
    const [palavra, setPalavra] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Só pesquisa se a pessoa digitou algo (não está vazio)
        if (palavra.trim()) {
            onSearch(palavra); // Avisa o app passando a palavra
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={palavra}
                onChange={(e) => setPalavra(e.target.value)}
                placeholder="Type a word..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar
