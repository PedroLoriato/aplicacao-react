import { NavLink } from "react-router-dom";
import estilos from "./MenuNav.module.css";
import appEstilos from "../../App.module.css";

function MenuNav() {
 
    return (
        <nav className={`${appEstilos.DfRow} ${estilos.MenuNav}`}>
            <ul className={`${appEstilos.DfRow}`}>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/*">TESTE</NavLink></li> 
            </ul>
        </nav> 
    )
}

export default MenuNav;