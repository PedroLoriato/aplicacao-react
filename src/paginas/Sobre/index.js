import appEstilos from '../../App.module.css';
import estilos from './Sobre.module.css';

function Sobre() {
    return (
        <main className={`${appEstilos.DfColCenter} ${estilos.Container}`}>
            <h1>SOBRE</h1>
            <section className={estilos.Conteudo}>
                <fieldset>
                    <legend className={estilos.Titulo}>Sobre o Site</legend>
                    <p className={estilos.Descricao}>
                        Este site foi desenvolvido com o objetivo de oferecer uma maneira prática e eficiente de explorar as skins de CS2. Utilizando <a href="https://pt-br.react.dev/" target="_blank" rel="noreferrer" className={estilos.Link}>React</a> e <a href="https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/" target="_blank" rel="noreferrer" className={estilos.Link}>CSS Modules</a> para garantir uma interface moderna, organizada e de fácil navegação, o site proporciona uma experiência fluida para os usuários, facilitando a busca, visualização e ordenação das skins.
                    </p>

                    <h2 className={estilos.Subtitulo}>Funcionalidades</h2>
                    <ul className={estilos.Descricao}>
                        <li><strong>Lista de Skins:</strong> O site exibe uma lista completa de skins, permitindo aos usuários explorar facilmente.</li>
                        <li><strong>Ordenação:</strong> As skins podem ser ordenadas de várias maneiras, incluindo nome do item, nome da skin e raridade, em ordem crescente e decrescente.</li>
                        <li><strong>Busca:</strong> Um sistema de busca eficiente permite que os usuários encontrem itens/skins específicas de forma rápida e fácil.</li>
                        <li><strong>Visualização Detalhada:</strong> Cada skin possui uma página dedicada com informações detalhadas sobre a arma e suas características visuais.</li>
                        <li><strong>Responsividade:</strong> O site se adapta a diferentes tamanhos de tela, permitindo que os usuários tenham uma melhor experiência de navegação.</li>
                        <li><strong>Interface Fluida:</strong> A interface do site é fluida, garantindo uma navegação confortável e intuitiva para os usuários.</li>
                    </ul>

                    <h2 className={estilos.Subtitulo}>Tecnologias Utilizadas</h2>
                    <ul className={estilos.Descricao}>
                        <li><strong>React:</strong> A base do site, garantindo uma interface de usuário reativa e bem estruturada.<br /></li>
                        <li><strong>CSS Modules:</strong> Para garantir um design moderno e modular, separando os estilos por componente.</li>
                    </ul>

                    <h2 className={estilos.Subtitulo}>Propósito</h2>
                    <p className={estilos.Descricao}>
                        Este site une minhas paixões por programação e games, oferecendo uma ferramenta eficiente e intuitiva para jogadores e colecionadores explorarem todos os detalhes das skins do meu jogo favorito, Counter-Strike 2 (antigo Counter-Strike: Global Offensive).
                    </p>
                </fieldset>
            </section>

            <section className={estilos.Conteudo}>
                <fieldset>
                    <legend className={estilos.Titulo}>Sobre Mim</legend>
                    <p className={estilos.Descricao}>
                        Meu nome é Pedro Henrique Loriato, desenvolvedor apaixonado por games e tecnologia. Este site é uma maneira de juntar essas paixões. Você pode conferir meu perfil na Steam: <a href="https://steamcommunity.com/id/pedroloriato/" target="_blank" rel="noopener noreferrer" className={estilos.Link}>/pedroloriato/</a>
                        <br />
                        Também pode conferir minhas redes no rodapé ao final da página.
                    </p>
                </fieldset>
            </section>

            <section className={estilos.Conteudo}>
                <fieldset>
                    <legend className={estilos.Titulo}>Créditos</legend>
                    <p className={estilos.Descricao}>
                        Créditos ao desenvolvedor <a href="https://github.com/ByMykel" target="_blank" rel="noopener noreferrer" className={estilos.Link}>ByMykel</a> da <a href="https://bymykel.github.io/CSGO-API/" target="_blank" rel="noopener noreferrer" className={estilos.Link}>API de CS2</a>, por desenvolver e disponibilizar publicamente essa api, que foi essencial para a construção deste site.
                    </p>
                </fieldset>
            </section>
        </main>
    );
};

export default Sobre;