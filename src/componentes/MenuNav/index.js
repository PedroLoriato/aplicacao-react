import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import estilos from "./MenuNav.module.css";
import appEstilos from "../../App.module.css";
import iconSkin from "../../assets/iconSkin.svg";
import iconSobreMim from "../../assets/iconSobreMim.svg";

function MenuNav() {

    useEffect(() => {
        const handleScrollToTop = () => {
            if (window.innerWidth < 768) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        const activeLinks = document.querySelectorAll(`.${estilos.Active}`);

        activeLinks.forEach(link => {
            link.addEventListener("click", handleScrollToTop);
        });

        return () => {
            activeLinks.forEach(link => {
                link.removeEventListener("click", handleScrollToTop);
            });
        };
    }, []);

    return (
        <nav className={`${appEstilos.DfRow} ${estilos.MenuNav}`}>
            <ul className={`${appEstilos.DfRow}`}>
                <li className={`${appEstilos.DfRowCenter}`}>
                    <NavLink
                        to="/skins"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}
                    >
                        <img src={iconSkin} className={estilos.IconSkin} alt="Icone Skin"></img>
                        SKINS
                    </NavLink>
                </li>
                <li className={`${appEstilos.DfRowCenter}`}>
                    <NavLink    
                        to="/sobre"
                        className={({ isActive }) => `${appEstilos.DfRowCenter} ${isActive ? estilos.Active : ""}`}
                    >
                        <img src={iconSobreMim} className={estilos.IconSobreMim} alt="Icone Sobre Mim"></img>
                        SOBRE
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuNav;
