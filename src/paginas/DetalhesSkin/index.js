import React from 'react';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';
import estilos from "./DetalhesSkin.module.css";
import appEstilos from "../../App.module.css";
import Botao from '../../componentes/Botao';

function DetalhesSkin() {
    const location = useLocation();
    const skin = location.state;

    // Verifica se a skin foi encontrada
    if (!skin) {
        return <p>Skin não encontrada.</p>;
    }
    // Substitui os \n por <br/> e <i>,</i> por <em> </em>
    const descricaoFormatada = skin.description
        .replace(/\\n/g, '<br/>')
        .replace(/<i>/g, '<em>')
        .replace(/<\/i>/g, '</em>');

    const descricaoLimpa = DOMPurify.sanitize(descricaoFormatada);

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.ContainerSkin}`}>
            <div style={{ backgroundColor: skin.rarity.color }} className={`${appEstilos.DfColCenter} ${estilos.DetalhesSkin}`}>
                <Botao onClick={() => window.history.back()}>Voltar</Botao>
                <h1>{skin.name}</h1>
                <div className={`${appEstilos.DfRow} ${estilos.InfoSkin}`}>
                    <div className={`${appEstilos.DfColCenter} ${estilos.ImgSkinContainer}`}>
                        <p>{skin.category.name} | {skin.pattern.name}</p>
                        <img src={skin.image} alt={skin.name} className={estilos.ImgSkin} />
                        <p>{skin.rarity.name}</p>
                    </div>
                    <div className={`${appEstilos.DfCol} ${estilos.Detalhes}`}>
                        {skin.collections.length !== 0 ?
                        <div className={`${appEstilos.DfRow} ${estilos.DivImgColecao}`}>
                        <img src={skin.collections[0].image} alt={skin.collections[0].name} />
                        <p>{skin.collections[0].name}</p>
                    </div>
                    : ""}
                        <p dangerouslySetInnerHTML={{ __html: descricaoLimpa }}></p>
                        <div className={`${appEstilos.DfCol} ${estilos.NiveisDesgaste}`}>
                            <h1>Nívels de Desgaste</h1>
                            <ul className={appEstilos.DfCol}>
                                {
                                    skin.wears.map((wear) => (
                                        <li key={wear.id}>{wear.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={`${appEstilos.DfCol} ${estilos.FloatSkin}`}>
                            <p>Float Mínimo: {skin.min_float}</p>
                            <p>Float Máximo: {skin.max_float}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DetalhesSkin;  