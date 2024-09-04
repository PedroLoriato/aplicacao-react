import estilos from './Footer.module.css';
import appEstilos from '../../App.module.css';
import { Icon } from '@iconify/react';

function Footer() {
    return (
        <footer className={`${appEstilos.DfRow}  ${estilos.Footer}`}>
            <h1>Projeto Desenvolvido <br/><br/> por Pedro Henrique Loriato</h1>
            <div className={appEstilos.DfRowCenter}>
                <a href="https://github.com/PedroLoriato" target='_blank' rel='noreferrer'><Icon icon="mdi:github" className={estilos.GitHub}/></a>
                <a href="https://www.instagram.com/pedroloriato/" target='_blank' rel='noreferrer'><Icon icon="mdi:instagram" className={estilos.Instagram}/></a>
                <a href="https://www.linkedin.com/in/pedroloriato/" target='_blank' rel='noreferrer'><Icon icon="mdi:linkedin" className={estilos.LinkedIn}/></a>
            </div>
        </footer>
    );
}

export default Footer;