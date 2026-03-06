
function ErrorMessage({ mensagem }) {
    // Se a mensagem for vazia, não desenha nada na tela
    if (!mensagem) return null;


    return (
        <p className="error-message"
            style={{
                color: 'red',
                fontWeight: 'bold'
            }}>
            {mensagem}
        </p>
    );
}

export default ErrorMessage
