import { Link } from 'react-router'
import "./Home.css"

const Home = () => {
    return <>
        <div className="home-container">
            <h1 className="home-title">Mimix</h1>
            <Link className="home-button" to={"/setup"}>Jogar</Link>
            <button className="home-button">Informações</button>
        </div>
    </>
}

export default Home