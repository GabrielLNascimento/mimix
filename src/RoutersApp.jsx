import { BrowserRouter, Routes, Route } from "react-router"

// pages
import Home from "./pages/Home"
import SetupTeams from "./pages/SetupTeams"

const RoutersApp = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/setup" element={<SetupTeams />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default RoutersApp