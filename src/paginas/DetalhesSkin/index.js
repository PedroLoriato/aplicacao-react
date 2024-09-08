import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import estilos from "./DetalhesSkin.module.css";
import appEstilos from "../../App.module.css";
import Botao from '../../componentes/Botao';

function DetalhesSkin() {
    const location = useLocation();
    const navigate = useNavigate();
    const skin = location.state;

    // Verifica se a skin foi encontrada
    if (!skin) return <p>Skin não encontrada.</p>

    // Substitui os \n por <br/>, remove \ e <i> por <em>
    const descricaoFormatada = skin.description
        .replace(/\\n/g, '<br/>')       // Substitui \n por <br/>
        .replace(/\\/g, '')              // Remove todas as barras invertidas (\)
        .replace(/<i>/g, '<em>')         // Substitui <i> por <em>
        .replace(/<\/i>/g, '</em>');     // Substitui </i> por </em>

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.ContainerSkin}`} onLoad={() => window.scrollTo(0, 0)}>
            <div style={{ backgroundColor: skin.rarity.color }} className={`${appEstilos.DfColCenter} ${estilos.DetalhesSkin}`}>
                <h2><em>{skin.rarity.name}</em></h2>
                <Botao onClick={() => navigate(-1)}>Voltar</Botao>
                <h1>{skin.name}</h1>
                <h3>{skin.team.name}</h3>
                <div className={`${appEstilos.DfColCenter} ${estilos.ImgSkinContainer}`}>
                    <p>{skin.category?.name}</p>
                    <img src={skin.image} alt={skin.name} className={estilos.ImgSkin} />
                    <p>{skin.pattern?.name}</p>
                </div>
                <div className={`${appEstilos.DfCol} ${estilos.Detalhes}`}>
                    {skin.stattrak ?
                        <p className={`${appEstilos.DfRow} ${estilos.Stattrak}`}>Esta arma com esta skin possui itens com tecnologia StatTrak™, que contabiliza vítimas confirmadas quando equipada.</p>
                        : ''}
                    {skin.souvenir ?
                        <p className={`${appEstilos.DfRow} ${estilos.Souvenir}`}>Esta arma com esta skin pode ter itens de Lembrança, que comemoram campeonados e são obtidos durante partidas.</p>
                        : ''}
                    <p className={estilos.DescricaoSkin} dangerouslySetInnerHTML={{ __html: descricaoFormatada }}></p>
                    {
                        skin.wears ?
                            <div className={`${appEstilos.DfCol} ${estilos.NiveisDesgaste}`}>
                                <h1>Níveis de Desgaste</h1>
                                <ul className={appEstilos.DfCol}>
                                    {
                                        skin.wears.map((wear) => (
                                            <li key={wear.id}>{wear.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            : ""
                    }
                    {skin.min_float ?
                        <p className={estilos.Float}>Float Mínimo: {skin.min_float}</p> : ""
                    }
                    {skin.max_float ?
                        <p className={estilos.Float}>Float Máximo: {skin.max_float}</p> : ""
                    }
                    {skin.collections && skin.collections.length !== 0 ?
                        <div className={`${appEstilos.DfRow} ${estilos.DivColecao}`}>
                            <p>{skin.collections[0].name}</p>
                            <img src={skin.collections[0].image} alt={skin.collections[0].name} />
                        </div>
                        : ""}
                    {skin.crates && skin.crates.length !== 0 ?
                        <div className={`${appEstilos.DfCol} ${estilos.DivCaixas}`}>
                            <h1>Esta Skin Pode Ser Dropada na(s) Seguinte(s) Caixas:</h1>
                            <ul className={appEstilos.DfCol}>
                                {
                                    skin.crates.map((crate) => (
                                        <li key={crate.id} className={appEstilos.DfRow}>
                                            <img src={crate.image} alt={crate.name} />
                                            <p>{crate.name}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        : ""}
                </div>
            </div>
        </main>
    );
}

export default DetalhesSkin;  