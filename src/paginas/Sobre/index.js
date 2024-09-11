import appEstilos from '../../App.module.css';
import estilos from './Sobre.module.css';

function Sobre() {
    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.Container}`}>
            <h1>SOBRE</h1>
            <section className={estilos.Conteudo}>
                <fieldset>
                    <legend className={estilos.Titulo}>Sobre o Projeto</legend>
                    <p className={estilos.Descricao}>
                        Este projeto foi desenvolvido com o objetivo de oferecer uma maneira prática e eficiente de explorar as skins de CS2. Utilizando <a href="https://pt-br.react.dev/" target="_blank" rel="noreferrer"  className={estilos.Link}>React</a> e <a href="https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/" target="_blank" rel="noreferrer" className={estilos.Link}>CSS Modules</a> para garantir uma interface moderna, organizada e de fácil navegação, o projeto proporciona uma experiência fluida para os usuários, facilitando a busca, visualização e ordenação das skins.
                    </p>

                    <h2 className={estilos.Subtitulo}>Funcionalidades</h2>
                    <ul className={estilos.Descricao}>
                        <li><strong>Lista de Skins:</strong> O projeto exibe uma lista completa de skins, permitindo aos usuários explorar facilmente.</li>
                        <li><strong>Ordenação:</strong> As skins podem ser ordenadas de várias maneiras, incluindo nome do item, nome da skin e raridade, em <strong>ordem crescente</strong> e <strong>decrescente</strong>.</li>
                        <li><strong>Busca:</strong> Um sistema de busca eficiente permite que os usuários encontrem skins específicas de forma rápida e fácil.</li>
                        <li><strong>Visualização Detalhada:</strong> Cada skin possui uma página dedicada com informações detalhadas sobre a arma e suas características visuais.</li>
                    </ul>

                    <h2 className={estilos.Subtitulo}>Tecnologias Utilizadas</h2>
                    <ul className={estilos.Descricao}>
                        <li><strong>React:</strong> A base do projeto, garantindo uma interface de usuário reativa e bem estruturada.<br /></li>
                        <li><strong>CSS Modules:</strong> Para garantir um design moderno e modular, separando os estilos por componente.</li>
                    </ul>

                    <h2 className={estilos.Subtitulo}>Propósito</h2>
                    <p className={estilos.Descricao}>
                        Este projeto é uma união das minhas paixões por desenvolvimento web e pelo universo de CS2. Ele busca proporcionar aos jogadores e colecionadores de skins uma ferramenta eficiente e agradável para explorar todos os detalhes das skins de CS2.
                    </p>
                </fieldset>
            </section>

                <section className={estilos.Conteudo}>
                    <fieldset>
                        <legend className={estilos.Titulo}>Sobre Mim</legend>
                        <p className={estilos.Descricao}>
                            Meu nome é Pedro Henrique Loriato, desenvolvedor apaixonado por games e tecnologia. Este projeto é uma maneira de juntar essas paixões. Você pode conferir meu perfil na Steam: <a href="https://steamcommunity.com/id/pedroloriato/" target="_blank" rel="noopener noreferrer" className={estilos.Link}>pedroloriato</a>
                        </p>
                    </fieldset>
                </section>

                <section className={estilos.Conteudo}>
                    <fieldset>
                        <legend className={estilos.Titulo}>Créditos</legend>
                        <p className={estilos.Descricao}>
                            Créditos ao desenvolvedor <a href="https://github.com/ByMykel" target="_blank" rel="noopener noreferrer" className={estilos.Link}>ByMykel</a> da <a href="https://bymykel.github.io/CSGO-API/" target="_blank" rel="noopener noreferrer" className={estilos.Link}>API de CS2</a>, por desenvolver e disponibilizar publicamente essa api, que foi essencial para a construção deste projeto.
                        </p>
                    </fieldset>
                </section>
        </main>
    );
};

export default Sobre;