import estilos from "./Inicio.module.css";
import appEstilos from "../../App.module.css";

function Inicio({ nome }) {
    return (    
        <main className={`${appEstilos.DfColCenter} ${estilos.Inicio}`}>
            <h1>Página Inicial</h1>
            <p>Olá! {nome}</p>
        </main>
    )
}

export default Inicio;