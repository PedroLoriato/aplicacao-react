import MenuNav from "../MenuNav";
import appEstilos from "../../App.module.css";
import estilos from "./Header.module.css";
import logo from "../../assets/logo.svg";

function Header() {
    return (
        <header className={`${appEstilos.DfRow} ${estilos.Header}`}>
            <div className={`${appEstilos.DfRowCenter} ${estilos.DivLogo}`} >
                <img src={logo} alt="Logo"/>
                <h1>CS2 SKINS</h1>
            </div>
            <MenuNav />
        </header>
    );
}

export default Header;