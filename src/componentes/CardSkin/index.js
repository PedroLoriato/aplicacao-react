import { Link } from "react-router-dom"

function CardSkin(props) {
    return (
        <Link to={`/skins/${props.dados.id}`}>
            <img src={props.dados.image} alt={`Skin do CS2 chamada ${props.dados.name}`} />
            <div style={{ zIndex: 2, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', bottom: "0", padding: '10px', height: "30%" }}>
                <h1>{props.dados.name}</h1>
                <p>{`${props.dados.rarity.name}`}</p>
            </div>
        </Link>
    )
}

export default CardSkin;