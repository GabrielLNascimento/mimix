import { useGame } from "../../context/useGame.js";
import "./SetupTeams.css";

const SetupTeams = () => {
    const { addTeam } = useGame();

    return (
        <>
            <div className="setup-container">
                <header className="setup-cabecalho">
                    <h1 className="setup-title">Configurar Jogo</h1>
                    <span>Crie suas equipes e adicione os jogadores.</span>
                </header>

                <section className="setup-section">
                    <h2>Equipes</h2>

                    <button className="setup-btnAction" onClick={addTeam}>
                        + Adicionar Equipe
                    </button>
                </section>
            </div>
        </>
    );
};

export default SetupTeams;
