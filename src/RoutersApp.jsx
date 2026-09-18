import { BrowserRouter, Routes, Route } from "react-router"

// pages
import Home from "./pages/Home"

const RoutersApp = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default RoutersApp