import React from "react";
import estilos from './Botao.module.css'

function Botao({ onClick, children }) {

    return (
        <button onClick={onClick} className={estilos.Botao}>
            {children}
        </button>
    );
}

export default Botao;