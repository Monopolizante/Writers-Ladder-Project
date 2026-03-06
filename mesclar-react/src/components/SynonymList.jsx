
function SynonymList({ lista }) {
    // Se a lista estiver vazia, não desenha a <ul>
    if (lista.length === 0) return null;

    return (
        <ul className="synonym-list">
            {lista.map((sinonimo, index) => {
                const segundos = Math.floor(index / 10);
                const decimos = index % 10;
                const duration = `${segundos}.${decimos}s`;

                return (
                    <li
                        key={index}
                        style={{ animationDuration: duration }}
                        className="sinonimo-item"
                    >
                        {sinonimo}
                    </li>
                );
            })}
        </ul>
    );
}

export default SynonymList
