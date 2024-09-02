import { NavLink } from "react-router-dom";
import estilos from "./MenuNav.module.css";

function MenuNav() {
 
    return (
        <nav>
            <ul>
                <NavLink to="/">inicio</NavLink>
                <NavLink to="/*">teste</NavLink>           
            </ul>
        </nav> 
    )
}

export default MenuNav;