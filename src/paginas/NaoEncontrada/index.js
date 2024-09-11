import appEstilos from "../../App.module.css";
import estilos from "./NaoEncontrada.module.css";
import gifError from "../../assets/Error.gif";
import Botao from "../../componentes/Botao";
import { useNavigate } from "react-router-dom";

function NaoEncontrada() {
    const navigate = useNavigate();

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.NaoEncontrada}`}>
            <img src={gifError} alt="gif de Erro 404" style={{ aspectRatio: "16/9" }}></img>
            <div className={`${appEstilos.DfColCenter}`}>
                <h1>Página não encontrada</h1>
                <p>Ops! Parece que essa página não existe</p>
                <Botao onClick={() => navigate("/skins")}>Voltar a Página de Skins</Botao>
            </div>
        </main>
    );
}

export default NaoEncontrada;