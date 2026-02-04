import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function ArtistsNav() {
    return(
        <ul className="box-primary vh-100 p-none">
            <li className="bg-primary p-xs wp-100 cursor-pointer">
                <Link className="text-white" to="/artist/profile">Profil</Link>
            </li>
            <li className="bg-primary p-xs wp-100 cursor-pointer">
                <Link className="text-white" to="/artist/services">Szolgáltatások</Link>
            </li>

            <Logout/>
        </ul>
    );
}