import { Link } from "react-router-dom";

function ServicesPage() {
    return(
        <div className="my-xl text-center">
            <Link to="/artist/service">
                <button className="input-sm btn-success">
                    Szolgáltatás létrehozása +
                </button>
            </Link>
        </div>
    );
}

export default ServicesPage;