import { useNavigate } from "react-router-dom";
import appEstilos from "../../App.module.css";
import estilos from "./NaoEncontrada.module.css";
function NaoEncontrada() {
    const navigate = useNavigate();

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.NaoEncontrada}`}>
            <h1>Página não encontrada</h1>
            <p>Ops! Parece que essa página não existe</p>
            <p>Voltar para <a onClick={() => navigate("/")}>página inicial</a></p>
        </main>
    );
}

export default NaoEncontrada;