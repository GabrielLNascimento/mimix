import "./Home.css"

// component
import Button from "../../components/Button"

const Home = () => {
    return <>
        <div className="home-container">
            <h1 className="home-title">Mimix</h1>
            <Button text="Jogar" path="/setup" />
            <Button text="Informações" path="/" />
        </div>
    </>
}

export default Home