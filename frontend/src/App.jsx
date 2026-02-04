import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import GuestLayout from "./layout/GuestLayout";
import { createContext } from "react";
import { useState } from "react";
import "./index.scss";
import "./assets/scss/style.scss";
import ActivateRegistration from "./pages/ActivateRegistration";
import TwoFactorLoginPage from "./pages/TwoFactorLoginPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/common/Profile";
import ArtistsLayout from "./layout/ArtistsLayout";
import ServicesPage from "./pages/artist/ServicesPage";
import ServicePage from "./pages/artist/ServicePage";

/*
    Globális állapotkezelés
        - globálisan, az egész appra kiterjedően kezelhetünk adatokat,
        amihez a teljes appon belül hozzá lehet férni
*/

export const GlobalContext = createContext();

function App() {
    const [messages, setMsgs] = useState({messages:[], msgCls:"info", maxWidth:500});
    const [sessionInfo, setSessionInfo] = useState(
        JSON.parse(localStorage.sessionInfo||null)
    );
    const [token, setToken] = useState(localStorage.token);

    const setMessages = (messages, msgCls = "info", maxWidth = 500)=> {
        const msgs = Array.isArray(messages) ? messages : [messages];
        setMsgs({messages:msgs, msgCls, maxWidth});
    };

    return (
        <GlobalContext.Provider value={{
            messages, setMessages,
            sessionInfo, setSessionInfo,
            token, setToken
        }}>
            <BrowserRouter>
                <Routes>
                    <Route element={<GuestLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="/rolunk" element={<AboutUsPage/>}/>
                        <Route path="/kapcsolat" element={<ContactPage/>}/>
                        <Route path="/regisztracio" element={<RegisterPage/>}/>
                        <Route path="/bejelentkezes" element={<LoginPage/>}/>
                        <Route path="/confirm-registration/:activationString/:userID" element={<ActivateRegistration/>}/>
                        <Route path="/two-factor-auth/:key/:userID" element={<TwoFactorLoginPage/>}/>
                    </Route>

                    <Route element={<ArtistsLayout/>}>
                        <Route path="/artist/profile" element={<Profile/>}/>
                        <Route path="/artist/services" element={<ServicesPage/>}/>
                        <Route path="/artist/service" element={<ServicePage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
}

export default App;