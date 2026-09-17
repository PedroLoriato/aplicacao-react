import { Link } from "react-router-dom";
import appEstilos from "../../App.module.css";

function CardSkin({ skins }) {
    return (
        <Link to={`/skins/${skins.id}`}>
            <img src={skins.image} alt={`Skin do CS2 chamada ${skins.name}`} />
            <div className={appEstilos.DfCol}>
                <h1>{skins.name}</h1>
                <p>{skins.rarity.name}</p>
            </div>
        </Link>
    );
}

export default CardSkin;