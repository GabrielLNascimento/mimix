# GameContext — Documentação

## O que é esse arquivo?

É o **contexto global** de um jogo de adivinhação em equipes (tipo Stop, Jogo da Mímica, etc). Ele usa a API de **Context** do React para compartilhar dados e funções entre todas as telas do jogo sem precisar passar props manualmente.

---

## 1. Criando o contexto

```js
const GameContext = createContext(null);
```

Cria um "container global" chamado `GameContext`. Começa vazio (`null`).

---

## 2. O estado do jogo (`useState`)

```js
const [teams, setTeams] = useState([]);
const [roundsPerPlayer, setRoundsPerPlayer] = useState(2);
const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
const [usedWords, setUsedWords] = useState([]);
const [selectedWord, setSelectedWord] = useState(null);
```

São as variáveis que guardam **tudo** sobre o jogo:

| Variável | O que guarda |
|---|---|
| `teams` | Lista de equipes (com jogadores, pontuação, etc) |
| `roundsPerPlayer` | Quantas rodadas cada jogador vai ter |
| `currentTeamIndex` | Qual equipe está jogando agora |
| `currentPlayerIndex` | Qual jogador da equipe está jogando |
| `usedWords` | Palavras que já foram usadas |
| `selectedWord` | A palavra atual sendo adivinhada |

---

## 3. Funções de Equipes

**`addTeam()`** — Adiciona uma equipe nova com estrutura padrão (nome, jogadores vazios, score zerado).

**`removeTeam(teamId)`** — Remove a equipe pelo ID.

**`updateTeam(teamId, changes)`** — Atualiza qualquer dado de uma equipe (ex: mudar o nome).

---

## 4. Funções de Jogadores

**`addPlayer(teamId)`** — Encontra a equipe pelo ID e adiciona um jogador com nome vazio.

**`removePlayer(teamId, playerId)`** — Remove um jogador específico de uma equipe.

**`updatePlayer(teamId, playerId, name)`** — Atualiza o nome de um jogador.

---

## 5. Funções do Jogo em si

**`registerResult(hit)`** — Registra se o jogador atual **acertou** (`hit = true`) ou **errou**. Atualiza score, hits e misses da equipe.

**`nextTurn()`** — Avança o turno. A lógica é:

- Se era o último jogador da última equipe → retorna `"fim"`
- Se era o último jogador da equipe → passa pra próxima equipe, volta o índice do jogador pra `0`
- Senão → avança só o jogador

**`resetGame()`** — Zera pontuações e reinicia os índices, mas **mantém** as equipes e jogadores cadastrados.

**`fullReset()`** — Apaga tudo, voltando ao estado inicial como se o app tivesse aberto agora.

---

## 6. Atalhos e o Provider

```js
const currentTeam = teams[currentTeamIndex];
const currentPlayer = currentTeam?.players[currentPlayerIndex];
```

Deixa fácil acessar a equipe e jogador **atual** sem ter que calcular isso em todo componente.

O `GameContext.Provider` **envolve** todos os componentes filhos e disponibiliza tudo (estado + funções) para qualquer um que usar `useContext(GameContext)`.

---

## Resumo visual do fluxo

```
GameProvider (contexto global)
  ├── Estado: teams, índices, palavras...
  ├── Equipes: add / remove / update
  ├── Jogadores: add / remove / update
  └── Jogo: registerResult → nextTurn → resetGame / fullReset
```
