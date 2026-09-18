import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useGame } from "../../context/useGame.js";
import "./Round.css";

const Round = () => {
    const {
        currentTeam,
        currentPlayer,
        generateRoundWords,
        nextTurn,
        registerResult,
    } = useGame();
    const [words, setWords] = useState([]);
    const [phase, setPhase] = useState("choose");
    const [chosen, setChosen] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const hasGenerated = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasGenerated.current) return;
        hasGenerated.current = true;
        setWords(generateRoundWords(5));
    }, [generateRoundWords]);

    useEffect(() => {
        if (phase !== "play") return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [phase]);

    const handleChosen = (word) => {
        setChosen(word);
        setTimeLeft(60);
        setPhase("ready");
    };

    const handleStart = () => {
        setPhase("play");
    };

    const handleNext = (hit) => {
        registerResult(hit);

        const status = nextTurn(); // avança player/equipe no contexto

        if (status === "fim") {
            navigate("/fim");
        } else {
            // reseta o Round para o próximo jogador
            setWords(generateRoundWords(5));
            setChosen(null);
            setTimeLeft(60);
            setPhase("choose");
        }
    };

    const handleEndGame = () => {
        navigate("/fim");
    };

    return (
        <div className="round-container">
            <header className="round-cabecalho">
                <h1 className="round-title">
                    {phase === "choose" && "Escolha uma palavra!"}
                    {phase === "ready" && "Você está pronto?"}
                    {phase === "play" && "Boa sorte!"}
                </h1>
                <span className="round-info">
                    {phase === "choose" && (
                        <>
                            {currentTeam?.name} - {currentPlayer?.name}
                        </>
                    )}

                    {phase === "play" && <>Palavra: {chosen}</>}
                </span>
            </header>

            <section className="round-section">
                {phase === "choose" && (
                    <div className="word-options">
                        {words.map((word) => (
                            <button
                                onClick={() => handleChosen(word)}
                                key={word}
                            >
                                {word}
                            </button>
                        ))}
                        <button onClick={handleEndGame} className="round-btnEnd">Encerrar Jogo</button>
                    </div>
                )}

                {phase === "ready" && (
                    <div className="ready-phase">
                        <span className={"timeleft"}>
                            {timeLeft <= 9 && `0${timeLeft}`}
                        </span>
                        <button onClick={handleStart}>Começar</button>
                    </div>
                )}

                {phase === "play" && (
                    <div className="play-phase">
                        <span
                            className={` ${timeLeft > 10 ? "timeleft" : ""} ${timeLeft < 10 ? "time-warning" : ""} ${timeLeft === 0 ? "time-danger" : ""}`}
                        >
                            {timeLeft <= 9 && `0${timeLeft}`}
                        </span>

                        {timeLeft === 0 && (
                            <div className="end-round">
                                <p className="">Tempo encerrado</p>
                                <button onClick={() => handleNext(true)}>
                                    ✅ Acertou
                                </button>
                                <button onClick={() => handleNext(false)}>
                                    ❌ Errou
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Round;
