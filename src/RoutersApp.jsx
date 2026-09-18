import { BrowserRouter, Routes, Route } from "react-router";
import { GameProvider } from "./context/GameContext.jsx";

// pages
import Home from "./pages/Home";
import SetupTeams from "./pages/SetupTeams";
import Round from "./pages/Round";
import Result from "./pages/Result";

const RoutersApp = () => {
    return (
        <>
            <BrowserRouter>
                <GameProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/setup" element={<SetupTeams />} />
                        <Route path="/round" element={<Round />} />
                        <Route path="/fim" element={<Result />} />
                    </Routes>
                </GameProvider>
            </BrowserRouter>
        </>
    );
};

export default RoutersApp;
