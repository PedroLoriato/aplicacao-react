import { Link } from "react-router-dom";
import appEstilos from "../../App.module.css";
import estilos from "./NaoEncontrada.module.css";
function NaoEncontrada() {

    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.NaoEncontrada}`}>
            <h1>Página não encontrada</h1>
            <p>Ops! Parece que essa página não existe</p>
            <p>Voltar para <Link to="/">Pagina Inicial</Link></p>
        </main>
    );
}

export default NaoEncontrada;