import { Link, Outlet, useLocation } from "react-router-dom";
import { selectMenu } from "../app/functions";

function GuestNav() {
    const location = useLocation();

    return(
        <>
            <nav className="h-20 bg-primary">
                <ul className="h-20 flex items-center justify-center">
                    <li className={selectMenu(location.pathname, "/")}>
                        <Link className="p-2 text-white" to={"/"}>Kezdőlap</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/rolunk")}>
                        <Link className="p-2" to={"/rolunk"}>Rólunk</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/regisztracio")}>
                        <Link className="p-2" to={"/regisztracio"}>Regisztráció</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/bejelentkezes")}>
                        <Link className="p-2" to={"/bejelentkezes"}>Bejelentkezés</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/kapcsolat")}>
                        <Link className="p-2" to={"/kapcsolat"}>Kapcsolat</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default GuestNav;