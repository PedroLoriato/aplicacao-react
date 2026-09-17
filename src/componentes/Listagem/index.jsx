import CardSkin from "../CardSkin";
import CardSkeleton from "../CardSkeleton";
import estilos from "./Listagem.module.css";
import appEstilos from "../../App.module.css";

function Listagem(props) {
  return (
      <div className={`${appEstilos.DfColCenter} ${estilos.Carrousel}`}>
        <ul>
          {props.loading ?
            Array(10).fill(0).map((_, index) => (
              <li key={index} style={{
                background: 'rgba(196, 196, 196, 0.75)',
                border: '1px solid rgba(196, 196, 196, 0.75)',
                boxShadow: `
                  2px 2px 8px rgba(196, 196, 196, 0.75),
                  -1px -1px 5px rgba(196, 196, 196, 0.75)
                `,
                position: 'relative',
              }}>
                <CardSkeleton />
                <span className={estilos.Destaque}></span>
              </li>
            )) : props.skins.map((elemento) => (
              <li key={elemento.id} style={{
                background: elemento.rarity.color,
                border: '1px solid rgba(196, 196, 196, 0.75)',
                boxShadow: `
                  2px 2px 8px ${elemento.rarity.color},
                  -1px -1px 5px ${elemento.rarity.color}
                `,
                position: 'relative',
              }}>
                <CardSkin skins={elemento} />
                <span className={estilos.Destaque}></span>
              </li>
            ))
          }
        </ul>
      </div>
  );
}

export default Listagem;
