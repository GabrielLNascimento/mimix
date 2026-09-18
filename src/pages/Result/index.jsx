import { useGame } from "../../context/useGame";
import "./Result.css";

const Result = () => {
    const { teams } = useGame();
    return <div>
        {teams.map(team => (
            <div className="result-cardTeam">
                <h2>Equipe {team.name}</h2>
                <span>Score: {team.score}</span>
            </div>
        ))}
    </div>;
};

export default Result;
