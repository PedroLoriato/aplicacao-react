import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import estilos from './DetalhesSkin.module.css';
import appEstilos from '../../App.module.css';
import Botao from '../../componentes/Botao';
import { useAppContext } from '../../AppContext';

function DetalhesSkin() {
    const [skin, setSkin] = useState(null);  // Estado para armazenar a skin buscada
    const [skins, setSkins] = useState([]); // Estado para armazenar a lista de skins pura
    const { error, setError } = useAppContext();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/pt-BR/skins.json');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados da API.');
                }
                const data = await response.json();
                setSkins(data);
            } catch (error) {
                setError('Erro ao buscar dados da API. Tente novamente mais tarde.');
                console.error('Erro ao buscar skins:', error);
            }
        };

        fetchSkins();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (skins.length > 0) {
            const foundSkin = skins.find(skin => skin.id === id);
            if (foundSkin) {
                setSkin(foundSkin);
                setError(null); // Limpa o erro se a skin for encontrada
            } else {
                setSkin(null);
                setError('Skin não encontrada.');
            }
        }
        // eslint-disable-next-line
    }, [skins, id]);

    if (error) {
        return (
            <main className={`${appEstilos.DfColCenter} ${estilos.ContainerSkin}`}>
                <p className={estilos.MensagemErro}>{error}</p>
                <Botao onClick={() => navigate(-1)}>Voltar à Página Anterior</Botao>
            </main>
        );
    }

    if (!skin) {
        return (
            <main className={`${appEstilos.DfColCenter} ${estilos.ContainerSkin}`}>
                <div className={appEstilos.spinner}></div>
            </main>
        );
    }

    const descricaoFormatada = skin.description
        .replace(/\\n/g, '<br/>')
        .replace(/\\/g, '')
        .replace(/<i>/g, '<em>')
        .replace(/<\/i>/g, '</em>');

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.ContainerSkin}`}>
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
                    {skin.stattrak && 
                        <p className={`${appEstilos.DfRow} ${estilos.Stattrak}`}>Esta arma com esta skin possui itens com tecnologia StatTrak™, que contabiliza vítimas confirmadas quando equipada.</p>
                    }
                    {skin.souvenir && 
                        <p className={`${appEstilos.DfRow} ${estilos.Souvenir}`}>Esta arma com esta skin pode ter itens de Lembrança, que comemoram campeonatos e são obtidos durante partidas.</p>
                    }
                    <p className={estilos.DescricaoSkin} dangerouslySetInnerHTML={{ __html: descricaoFormatada }}></p>
                    {skin.wears && skin.wears.length > 0 && 
                        <div className={`${appEstilos.DfCol} ${estilos.NiveisDesgaste}`}>
                            <h1>Níveis de Desgaste</h1>
                            <ul className={appEstilos.DfCol}>
                                {skin.wears.map(wear => (
                                    <li key={wear.id}>{wear.name}</li>
                                ))}
                            </ul>
                        </div>
                    }
                    {skin.min_float !== null ??
                        <p className={estilos.Float}>Float Mínimo: {skin.min_float}</p>
                    }
                    {skin.max_float !== null ??
                        <p className={estilos.Float}>Float Máximo: {skin.max_float}</p>
                    }
                    {skin.collections && skin.collections.length > 0 &&
                        <div className={`${appEstilos.DfRow} ${estilos.DivColecao}`}>
                            <p>{skin.collections[0].name}</p>
                            <img src={skin.collections[0].image} alt={skin.collections[0].name} />
                        </div>
                    }
                    {skin.crates && skin.crates.length > 0 &&
                        <div className={`${appEstilos.DfCol} ${estilos.DivCaixas}`}>
                            <h1>Esta Skin Pode Ser Dropada na(s) Seguinte(s) Caixa(s):</h1>
                            <ul className={appEstilos.DfCol}>
                                {skin.crates.map(crate => (
                                    <li key={crate.id} className={appEstilos.DfRow}>
                                        <img src={crate.image} alt={crate.name} />
                                        <p>{crate.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}

export default DetalhesSkin;