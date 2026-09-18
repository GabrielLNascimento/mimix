import { BrowserRouter, Routes, Route } from "react-router";
import { GameProvider } from "./context/GameContext.jsx";

// pages
import Home from "./pages/Home";
import SetupTeams from "./pages/SetupTeams";

const RoutersApp = () => {
    return (
        <>
            <BrowserRouter>
                <GameProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/setup" element={<SetupTeams />} />
                    </Routes>
                </GameProvider>
            </BrowserRouter>
        </>
    );
};

export default RoutersApp;
