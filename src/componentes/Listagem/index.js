import CardSkin from "../CardSkin";
import estilos from "./Listagem.module.css";

function Listagem(props) {
  return (
    <div className={estilos.listagem}>
      <div className={estilos.carrousel}>
        <ul>
          {props.dados.map((elemento) => (
            <li style={{
              background: `linear-gradient(${elemento.rarity.color} 50%, rgb(0 0 0 / 0%) 110%)`,
              borderTop: '1px solid rgba(196, 196, 196, 0.75)',
              borderLeft: '1px solid rgba(196, 196, 196, 0.75)',
              boxShadow: `
                2px 2px 8px ${elemento.rarity.color},
                -1px -1px 5px ${elemento.rarity.color}
              `
            }}>
              <CardSkin dados={elemento} key={elemento.id} />
            </li>               
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Listagem;
