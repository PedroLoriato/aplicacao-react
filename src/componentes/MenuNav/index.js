import { NavLink } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';
import estilos from "./MenuNav.module.css";
import appEstilos from "../../App.module.css";
import iconSkin from "../../assets/iconSkin.svg";
import iconSobreMim from "../../assets/iconSobreMim.svg";

function MenuNav() {
    // Função para rolar para o topo
    const handleScrollToTop = () => {
        if (window.innerWidth < 768) {
            scroll.scrollToTop();
        }
    };

    return (
        <nav className={`${appEstilos.DfRow} ${estilos.MenuNav}`}>
            <ul className={`${appEstilos.DfRow}`}>
                <li className={`${appEstilos.DfRowCenter}`} onClick={handleScrollToTop}>
                    <NavLink
                        to="/skins"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}
                    >
                        <img src={iconSkin} className={estilos.IconSkin} alt="Icone Skin"></img>
                        SKINS
                    </NavLink>
                </li>
                <li className={`${appEstilos.DfRowCenter}`} onClick={handleScrollToTop}>
                    <NavLink    
                        to="/sobre"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}
                    >
                        <img src={iconSobreMim} className={estilos.IconSobre} alt="Icone Sobre"></img>
                        SOBRE
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuNav;
