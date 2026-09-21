import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useGame } from "../../context/useGame.js";
import { Eye, EyeOff } from "lucide-react";
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
    const [phase, setPhase] = useState("reveal");
    const [chosen, setChosen] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isWordVisible, setIsWordVisible] = useState(false);
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
                    {phase === "reveal" && "Toque para revelar as palavras"}
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
                    {phase === "reveal" && (
                        <>
                            {currentTeam?.name} - {currentPlayer?.name}
                        </>
                    )}
                    {phase === "play" && (
                        <span className="round-info word-info">
                            <button
                                type="button"
                                className="toggle-word"
                                onClick={() =>
                                    setIsWordVisible((visible) => !visible)
                                }
                                aria-label={
                                    isWordVisible
                                        ? "Ocultar palavra"
                                        : "Mostrar palavra"
                                }
                                title={
                                    isWordVisible
                                        ? "Ocultar palavra"
                                        : "Mostrar palavra"
                                }
                            >
                                {isWordVisible ? (
                                    <EyeOff size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>

                            <span>
                                Palavra: {isWordVisible ? chosen : "••••••"}
                            </span>
                        </span>
                    )}
                </span>
            </header>

            <section className="round-section">
                {phase === "reveal" && (
                    <>
                        <button
                            onClick={() => setPhase("choose")}
                            className="btn-reveal"
                        >
                            Revelar palavras
                        </button>
                    </>
                )}

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
                        <button
                            onClick={handleEndGame}
                            className="round-btnEnd"
                        >
                            Encerrar Jogo
                        </button>
                    </div>
                )}

                {phase === "ready" && (
                    <div className="ready-phase">
                        <span className="timeleft">
                            {String(timeLeft).padStart(2, "0")}
                        </span>
                        <button onClick={handleStart}>Começar</button>
                    </div>
                )}

                {phase === "play" && (
                    <div className="play-phase">
                        <span
                            className={`${
                                timeLeft === 0
                                    ? "time-danger"
                                    : timeLeft <= 10
                                      ? "time-warning"
                                      : "timeleft"
                            }`}
                        >
                            {String(timeLeft).padStart(2, "0")}
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
