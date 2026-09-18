import { useGame } from "../../context/useGame.js";
import { Trash } from "lucide-react";
import ButtonLink from "../../components/ButtonLink";
import "./SetupTeams.css";

const SetupTeams = () => {
    const {
        addTeam,
        teams,
        addPlayer,
        updatePlayer,
        removePlayer,
        removeTeam,
    } = useGame();

    const checkPlay = () => {
        if (teams.length <= 1) {
            return false;
        } 
        
        return teams.every((team) => team.players.length >= 1);
    };

    return (
        <>
            <div className="setup-container">
                <header className="setup-cabecalho">
                    <h1 className="setup-title">Configurar Jogo</h1>
                    <span>Crie suas equipes e adicione os jogadores.</span>
                </header>

                <section className="setup-section">
                    <h2>Equipes</h2>

                    <div className="setup-containerTeams">
                        <button className="setup-btnAction" onClick={addTeam}>
                            + Adicionar Equipe
                        </button>

                        {teams &&
                            teams.map((team, teamIndex) => (
                                <div className="setup-cardTeam">
                                    <div className="setup-cardTem-info">
                                        <span>Time {teamIndex + 1}</span>

                                        <div className="setup-cardItem-info-acts">
                                            <button
                                                className="setup-btnAction btnAddPlayer"
                                                onClick={() =>
                                                    addPlayer(team.id)
                                                }
                                            >
                                                + Jogador
                                            </button>
                                            <button
                                                className="setup-btnAction"
                                                onClick={() =>
                                                    removeTeam(team.id)
                                                }
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>

                                    {team.players.map((player) => (
                                        <>
                                            <div className="setup-cardTeam-player">
                                                <input
                                                    className="input-player"
                                                    type="text"
                                                    value={player.name}
                                                    placeholder="Nome do Jogador"
                                                    onChange={(e) =>
                                                        updatePlayer(
                                                            team.id,
                                                            player.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="setup-btnAction"
                                                    onClick={() =>
                                                        removePlayer(
                                                            team.id,
                                                            player.id,
                                                        )
                                                    }
                                                >
                                                    <Trash />
                                                </button>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            ))}
                    </div>
                </section>

                {checkPlay() && <ButtonLink text="Começar" path="/round" />}
            </div>
        </>
    );
};

export default SetupTeams;
