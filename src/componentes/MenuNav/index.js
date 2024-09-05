import { NavLink } from "react-router-dom";
import estilos from "./MenuNav.module.css";
import appEstilos from "../../App.module.css";
import iconSkin from "../../assets/iconSkin.svg";
import iconSobreMim from "../../assets/iconSobreMim.svg";

function MenuNav() {
    return (
        <nav className={`${appEstilos.DfRow} ${estilos.MenuNav}`}>
            <ul className={`${appEstilos.DfRow}`}>
                <li className={`${appEstilos.DfRowCenter}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}

                    >
                        <img src={iconSkin} className={estilos.IconSkin} alt="Icone Skin"></img>
                        SKINS
                    </NavLink>
                </li>
                <li className={`${appEstilos.DfRowCenter}`}>
                    <NavLink
                        to="/sobremim"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}
                    >
                        <img src={iconSobreMim} className={estilos.IconSobreMim} alt="Icone Sobre Mim"></img>
                        SOBRE MIM
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuNav;
