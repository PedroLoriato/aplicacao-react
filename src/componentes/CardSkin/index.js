import { Link } from "react-router-dom"

function CardSkin(props) {
    return (
        <Link to={`/skins/${props.dados.id}`}>
            <img src={props.dados.image} alt={`Skin do CS2 chamada ${props.dados.name}`} />
            <div>
                <h1>{props.dados.name}</h1>
                <p>{`${props.dados.rarity.name}`} | {`${props.dados.category.name}`}</p>
            </div>
        </Link>
    )
}

export default CardSkin;