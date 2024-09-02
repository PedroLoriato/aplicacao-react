import { Link } from "react-router-dom"


function ItemCard(props) {

    return (
        <Link to={`/curso/${props.dados.id}`}>
            <img src="/images/react.png" alt={`"logo com a ${props.dados.descricao}"`} />
            <h1>{props.dados.titulo}</h1>
            <p>Autor: {props.dados.autor}</p>
        </Link>
    )
}

export default ItemCard