import "./Home.css"

// component
import ButtonLink from "../../components/ButtonLink"

async function entrarEmTelaCheia() {
    const el = document.documentElement;
    try {
        if (el.requestFullscreen) {
            await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    } catch (error) {
        console.error("Não foi possível entrar em tela cheia:", error);
    }
}

const Home = () => {
    return <>
        <div className="home-container">
            <h1 className="home-title">Mimix</h1>
            <ButtonLink text="Jogar" path="/setup" func={entrarEmTelaCheia} />
            <ButtonLink text="Informações" path="/" />
        </div>
    </>
}

export default Home