import { useState } from "react";
import { GameContext } from "./GameContext";
import { getRandomWords } from "../db/words.js";

export function GameProvider({ children }) {
    const [teams, setTeams] = useState([]);
    const [roundsPerPlayer, setRoundsPerPlayer] = useState(2);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [usedWords, setUsedWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);

    // ─── Equipes ───────────────────────────────────────────
    function addTeam() {
        setTeams((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: `Equipe ${prev.length + 1}`,
                players: [],
                score: 0,
                hits: 0,
                misses: 0,
            },
        ]);
    }

    function removeTeam(teamId) {
        setTeams((prev) => prev.filter((t) => t.id !== teamId));
    }

    function updateTeam(teamId, changes) {
        setTeams((prev) =>
            prev.map((t) => (t.id === teamId ? { ...t, ...changes } : t)),
        );
    }

    // ─── Jogadores ─────────────────────────────────────────
    function addPlayer(teamId) {
        setTeams((prev) =>
            prev.map((t) => {
                if (t.id !== teamId) return t;
                return {
                    ...t,
                    players: [...t.players, { id: Date.now(), name: "" }],
                };
            }),
        );
    }

    function removePlayer(teamId, playerId) {
        setTeams((prev) =>
            prev.map((t) => {
                if (t.id !== teamId) return t;
                return {
                    ...t,
                    players: t.players.filter((p) => p.id !== playerId),
                };
            }),
        );
    }

    function updatePlayer(teamId, playerId, name) {
        setTeams((prev) =>
            prev.map((t) => {
                if (t.id !== teamId) return t;
                return {
                    ...t,
                    players: t.players.map((p) =>
                        p.id === playerId ? { ...p, name } : p,
                    ),
                };
            }),
        );
    }

    // ─── Jogo ──────────────────────────────────────────────
    function registerResult(hit) {
        setTeams((prev) =>
            prev.map((t, i) => {
                if (i !== currentTeamIndex) return t;
                return {
                    ...t,
                    score: hit ? t.score + 1 : t.score,
                    hits: hit ? t.hits + 1 : t.hits,
                    misses: hit ? t.misses : t.misses + 1,
                };
            }),
        );
    }

    function nextTurn() {
        const nextTeamIndex = (currentTeamIndex + 1) % teams.length;

        // Se voltamos para a primeira equipe,
        // significa que todas as equipes jogaram.
        const isNewRound = nextTeamIndex === 0;

        if (isNewRound) {
            setCurrentPlayerIndex((prev) => {
                const currentTeam = teams[currentTeamIndex];

                return (prev + 1) % currentTeam.players.length;
            });
        }

        setCurrentTeamIndex(nextTeamIndex);

        return "continua";
    }

    function resetGame() {
        setTeams((prev) =>
            prev.map((t) => ({ ...t, score: 0, hits: 0, misses: 0 })),
        );
        setCurrentTeamIndex(0);
        setCurrentPlayerIndex(0);
        setUsedWords([]);
        setSelectedWord(null);
    }

    function fullReset() {
        setTeams([]);
        setRoundsPerPlayer(2);
        setCurrentTeamIndex(0);
        setCurrentPlayerIndex(0);
        setUsedWords([]);
        setSelectedWord(null);
    }

    // ─── Palavras───────────────────────────────────────────
    function generateRoundWords(n = 3) {
        const words = getRandomWords(usedWords, n);

        setUsedWords((prev) => [...prev, ...words]);

        return words;
    }

    // ─── Atalhos úteis ─────────────────────────────────────
    const currentTeam = teams[currentTeamIndex];
    const currentPlayer = currentTeam?.players[currentPlayerIndex];

    return (
        <GameContext.Provider
            value={{
                // Estado
                teams,
                roundsPerPlayer,
                setRoundsPerPlayer,
                currentTeamIndex,
                currentPlayerIndex,
                usedWords,
                setUsedWords,
                selectedWord,
                setSelectedWord,
                // Atalhos
                currentTeam,
                currentPlayer,
                // Funções
                addTeam,
                removeTeam,
                updateTeam,
                addPlayer,
                removePlayer,
                updatePlayer,
                registerResult,
                nextTurn,
                resetGame,
                fullReset,
                generateRoundWords,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
