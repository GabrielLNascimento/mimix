import { useGame } from "../../context/useGame";
import ButtonLink from "../../components/ButtonLink";
import "./Result.css";

const Result = () => {
    const { teams, resetGame } = useGame();

    const ranking = [...teams].sort((a, b) => b.score - a.score);

    return (
        <div className="result-container">
            <header className="result-cabecalho">
                <h1 className="result-title">Resultado</h1>
                {ranking[0] && <span>Vencedor: {ranking[0].name}</span>}
            </header>

            <table className="result-table">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Equipe</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((team, index) => (
                        <tr
                            key={team.id}
                            className={index === 0 ? "result-winner" : ""}
                        >
                            <td>{index + 1}º</td>
                            <td>{team.name}</td>
                            <td>{team.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ButtonLink text="Recomeçar" path="/setup" func={resetGame} />
        </div>
    );
};

export default Result;
