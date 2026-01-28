import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function ArtistsNav() {
    return(
        <ul className="box-primary h-full p-none">
            <li className="bg-primary p-xs wp-100 cursor-pointer">
                <Link className="text-white" to="/artist/profile">Profile</Link>
            </li>

            <Logout/>
        </ul>
    );
}