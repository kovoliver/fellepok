import { Link } from "react-router-dom";

export default function ArtistsNav() {
    return(
        <ul className="box-primary h-full">
            <li className="bg-sky-500 hover:bg-sky-700">
                <Link className="text-white" to="/artist/profile">Profile</Link>
            </li>
        </ul>
    );
}