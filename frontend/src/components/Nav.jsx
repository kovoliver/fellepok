import { Link, Outlet, useLocation } from "react-router-dom";
import { selectMenu } from "../app/functions";

function GuestNav() {
    const location = useLocation();

    return(
        <>
            <nav className="h-80 bg-primary">
                <ul className="h-80 d-flex jc-center">
                    <li className={selectMenu(location.pathname, "/")}>
                        <Link className="p-sm text-white" to={"/"}>Kezdőlap</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/rolunk")}>
                        <Link className="p-sm" to={"/rolunk"}>Rólunk</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/regisztracio")}>
                        <Link className="p-sm" to={"/regisztracio"}>Regisztráció</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/bejelentkezes")}>
                        <Link className="p-sm" to={"/bejelentkezes"}>Bejelentkezés</Link>
                    </li>
                    <li className={selectMenu(location.pathname, "/kapcsolat")}>
                        <Link className="p-sm" to={"/kapcsolat"}>Kapcsolat</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default GuestNav;