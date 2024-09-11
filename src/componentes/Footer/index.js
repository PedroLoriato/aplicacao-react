import estilos from './Footer.module.css';
import appEstilos from '../../App.module.css';
import { Icon } from '@iconify/react';

function Footer() {
    return (
        <footer className={`${appEstilos.DfCol} ${estilos.Footer}`}>
            <div className={appEstilos.DfRow}>
                <div>
                    <p>Projeto Desenvolvido</p>
                    <p>por Pedro Henrique Loriato</p>
                </div>
                <div className={appEstilos.DfRowCenter}>
                    <a href="https://github.com/PedroLoriato" target='_blank' rel='noreferrer'><Icon icon="mdi:github" className={estilos.GitHub} /></a>
                    <a href="https://www.instagram.com/pedroloriato/" target='_blank' rel='noreferrer'><Icon icon="mdi:instagram" className={estilos.Instagram} /></a>
                    <a href="https://www.linkedin.com/in/pedroloriato/" target='_blank' rel='noreferrer'><Icon icon="mdi:linkedin" className={estilos.LinkedIn} /></a>
                </div>
            </div>
            <p>© {new Date().getFullYear()}. CS2 SKINS</p>
        </footer>
    );
}

export default Footer;