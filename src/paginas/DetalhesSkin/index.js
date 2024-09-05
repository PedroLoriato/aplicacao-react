import React from 'react';
import { useLocation } from 'react-router-dom';
import estilos from "./DetalhesSkin.module.css";
import appEstilos from "../../App.module.css";

function DetalhesSkin() {
    const location = useLocation();
    const skin = location.state;
    console.log(skin);

    // Verifica se a skin foi encontrada
    if (!skin) {
        return <p>Skin não encontrada.</p>;
    }

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.DetalhesSkin}`}>
            <h1>{skin}</h1>
            <img src={skin.image} alt={skin.name} />
            <p>Raridade: {skin.rarity.name}</p>
            <p>Descrição: {skin.description}</p>
        </main>
    );
}

export default DetalhesSkin;