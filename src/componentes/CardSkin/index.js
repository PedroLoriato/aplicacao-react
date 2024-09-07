import { Link } from "react-router-dom";

function CardSkin({ dados }) {
    return (
        <Link to={`/skins/${dados.id}`} state={dados}>
            <img src={dados.image} alt={`Skin do CS2 chamada ${dados.name}`} />
            <div style={{ zIndex: 2, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', bottom: "0", padding: '10px', height: "30%" }}>
                <h1>{dados.name}</h1>
                <p>{dados.rarity.name}</p>
            </div>
        </Link>
    );
}

export default CardSkin;