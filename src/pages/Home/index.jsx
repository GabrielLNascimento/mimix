import "./Home.css"

// component
import ButtonLink from "../../components/ButtonLink"

const Home = () => {
    return <>
        <div className="home-container">
            <h1 className="home-title">Mimix</h1>
            <ButtonLink text="Jogar" path="/setup" />
            <ButtonLink text="Informações" path="/" />
        </div>
    </>
}

export default Home