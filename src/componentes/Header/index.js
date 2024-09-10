import MenuNav from "../MenuNav";
import appEstilos from "../../App.module.css";
import estilos from "./Header.module.css";

function Header() {
    return (
        <header className={`${appEstilos.DfRow} ${estilos.Header}`}>
            <h1>- CS2 SKINS</h1>
            <MenuNav />
        </header>
    );
}

export default Header;