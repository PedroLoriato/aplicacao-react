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
                    <img src={iconSkin} className={estilos.IconSkin} alt="Icone Skin"></img>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? estilos.Active : "")}
                    >
                        SKINS
                    </NavLink>
                </li>
                <li className={`${appEstilos.DfRowCenter}`}>
                    <img src={iconSobreMim} className={estilos.IconSobreMim} alt="Icone Sobre Mim"></img>
                    <NavLink
                        to="/SobreMim"
                        className={({ isActive }) => (isActive ? estilos.Active : "")}
                    >
                        SOBRE MIM
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuNav;
